import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/api/live-ws' });

app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY || '';

const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// REST endpoint for status check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY'),
    model: 'gemini-3.8-live',
  });
});

// WebSocket Live API bridge for gemini-3.8-live
wss.on('connection', async (clientWs: WebSocket) => {
  console.log('[Live API WS] Cliente conectado para tutor de voz');

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    clientWs.send(
      JSON.stringify({
        error: 'No se ha configurado GEMINI_API_KEY en las variables de entorno. Puedes usar la lectura en voz alta nativa del navegador.',
      })
    );
    return;
  }

  let session: any = null;

  try {
    session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Puck' } },
        },
        systemInstruction:
          'Eres el Tutor de Voz del "Manual de Herramientas TIC". Tu misión es guiar al estudiante de manera clara, amable, concisa y pedagógica en español. Responde dudas sobre computadores, hardware, procesadores de texto, Excel, fórmulas, celulares, WhatsApp, atajos de teclado, ciberseguridad e Inteligencia Artificial. Mantén las respuestas habladas cortas (2 a 4 oraciones) para una conversación fluida y dinámica.',
      },
      callbacks: {
        onmessage: (message: LiveServerMessage) => {
          if (clientWs.readyState !== WebSocket.OPEN) return;

          const parts = message.serverContent?.modelTurn?.parts;
          if (parts) {
            for (const part of parts) {
              if (part.inlineData?.data) {
                clientWs.send(JSON.stringify({ audio: part.inlineData.data }));
              }
              if (part.text) {
                clientWs.send(JSON.stringify({ text: part.text }));
              }
            }
          }

          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ interrupted: true }));
          }
        },
        onclose: () => {
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ closed: true }));
          }
        },
        onerror: (err: any) => {
          console.error('[Gemini Live Error]', err);
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(
              JSON.stringify({
                error: err?.message || 'Error en la sesión de Gemini Live',
              })
            );
          }
        },
      },
    });

    clientWs.send(JSON.stringify({ connected: true }));
  } catch (err: any) {
    console.error('[Live Connect Failure]', err);
    clientWs.send(
      JSON.stringify({
        error:
          'No se pudo inicializar la sesión con gemini-3.8-live: ' +
          (err?.message || 'Error desconocido'),
      })
    );
    return;
  }

  clientWs.on('message', (data) => {
    try {
      const payload = JSON.parse(data.toString());
      if (payload.audio && session) {
        session.sendRealtimeInput({
          audio: { data: payload.audio, mimeType: 'audio/pcm;rate=16000' },
        });
      }
      if (payload.text && session) {
        session.sendRealtimeInput({
          text: payload.text,
        });
      }
    } catch (err) {
      console.error('[Live WS Message Error]', err);
    }
  });

  clientWs.on('close', () => {
    console.log('[Live API WS] Cliente desconectado');
    if (session) {
      try {
        session.close();
      } catch (e) {
        // ignore close errors
      }
    }
  });
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';
  const PORT = Number(process.env.PORT) || 3000;

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor TIC activo en http://localhost:${PORT}`);
  });
}

startServer();
