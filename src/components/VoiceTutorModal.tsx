import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, X, Sparkles, Volume2, VolumeX, AlertCircle, RefreshCw, Radio, CheckCircle } from 'lucide-react';
import { floatTo16BitPCM, arrayBufferToBase64, base64ToArrayBuffer, pcm16ToAudioBuffer } from '../utils/audioUtils';

interface VoiceTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MessageItem {
  sender: 'user' | 'tutor';
  text: string;
  time: string;
}

export const VoiceTutorModal: React.FC<VoiceTutorModalProps> = ({ isOpen, onClose }) => {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      sender: 'tutor',
      text: '¡Hola! Soy tu Tutor de Voz TIC en tiempo real impulsado por Gemini 3.8 Live. Puedes hablarme directamente por el micrófono para hacerme cualquier pregunta sobre hardware, ofimática, Excel, WhatsApp o ciberseguridad.',
      time: 'Ahora'
    }
  ]);
  const [statusMessage, setStatusMessage] = useState<string>('Listo para conectar');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<AudioBufferSourceNode[]>([]);

  useEffect(() => {
    if (!isOpen) {
      cleanupAudio();
      return;
    }
  }, [isOpen]);

  const cleanupAudio = () => {
    // Stop recording
    if (processorRef.current) {
      try {
        processorRef.current.disconnect();
      } catch (e) {
        // ignore
      }
      processorRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close().catch(() => {});
      inputAudioCtxRef.current = null;
    }
    // Stop playback
    audioSourcesRef.current.forEach(src => {
      try {
        src.stop();
      } catch (e) {
        // ignore
      }
    });
    audioSourcesRef.current = [];
    if (outputAudioCtxRef.current) {
      outputAudioCtxRef.current.close().catch(() => {});
      outputAudioCtxRef.current = null;
    }
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
    }
    setIsConnected(false);
    setIsRecording(false);
    setIsSpeaking(false);
  };

  const startLiveConversation = async () => {
    setErrorMessage(null);
    setStatusMessage('Conectando con gemini-3.8-live...');

    try {
      // 1. Initialize output AudioContext at 24kHz for Gemini Live output
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      outputAudioCtxRef.current = new AudioCtx({ sampleRate: 24000 });
      nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;

      // 2. Open WebSocket connection to our backend Live API bridge
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/live-ws`;
      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      ws.onopen = () => {
        setStatusMessage('Canal WebSocket abierto. Inicializando sesión de Live API...');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.connected) {
            setIsConnected(true);
            setStatusMessage('En vivo: Puedes hablar ahora');
            startMicrophoneCapture(ws);
          }

          if (data.error) {
            setErrorMessage(data.error);
            setStatusMessage('Error en la sesión');
          }

          // Handle incoming audio stream from Gemini 3.8 Live
          if (data.audio && outputAudioCtxRef.current) {
            setIsSpeaking(true);
            playAudioChunk(data.audio);
          }

          // Handle transcript if received
          if (data.text) {
            setMessages(prev => {
              const last = prev[prev.length - 1];
              if (last && last.sender === 'tutor') {
                return [...prev.slice(0, -1), { ...last, text: last.text + ' ' + data.text }];
              } else {
                return [...prev, { sender: 'tutor', text: data.text, time: 'Ahora' }];
              }
            });
          }

          // Handle user interruption
          if (data.interrupted) {
            setIsSpeaking(false);
            audioSourcesRef.current.forEach(src => {
              try { src.stop(); } catch (e) {}
            });
            audioSourcesRef.current = [];
            if (outputAudioCtxRef.current) {
              nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;
            }
          }
        } catch (err) {
          console.error('Error procesando mensaje WebSocket:', err);
        }
      };

      ws.onerror = (err) => {
        console.error('WebSocket Error:', err);
        setErrorMessage('No se pudo establecer conexión WebSocket con el servidor.');
        setStatusMessage('Conexión fallida');
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsRecording(false);
        setIsSpeaking(false);
        setStatusMessage('Sesión cerrada');
      };
    } catch (err: any) {
      console.error('Error iniciando conversación:', err);
      setErrorMessage(err.message || 'Error al conectar');
      setStatusMessage('Error');
    }
  };

  const startMicrophoneCapture = async (ws: WebSocket) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true
        }
      });
      mediaStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const inputCtx = new AudioCtx({ sampleRate: 16000 });
      inputAudioCtxRef.current = inputCtx;

      const source = inputCtx.createMediaStreamSource(stream);
      // Buffer size 4096 = ~256ms per slice at 16kHz
      const processor = inputCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      processor.onaudioprocess = (e) => {
        if (ws.readyState !== WebSocket.OPEN) return;
        const channelData = e.inputBuffer.getChannelData(0);
        const pcm16Buffer = floatTo16BitPCM(channelData);
        const base64Audio = arrayBufferToBase64(pcm16Buffer);

        ws.send(JSON.stringify({ audio: base64Audio }));
      };

      source.connect(processor);
      processor.connect(inputCtx.destination);
      setIsRecording(true);
    } catch (err: any) {
      console.error('Error al capturar micrófono:', err);
      setErrorMessage('No se pudo acceder al micrófono: ' + (err.message || 'Permiso denegado'));
    }
  };

  const playAudioChunk = (base64Audio: string) => {
    if (!outputAudioCtxRef.current) return;
    const ctx = outputAudioCtxRef.current;

    try {
      const arrayBuffer = base64ToArrayBuffer(base64Audio);
      const audioBuffer = pcm16ToAudioBuffer(ctx, arrayBuffer, 24000);

      const sourceNode = ctx.createBufferSource();
      sourceNode.buffer = audioBuffer;
      sourceNode.connect(ctx.destination);

      const currentTime = ctx.currentTime;
      if (nextStartTimeRef.current < currentTime) {
        nextStartTimeRef.current = currentTime;
      }

      sourceNode.start(nextStartTimeRef.current);
      nextStartTimeRef.current += audioBuffer.duration;

      audioSourcesRef.current.push(sourceNode);

      sourceNode.onended = () => {
        audioSourcesRef.current = audioSourcesRef.current.filter(s => s !== sourceNode);
        if (audioSourcesRef.current.length === 0) {
          setIsSpeaking(false);
        }
      };
    } catch (err) {
      console.error('Error reproduciendo audio chunk:', err);
    }
  };

  const askVoiceSuggestion = (promptText: string) => {
    setMessages(prev => [...prev, { sender: 'user', text: promptText, time: 'Ahora' }]);
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify({ text: promptText }));
    } else {
      // Fallback: browser speech synthesis if offline
      if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(
          `Sobre tu pregunta: ${promptText}. En el manual puedes consultar la sección correspondiente donde se explica paso a paso con ejemplos cotidianos.`
        );
        utterance.lang = 'es-ES';
        synth.speak(utterance);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 animate-fadeIn overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-indigo-500/30 rounded-xl border border-indigo-400/40 text-indigo-300">
              <Radio className={`w-5 h-5 ${isConnected ? 'animate-pulse text-emerald-400' : ''}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Tutor de Voz TIC en Vivo</h3>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  gemini-3.8-live
                </span>
              </div>
              <p className="text-[11px] text-slate-400">{statusMessage}</p>
            </div>
          </div>
          <button
            onClick={() => {
              cleanupAudio();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Central Audio Visualizer and Controls */}
        <div className="p-6 bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white flex flex-col items-center justify-center text-center border-b border-slate-800">
          {/* Animated Wave or Pulse */}
          <div className="relative my-4 flex items-center justify-center">
            {isRecording && (
              <div className="absolute w-28 h-28 rounded-full bg-indigo-500/20 animate-ping" />
            )}
            {isSpeaking && (
              <div className="absolute w-36 h-36 rounded-full bg-emerald-500/20 animate-pulse" />
            )}

            <button
              onClick={isConnected ? cleanupAudio : startLiveConversation}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center transition-all shadow-xl ${
                isConnected
                  ? isSpeaking
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-4 ring-emerald-400/30'
                    : 'bg-rose-600 hover:bg-rose-700 text-white ring-4 ring-rose-400/30'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white ring-4 ring-indigo-400/30'
              }`}
            >
              {isConnected ? (
                isSpeaking ? <Volume2 className="w-8 h-8" /> : <Mic className="w-8 h-8 animate-pulse" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </button>
          </div>

          <p className="text-xs font-semibold text-slate-200 mt-2">
            {isConnected
              ? isSpeaking
                ? 'El Tutor de Voz está hablando...'
                : 'Escuchando tu voz... Habla con naturalidad'
              : 'Presiona el micrófono para iniciar la conversación en vivo'}
          </p>

          <p className="text-[11px] text-slate-400 max-w-sm mt-1">
            Audio en tiempo real bidireccional mediante WebSockets (16kHz PCM input / 24kHz PCM output).
          </p>

          {errorMessage && (
            <div className="mt-3 p-2.5 bg-rose-500/20 border border-rose-500/40 rounded-xl text-rose-300 text-xs flex items-center gap-2 max-w-md">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Suggestion Quick Chips */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
          <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 mb-1.5 px-1">Preguntas sugeridas por voz:</p>
          <div className="flex flex-wrap gap-1.5">
            {[
              '¿Por qué la memoria RAM se borra al apagar la PC?',
              '¿Cómo funciona la fórmula =SI en Excel?',
              '¿Cómo detectar si un correo es Phishing?',
              '¿Cuál es el mejor atajo para revivir pestañas?'
            ].map((q, i) => (
              <button
                key={i}
                onClick={() => askVoiceSuggestion(q)}
                className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:border-indigo-300 dark:hover:border-indigo-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-[11px] transition-colors cursor-pointer"
              >
                💬 {q}
              </button>
            ))}
          </div>
        </div>

        {/* Live Conversation Transcript */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white dark:bg-slate-900 max-h-64">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl text-xs max-w-[85%] leading-relaxed ${
                m.sender === 'user'
                  ? 'ml-auto bg-indigo-600 dark:bg-indigo-600 text-white rounded-br-none shadow-xs'
                  : 'mr-auto bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] mb-1 opacity-70">
                <span className="font-bold">{m.sender === 'user' ? 'Tú (Voz)' : 'Tutor TIC (Gemini Live)'}</span>
                <span>{m.time}</span>
              </div>
              <p>{m.text}</p>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Habla en español claro sobre cualquier tema del manual.</span>
          <button
            onClick={() => {
              cleanupAudio();
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors text-xs cursor-pointer"
          >
            Finalizar Conversación
          </button>
        </div>
      </div>
    </div>
  );
};
