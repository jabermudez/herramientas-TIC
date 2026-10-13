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

// REST endpoint for Voice Tutor Q&A using Gemini 3.8 Flash
app.post('/api/tutor-ask', async (req, res) => {
  const { question } = req.body;
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'La pregunta es requerida' });
  }

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: question,
        config: {
          systemInstruction: `Eres el Tutor de Voz pedagógico del "Manual de Herramientas TIC para Aprendices".
Tu rol es responder directamente a cualquier duda que el aprendiz te formule sobre los temas del manual, las unidades formativas, los talleres interactivos de la página o conceptos de tecnología.

Estructura del Manual de Herramientas TIC:
- Unidad 1: Fundamentos de las TIC y Entorno Digital (Hardware vs Software, Cloud, extensiones de archivos, HTTPS, huella digital).
- Unidad 2: Arquitectura del Hardware y Diagnóstico (CPU, RAM, SSD vs HDD, placa madre, disipador, fuente, puertos y cables, mantenimiento preventivo).
- Unidad 3: Procesamiento de Textos y Documentación (Word, estilos de títulos, índices automáticos, márgenes, normas APA, combinación de correspondencia, exportación PDF).
- Unidad 4: Hoja de Cálculo Analítica con Excel (Estructura de celdas, fórmulas SUMA/PROMEDIO, función condicional =SI, =BUSCARV y =BUSCARX, fijar celdas con $, tablas dinámicas).
- Unidad 5: Ecosistema Móvil y Productividad en Smartphones (Gestión de almacenamiento, memoria caché, copias de seguridad en nube, WhatsApp en calidad HD y formato negrita/cursiva, cuidado de batería).
- Unidad 6: Atajos de Teclado y Flujos de Alta Velocidad (Ctrl+C, Ctrl+V, Ctrl+Z, Ctrl+Shift+T para restaurar pestañas, Win+V historial de portapapeles, Win+Shift+S recorte de pantalla, Alt+Tab).
- Unidad 7: Ciberseguridad, Privacidad y Navegación Crítica (Detección de phishing, contraseñas seguras, 2FA doble factor, regla 3-2-1 para copias de seguridad, navegación segura).
- Unidad 8: Inteligencia Artificial Ética y Asistentes Productivos (IA generativa, creación de prompts con Rol-Contexto-Tarea-Formato, alucinaciones y cómo verificarlas, ética académica).

Talleres prácticos disponibles en la página:
- Entrenador de Atajos de Teclado
- Simulador de Formato y Mensajería WhatsApp
- Inspector de Phishing
- Laboratorio de Puertos y Cables
- Explorador Interactivo de Hardware
- Simulador de Hoja de Cálculo
- Laboratorio de Operadores de Búsqueda Google
- Taller de Ingeniería de Prompts

REGLAS OBLIGATORIAS DE RESPUESTA:
1. Responde DIRECTAMENTE y al grano sobre el tema que el aprendiz pregunta. NUNCA respondas con una introducción vacía o evasiva.
2. Explica el concepto de forma clara, amigable y explicativa (2 a 4 oraciones bien explicadas para que sea óptimo al escucharse en voz alta).
3. Si el tema se aborda en una unidad o taller de la página, menciona brevemente la unidad recomendada.
4. SI NO SABES LA RESPUESTA, O SI LA PREGUNTA NO ESTÁ EN EL MANUAL O ESTÁ FUERA DE SU ALCANCE TÉCNICO:
   - Manifiéstalo abiertamente con transparencia (ejemplo: "No tengo esa respuesta específica registrada en este manual...").
   - Y proporciona de inmediato una guía práctica de cómo averiguarlo (por ejemplo: qué términos buscar entre comillas en Google, cómo consultar la documentación técnica oficial o qué prueba segura realizar en el equipo).
5. Trata al usuario siempre como "aprendiz", con calidez pedagógica y entusiasmo formativo.`
        }
      });

      const text = response.text || '';
      return res.json({
        answer: text,
        source: 'gemini'
      });
    } catch (err: any) {
      console.error('[Gemini Tutor Ask Error]', err);
    }
  }

  return res.json({
    useLocalFallback: true
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
          'Eres el Tutor de Voz pedagógico del "Manual de Herramientas TIC para Aprendices". Responde directamente a cualquier duda del aprendiz sobre el manual (hardware, procesadores de texto, Excel, celulares, WhatsApp, atajos de teclado, ciberseguridad, inteligencia artificial y talleres prácticos). Mantén respuestas explicativas y claras de 2 a 4 oraciones. Si no sabes la respuesta o no está en el manual, manifiéstalo con sinceridad y da una guía práctica de cómo averiguarlo (ej. qué buscar en Google o documentación oficial). Trata al usuario siempre como "aprendiz".',
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
