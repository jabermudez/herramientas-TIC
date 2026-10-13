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

// REST endpoint for Voice Tutor Q&A using resilient Gemini model pipeline
app.post('/api/tutor-ask', async (req, res) => {
  const { question } = req.body;
  if (!question || typeof question !== 'string') {
    return res.status(400).json({ error: 'La pregunta es requerida' });
  }

  if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    const candidateModels = ['gemini-3.1-flash-lite', 'gemini-3.8-flash', 'gemini-flash-latest'];
    const systemPrompt = `Eres el Tutor de Voz pedagógico e interactivo del "Manual de Herramientas TIC para Aprendices".
Tu misión es guiar, motivar y enseñar de manera cálida, natural, clara y cercana a aprendices de formación técnica y laboral en Colombia y Latinoamérica.

Estructura del Manual de Herramientas TIC:
- Unidad 1: Fundamentos de las TIC y del Entorno Digital:
  * El Computador (Máquina electrónica programable que procesa datos crudos para generar información útil).
  * Ciclo de Procesamiento de Datos (4 fases: Entrada/Input, Procesamiento/CPU, Almacenamiento/RAM y SSD, Salida/Output).
  * Distinción entre Dato crudo (materia prima) e Información procesada (conocimiento útil).
  * Tipos de computadores (Escritorio, Portátil, Servidores 24/7 en la nube, Dispositivos móviles, Sistemas embebidos).
  * La dualidad Hardware (físico/tangible) vs. Software (lógico/intangible) y tipos de extensiones de archivo (.docx, .xlsx, .pdf).
  * Internet, protocolo seguro HTTPS con candado, computación en la nube (Google Drive/OneDrive) y huella digital responsable.
- Unidad 2: Arquitectura del Hardware y Diagnóstico (CPU procesador, RAM volátil, SSD vs HDD, placa madre, pasta térmica, fuente de poder, puertos USB-C/HDMI/DisplayPort, mantenimiento preventivo).
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

REGLAS CRÍTICAS DE RESPUESTA:
1. RESPONDE DIRECTO AL TEMA PREGUNTADO: Si el aprendiz pregunta sobre el computador, la memoria RAM, una fórmula de Excel, un atajo o cualquier otro tema, responde inmediatamente sobre ESE tema específico con claridad pedagógica y analogías cotidianas. NUNCA repitas el concepto de TIC si no te han preguntado qué son las TIC.
2. SI TE SALUDAN Y PREGUNTAN AL MISMO TIEMPO (ej. "hola qué es un computador" o "buenas tardes cómo funciona la memoria ram"): Saluda brevemente en una frase corta y responde de lleno al tema consultado.
3. SI ES EXCLUSIVAMENTE UN SALUDO (ej. "hola", "cómo estás"): Saluda cálidamente y ofrece ejemplos de qué temas pueden consultar en el manual (el computador, hardware, Excel, ciberseguridad, atajos).
4. SI LA PREGUNTA NO ESTÁ EN EL MANUAL O ESTÁ FUERA DE INFORMÁTICA:
   - Manifiéstalo amablemente y con sinceridad ("Ese tema específico no se encuentra detallado en el manual técnico actual").
   - Brinda una guía práctica inmediata sobre cómo buscarlo de forma segura (palabras clave con comillas en Google, documentación oficial o foros especializados).
   - Sugiere 2 o 3 temas del manual que sí puede consultar.
5. Mantén respuestas concisas de 2 a 4 oraciones bien explicadas (óptimas para escucha por voz), tratando al usuario siempre con respeto como "aprendiz".`;

    for (const modelName of candidateModels) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: question,
          config: {
            systemInstruction: systemPrompt,
          },
        });

        const text = response.text || '';
        if (text) {
          return res.json({
            answer: text,
            source: 'gemini',
            modelUsed: modelName,
          });
        }
      } catch (err: any) {
        console.warn(`[Gemini Tutor ${modelName} warning]:`, err?.message || err);
        // Continue to next model candidate
      }
    }
  }

  return res.json({
    useLocalFallback: true,
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
          voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } },
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
