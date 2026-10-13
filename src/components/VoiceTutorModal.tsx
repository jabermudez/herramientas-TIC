import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  X,
  Sparkles,
  Volume2,
  VolumeX,
  AlertCircle,
  RefreshCw,
  Radio,
  Send,
  HelpCircle,
  Cpu,
  Globe,
  Settings
} from 'lucide-react';
import { floatTo16BitPCM, arrayBufferToBase64, base64ToArrayBuffer, pcm16ToAudioBuffer } from '../utils/audioUtils';
import { queryTicKnowledgeBase } from '../utils/ticTutorEngine';

interface VoiceTutorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MessageItem {
  sender: 'user' | 'tutor';
  text: string;
  time: string;
  unitRecommendation?: string;
}

type TutorMode = 'web-voice' | 'gemini-live';

const FAQ_CATEGORIES = [
  {
    id: 'populares',
    label: '⭐ Populares',
    questions: [
      '¿Qué es un computador y cómo funciona?',
      '¿Cuál es el ciclo básico de Entrada, Proceso, Almacenamiento y Salida?',
      '¿Por qué la memoria RAM se borra al apagar la PC?',
      '¿Cómo funciona la fórmula =SI en Excel?',
      '¿Cuál es la diferencia entre un disco SSD y HDD?',
      '¿Cómo detectar si un correo es Phishing?'
    ]
  },
  {
    id: 'computador',
    label: '🖥️ El Computador y Ciclo',
    questions: [
      '¿Qué es exactamente un computador y para qué sirve?',
      '¿Cuál es el ciclo de Entrada, Procesamiento, Almacenamiento y Salida?',
      '¿Qué diferencia existe entre un dato y la información?',
      '¿Qué tipos de computadores existen en el entorno laboral?',
      '¿Cuál es la diferencia entre TIC y un computador?',
      '¿Por qué un computador no es inteligente por sí solo?'
    ]
  },
  {
    id: 'hardware',
    label: '💻 Hardware y Diagnóstico',
    questions: [
      '¿Para qué sirve el procesador CPU y qué función tiene?',
      '¿Cómo saber si el procesador se está sobrecalentando?',
      '¿Qué función cumple la placa madre en un computador?',
      '¿Para qué sirve la pasta térmica en el disipador?',
      '¿Qué diferencias hay entre cables HDMI y DisplayPort?',
      '¿Por qué es importante el mantenimiento preventivo del PC?'
    ]
  },
  {
    id: 'ofimatica',
    label: '📊 Excel y Ofimática',
    questions: [
      '¿Para qué se usa el signo de dólar $ en las celdas?',
      '¿Cómo uso las funciones =BUSCARV y =BUSCARX?',
      '¿Cómo armar una tabla dinámica para resumir datos?',
      '¿Cómo crear un índice de contenido automático en Word?',
      '¿Cuáles son las normas básicas de formato y márgenes?',
      '¿Cómo exportar a PDF sin desconfigurar el documento?'
    ]
  },
  {
    id: 'movil',
    label: '📱 Celulares y WhatsApp',
    questions: [
      '¿Cómo enviar fotos y videos en calidad HD en WhatsApp?',
      '¿Cómo usar WhatsApp Web multidispositivo en el computador?',
      '¿Qué hábitos alargan la vida útil de la batería del móvil?',
      '¿Para qué sirve borrar la memoria caché de las aplicaciones?',
      '¿Cómo activar copias de seguridad automáticas en la nube?'
    ]
  },
  {
    id: 'atajos',
    label: '⌨️ Atajos de Teclado',
    questions: [
      '¿Para qué sirve la combinación Windows + V en la computadora?',
      '¿Cómo recortar la pantalla rápidamente con Win + Shift + S?',
      '¿Qué atajo bloquea el computador al instante con Windows + L?',
      '¿Cómo alternar entre ventanas abiertas con Alt + Tab?',
      '¿Cómo restaurar pestañas cerradas con Ctrl + Shift + T?'
    ]
  },
  {
    id: 'seguridad-ia',
    label: '🛡️ Ciberseguridad e IA',
    questions: [
      '¿Qué es la verificación en dos pasos (2FA) y cómo funciona?',
      '¿Cómo crear una contraseña segura y fácil de recordar?',
      '¿Qué es la regla 3-2-1 para copias de seguridad de datos?',
      '¿Cómo redactar un prompt efectivo con Rol y Contexto para IA?',
      '¿Qué es una alucinación en inteligencia artificial y cómo verificarla?'
    ]
  }
];

export const VoiceTutorModal: React.FC<VoiceTutorModalProps> = ({ isOpen, onClose }) => {
  const [tutorMode, setTutorMode] = useState<TutorMode>('web-voice');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [micInterimText, setMicInterimText] = useState<string>('');
  const [typedInput, setTypedInput] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>(
    'Tutor pedagógico listo: habla por micrófono o escribe tu duda'
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<boolean>(false);
  const [activeFaqCategory, setActiveFaqCategory] = useState<string>('populares');

  // Voice synthesis selection state
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');

  const [messages, setMessages] = useState<MessageItem[]>([
    {
      sender: 'tutor',
      text: '¡Hola! Es un gusto saludarte, aprendiz. Soy tu Tutor interactivo del Manual TIC. ¿Qué tema de computadores, Word, Excel, celular o ciberseguridad deseas consultar hoy?',
      time: 'Ahora'
    }
  ]);

  // Load and rank natural Spanish voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const populateSpanishVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      if (!allVoices || allVoices.length === 0) return;

      const spanish = allVoices.filter(
        v => v.lang.startsWith('es') || v.lang.includes('es-') || v.lang.includes('es_')
      );

      // Rank neural/natural voices first
      spanish.sort((a, b) => {
        const getScore = (v: SpeechSynthesisVoice) => {
          let s = 0;
          const name = v.name.toLowerCase();
          if (name.includes('natural') || name.includes('online (natural)')) s += 100;
          if (name.includes('google')) s += 80;
          if (name.includes('neural') || name.includes('premium')) s += 70;
          if (name.includes('paulina') || name.includes('jorge') || name.includes('dalia') || name.includes('monica') || name.includes('alvaro')) s += 50;
          if (name.includes('colombia') || name.includes('mexico') || name.includes('spain')) s += 20;
          return s;
        };
        return getScore(b) - getScore(a);
      });

      setAvailableVoices(spanish);
      if (spanish.length > 0 && !selectedVoiceURI) {
        setSelectedVoiceURI(spanish[0].voiceURI);
      }
    };

    populateSpanishVoices();
    window.speechSynthesis.onvoiceschanged = populateSpanishVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [selectedVoiceURI]);

  // Refs for Gemini Live (WebSockets & Web Audio)
  const socketRef = useRef<WebSocket | null>(null);
  const inputAudioCtxRef = useRef<AudioContext | null>(null);
  const outputAudioCtxRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const audioSourcesRef = useRef<AudioBufferSourceNode[]>([]);

  // Ref for Web Speech Recognition
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll transcript to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, micInterimText]);

  // Clean up when modal closes
  useEffect(() => {
    if (!isOpen) {
      stopAllAudio();
    }
  }, [isOpen]);

  const stopAllAudio = () => {
    // 1. Stop Speech Synthesis
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {
        // ignore
      }
    }

    // 2. Stop Web Speech Recognition
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {
        // ignore
      }
      recognitionRef.current = null;
    }

    // 3. Stop Gemini Live audio
    if (processorRef.current) {
      try {
        processorRef.current.disconnect();
      } catch (e) {}
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
    audioSourcesRef.current.forEach(src => {
      try { src.stop(); } catch (e) {}
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
    setMicInterimText('');
  };

  // Speaks text using Browser Speech Synthesis in natural Spanish
  const speakTextWithBrowserSynth = (textToSpeak: string) => {
    if (isMuted || !('speechSynthesis' in window)) return;

    try {
      window.speechSynthesis.cancel();

      // Clean markdown characters and symbols so speech synthesis sounds human and fluent
      const cleanSpoken = textToSpeak
        .replace(/\*\*/g, '')
        .replace(/\*/g, '')
        .replace(/#{1,6}\s+/g, '')
        .replace(/`{1,3}[^`]*`{1,3}/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/^[•\-\*]\s+/gm, '')
        .replace(/[\r\n]+/g, ' ')
        .trim();

      const utterance = new SpeechSynthesisUtterance(cleanSpoken);
      utterance.lang = 'es-ES';
      utterance.rate = 0.97; // Natural, conversational cadence
      utterance.pitch = 1.0;

      // Select chosen high quality Spanish voice
      const voices = window.speechSynthesis.getVoices();
      let chosen = voices.find(v => v.voiceURI === selectedVoiceURI);
      if (!chosen && availableVoices.length > 0) {
        chosen = availableVoices[0];
      }
      if (!chosen) {
        chosen = voices.find(v => v.lang.startsWith('es') || v.lang.includes('es-'));
      }
      if (chosen) {
        utterance.voice = chosen;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
      };
      utterance.onend = () => {
        setIsSpeaking(false);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
      setIsSpeaking(false);
    }
  };

  const handleTestVoice = () => {
    speakTextWithBrowserSynth(
      '¡Hola, aprendiz! Esta es mi voz de tutor pedagógico para el Manual de Herramientas TIC. ¿Cómo me escuchas?'
    );
  };

  // --- WEB SPEECH RECOGNITION (Compatible with All Browsers & Devices) ---
  const toggleWebVoiceRecording = () => {
    setErrorMessage(null);
    setPermissionError(false);

    // If currently speaking, stop tutor audio
    if (isSpeaking) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    // If already recording, stop
    if (isRecording) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      setIsRecording(false);
      setStatusMessage('Escucha finalizada');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setErrorMessage(
        'El reconocimiento de voz por micrófono no está disponible en este navegador específico. ¡Puedes escribir tu pregunta o seleccionar una sugerencia abajo!'
      );
      setStatusMessage('Micrófono no soportado');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.lang = 'es-ES';
      recognition.interimResults = true;
      recognition.continuous = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        setIsRecording(true);
        setMicInterimText('');
        setStatusMessage('Escuchando tu voz... Habla con naturalidad en español');
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final += event.results[i][0].transcript;
          } else {
            interim += event.results[i][0].transcript;
          }
        }

        if (interim) {
          setMicInterimText(interim);
        }

        if (final) {
          setMicInterimText('');
          processStudentQuery(final.trim());
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('SpeechRecognition error:', event.error);
        setIsRecording(false);
        setMicInterimText('');

        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setPermissionError(true);
          setErrorMessage(
            'Permiso de micrófono bloqueado. Haz clic en el candado junto a la URL de tu navegador y autoriza el micrófono.'
          );
        } else if (event.error === 'no-speech') {
          setStatusMessage('No se detectó voz. Vuelve a pulsar el micrófono.');
        } else {
          setStatusMessage('Reconocimiento pausado');
        }
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch (err: any) {
      console.error('Error starting speech recognition:', err);
      setIsRecording(false);
      setErrorMessage('No se pudo activar el micrófono: ' + (err.message || 'Error desconocido'));
    }
  };

  // Process user question using Server Gemini AI or Autonomous TIC Knowledge Engine + TTS
  const processStudentQuery = async (userText: string) => {
    if (!userText.trim()) return;

    // 1. Add student message
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: MessageItem = {
      sender: 'user',
      text: userText,
      time: nowTime
    };

    setMessages(prev => [...prev, userMsg]);
    setStatusMessage('Consultando al Tutor pedagógico...');

    let answerText = '';
    let recUnit: string | undefined = undefined;

    // 2. Intentar primero con la API de servidor (Gemini 3.8 Flash)
    try {
      const res = await fetch('/api/tutor-ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: userText })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.answer && !data.useLocalFallback) {
          answerText = data.answer;
          recUnit = data.unitRecommendation;
        }
      }
    } catch (e) {
      // Entorno offline o sin servidor activo; pasará directamente al motor autónomo
    }

    // 3. Si no respondió el servidor o está offline, consultar el motor autónomo exhaustivo del manual
    if (!answerText) {
      const result = queryTicKnowledgeBase(userText);
      answerText = result.answer;
      recUnit = result.recommendedUnit;
    }

    const tutorMsg: MessageItem = {
      sender: 'tutor',
      text: answerText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      unitRecommendation: recUnit
    };

    setMessages(prev => [...prev, tutorMsg]);
    setStatusMessage('Respuesta lista');

    // 4. Reproducir la respuesta en voz alta con síntesis natural
    speakTextWithBrowserSynth(answerText);
  };

  // --- GEMINI 3.8 LIVE (WebSockets Backend Bridge) ---
  const startGeminiLiveConversation = async () => {
    setErrorMessage(null);
    setPermissionError(false);
    setStatusMessage('Conectando con gemini-3.8-live...');

    try {
      // 1. Initialize output AudioContext at 24kHz for Gemini Live audio chunks
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      outputAudioCtxRef.current = new AudioCtx({ sampleRate: 24000 });
      nextStartTimeRef.current = outputAudioCtxRef.current.currentTime;

      // 2. Open WebSocket connection to our backend Live API bridge
      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/api/live-ws`;

      const ws = new WebSocket(wsUrl);
      socketRef.current = ws;

      const connectionTimeout = setTimeout(() => {
        if (ws.readyState !== WebSocket.OPEN) {
          ws.close();
          handleFallbackToWebMode('El servidor no respondió a tiempo. Activando modo Web nativo.');
        }
      }, 4000);

      ws.onopen = () => {
        clearTimeout(connectionTimeout);
        setStatusMessage('Canal WebSocket abierto. Inicializando sesión...');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.connected) {
            setIsConnected(true);
            setStatusMessage('En vivo con Gemini 3.8 Live: Puedes hablar');
            startMicrophoneCaptureForGemini(ws);
          }

          if (data.error) {
            handleFallbackToWebMode(data.error);
          }

          if (data.audio && outputAudioCtxRef.current) {
            setIsSpeaking(true);
            playAudioChunk(data.audio);
          }

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

      ws.onerror = () => {
        clearTimeout(connectionTimeout);
        handleFallbackToWebMode(
          'Servidor en la nube no disponible. Se activó el Tutor de Voz Web autónomo para que puedas hablar sin interrupciones.'
        );
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsRecording(false);
        setIsSpeaking(false);
      };
    } catch (err: any) {
      handleFallbackToWebMode(err.message || 'Error al conectar con servidor Live');
    }
  };

  // Gracefully fallback to Web mode if WebSocket fails
  const handleFallbackToWebMode = (reason: string) => {
    stopAllAudio();
    setTutorMode('web-voice');
    setStatusMessage('Modo Autónomo Web activado');
    setErrorMessage(reason);
  };

  const startMicrophoneCaptureForGemini = async (ws: WebSocket) => {
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
      setPermissionError(true);
      setErrorMessage('Permiso de micrófono no otorgado: ' + (err.message || 'Denegado'));
    }
  };

  const playAudioChunk = (base64Audio: string) => {
    if (!outputAudioCtxRef.current || isMuted) return;
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

  // Submit via text input or prompt chip
  const handleSendTextQuery = (text: string) => {
    if (!text.trim()) return;

    if (tutorMode === 'gemini-live' && socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      setMessages(prev => [...prev, { sender: 'user', text, time: 'Ahora' }]);
      socketRef.current.send(JSON.stringify({ text }));
    } else {
      processStudentQuery(text);
    }
    setTypedInput('');
  };

  const handleMicButtonClick = () => {
    if (tutorMode === 'web-voice') {
      toggleWebVoiceRecording();
    } else {
      if (isConnected) {
        stopAllAudio();
      } else {
        startGeminiLiveConversation();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="p-2 sm:p-2.5 bg-indigo-500/20 rounded-xl border border-indigo-400/30 text-indigo-300">
              <Radio className={`w-5 h-5 ${isRecording || isConnected ? 'animate-pulse text-emerald-400' : ''}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Tutor de Voz TIC</h3>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  {tutorMode === 'web-voice' ? 'Voz Web Nativa' : 'Gemini 3.8 Live'}
                </span>
              </div>
              <p className="text-[11px] text-slate-300 font-medium truncate max-w-xs sm:max-w-md">{statusMessage}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Toggle Mute TTS Button */}
            <button
              onClick={() => {
                setIsMuted(!isMuted);
                if (!isMuted && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                  setIsSpeaking(false);
                }
              }}
              title={isMuted ? 'Activar voz del tutor' : 'Silenciar voz del tutor'}
              className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              {isMuted ? <VolumeX className="w-5 h-5 text-amber-400" /> : <Volume2 className="w-5 h-5 text-emerald-400" />}
            </button>

            {/* Close Modal Button */}
            <button
              onClick={() => {
                stopAllAudio();
                onClose();
              }}
              aria-label="Cerrar tutor de voz"
              className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mode Selector and Voice Configuration Bar */}
        <div className="px-3 sm:px-4 py-2.5 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => {
                stopAllAudio();
                setTutorMode('web-voice');
                setErrorMessage(null);
                setStatusMessage('Modo Autónomo Web activado');
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                tutorMode === 'web-voice'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Globe className="w-3 h-3" />
              <span>Voz Web Natural</span>
            </button>

            <button
              onClick={() => {
                stopAllAudio();
                setTutorMode('gemini-live');
                setErrorMessage(null);
                setStatusMessage('Listo para conectar con servidor');
              }}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                tutorMode === 'gemini-live'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Cpu className="w-3 h-3" />
              <span>Gemini Live</span>
            </button>
          </div>

          {/* Voice Selector and Test Voice Button (Active for Web Voice Mode) */}
          {tutorMode === 'web-voice' && (
            <div className="flex items-center gap-1.5 ml-auto">
              {availableVoices.length > 0 && (
                <div className="flex items-center gap-1 bg-white dark:bg-slate-900 px-2 py-1 rounded-xl border border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Voz:</span>
                  <select
                    value={selectedVoiceURI}
                    onChange={(e) => setSelectedVoiceURI(e.target.value)}
                    className="text-[11px] font-medium bg-transparent text-slate-800 dark:text-slate-200 border-none focus:outline-none cursor-pointer max-w-[130px] sm:max-w-[170px] truncate"
                    title="Selecciona la voz en español que suene más humana y natural"
                  >
                    {availableVoices.map((v) => (
                      <option key={v.voiceURI} value={v.voiceURI} className="text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900">
                        {v.name.replace(/Microsoft |Google /g, '')} ({v.lang})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={handleTestVoice}
                title="Escuchar una muestra de esta voz"
                className="px-2 py-1 bg-white dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 border border-slate-200 dark:border-slate-700 rounded-xl text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer shadow-2xs"
              >
                <Volume2 className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                <span className="hidden sm:inline">Probar Voz</span>
                <span className="sm:hidden">Probar</span>
              </button>
            </div>
          )}
        </div>

        {/* Central Audio Microphone Zone */}
        <div className="p-4 sm:p-5 bg-gradient-to-b from-slate-900 via-slate-850 to-slate-900 text-white flex flex-col items-center justify-center text-center border-b border-slate-800">
          <div className="relative my-2 sm:my-3 flex items-center justify-center">
            {/* Visualizer Pulse Rings */}
            {isRecording && (
              <div className="absolute w-28 h-28 rounded-full bg-indigo-500/30 animate-ping" />
            )}
            {isSpeaking && (
              <div className="absolute w-36 h-36 rounded-full bg-emerald-500/25 animate-pulse" />
            )}

            <button
              onClick={handleMicButtonClick}
              title={isRecording ? 'Presiona para detener la escucha' : 'Presiona para hablar'}
              className={`relative z-10 w-18 h-18 sm:w-20 sm:h-20 rounded-full flex items-center justify-center transition-all shadow-xl cursor-pointer ${
                isRecording
                  ? 'bg-rose-600 hover:bg-rose-700 text-white ring-4 ring-rose-400/40 scale-105'
                  : isSpeaking
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white ring-4 ring-emerald-400/40'
                  : isConnected
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white ring-4 ring-indigo-400/30'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white ring-4 ring-indigo-400/30 hover:scale-105'
              }`}
            >
              {isRecording ? (
                <Mic className="w-7 h-7 sm:w-8 sm:h-8 animate-pulse text-white" />
              ) : isSpeaking ? (
                <Volume2 className="w-7 h-7 sm:w-8 sm:h-8 animate-bounce text-white" />
              ) : (
                <Mic className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              )}
            </button>
          </div>

          <p className="text-xs font-semibold text-slate-100 mt-1">
            {isRecording
              ? 'Escuchando tu voz... Habla con naturalidad sobre el tema que necesitas'
              : isSpeaking
              ? 'El Tutor está respondiendo en voz alta...'
              : tutorMode === 'web-voice'
              ? 'Presiona el micrófono para hablar con tu voz'
              : isConnected
              ? 'Conectado a Gemini Live. Habla en tiempo real'
              : 'Presiona el botón para conectar con el Tutor'}
          </p>

          {/* Real-time voice interim transcript indicator */}
          {micInterimText && (
            <div className="mt-2 px-3 py-1 bg-indigo-900/60 border border-indigo-500/40 rounded-full text-indigo-200 text-xs animate-pulse max-w-md truncate">
              🗣️ "{micInterimText}"
            </div>
          )}

          {/* Fallback & Explanatory Guidance Banner */}
          {errorMessage && (
            <div className="mt-3 p-3 bg-amber-500/20 border border-amber-500/40 rounded-xl text-amber-200 text-xs flex items-start gap-2 max-w-md text-left">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
              <div className="flex-1">
                <span className="font-semibold block text-amber-300">Aviso pedagógico:</span>
                <span className="text-[11px] leading-relaxed">{errorMessage}</span>
                {tutorMode === 'web-voice' && (
                  <span className="block mt-1 text-[11px] text-emerald-300 font-medium">
                    ✓ El Tutor Web sigue funcionando al 100%: Puedes usar el micrófono o escribir tu pregunta abajo.
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Permission error specific guidance */}
          {permissionError && (
            <div className="mt-2 text-[11px] text-slate-300 bg-slate-800/80 p-2.5 rounded-lg max-w-md border border-slate-700">
              💡 <strong>Cómo habilitar el micrófono:</strong> En la barra de direcciones de tu navegador (arriba a la izquierda), haz clic en el ícono de 🔒 candado o ⚙️ configuración y activa el permiso de <strong>Micrófono</strong>.
            </div>
          )}
        </div>

        {/* Categorized FAQ Questions Section (Expanded with 30+ interactive questions) */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">
              Preguntas frecuentes del aprendiz:
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">
              Toca cualquier pregunta para escuchar la explicación
            </span>
          </div>

          {/* FAQ Category Pills */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1.5 scrollbar-thin">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFaqCategory(cat.id)}
                className={`px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeFaqCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Questions for active category */}
          <div className="flex flex-wrap gap-1.5 mt-1.5 max-h-24 overflow-y-auto">
            {FAQ_CATEGORIES.find((c) => c.id === activeFaqCategory)?.questions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSendTextQuery(q)}
                className="px-2.5 py-1 bg-white dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:border-indigo-300 dark:hover:border-indigo-700 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg text-[11px] transition-colors cursor-pointer text-left"
              >
                💬 {q}
              </button>
            ))}
          </div>
        </div>

        {/* Live Conversation Transcript */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white dark:bg-slate-900 min-h-[160px] max-h-64">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-2xl text-xs max-w-[88%] leading-relaxed ${
                m.sender === 'user'
                  ? 'ml-auto bg-indigo-600 text-white rounded-br-none shadow-xs'
                  : 'mr-auto bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bl-none border border-slate-200 dark:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] mb-1 opacity-70">
                <span className="font-bold">
                  {m.sender === 'user' ? 'Tú' : tutorMode === 'web-voice' ? 'Tutor TIC (Voz Web)' : 'Tutor TIC (Gemini Live)'}
                </span>
                <span>{m.time}</span>
              </div>
              <p>{m.text}</p>
              {m.unitRecommendation && (
                <div className="mt-2 pt-1.5 border-t border-slate-200 dark:border-slate-700 text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold flex items-center gap-1">
                  <span>📖 Tema recomendado:</span>
                  <span>{m.unitRecommendation}</span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Text Input Bar (Alternative for noisy environments or microphone restriction) */}
        <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendTextQuery(typedInput);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={typedInput}
              onChange={(e) => setTypedInput(e.target.value)}
              placeholder="O escribe aquí cualquier duda sobre el manual TIC..."
              className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              disabled={!typedInput.trim()}
              className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-colors cursor-pointer"
              title="Enviar pregunta"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span className="text-[11px] truncate">
            {tutorMode === 'web-voice'
              ? '✓ Compatible con navegadores modernos y dispositivos móviles sin requerir servidor.'
              : 'Sesión en vivo mediante streaming de audio y WebSockets.'}
          </span>
          <button
            onClick={() => {
              stopAllAudio();
              onClose();
            }}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-semibold rounded-xl transition-colors text-xs cursor-pointer shrink-0 ml-2"
          >
            Cerrar Tutor
          </button>
        </div>
      </div>
    </div>
  );
};
