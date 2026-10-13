import React, { useState } from 'react';
import { Bot, CheckCircle2, AlertTriangle, Copy, Check, Sparkles, BookOpen } from 'lucide-react';

interface PresetPrompt {
  name: string;
  rol: string;
  contexto: string;
  tarea: string;
  formato: string;
  restricciones: string;
}

const PRESETS: PresetPrompt[] = [
  {
    name: 'Aprendiz: Preparación para Evaluación',
    rol: 'Tutor técnico TIC con paciencia pedagógica y ejemplos claros.',
    contexto: 'Soy un aprendiz que está comenzando a estudiar hardware y componentes de computadores.',
    tarea: 'Diseña un cuestionario de repaso con 4 preguntas prácticas de opción múltiple basadas en casos de la vida real.',
    formato: 'Presenta cada pregunta numerada, 4 opciones (A, B, C, D), indica la respuesta correcta y redacta una breve explicación comprensible.',
    restricciones: 'Usa lenguaje sencillo sin tecnicismos excesivos y limita la longitud a un máximo de 350 palabras.'
  },
  {
    name: 'Aprendiz: Redacción de Correo Formal',
    rol: 'Especialista en comunicación formal y redacción institucional.',
    contexto: 'Soy un aprendiz que necesita justificar formalmente un permiso o solicitar una revisión de evidencia ante la coordinación.',
    tarea: 'Redacta una plantilla de correo electrónico formal, respetuosa y profesional.',
    formato: 'Incluye Asunto claro, Saludo formal, Cuerpo en 2 párrafos concisos, Llamado a la acción con datos clave resaltados y Despedida institucional.',
    restricciones: 'Tono educado y profesional, sin palabras informales, máximo 180 palabras.'
  },
  {
    name: 'Aprendiz: Resumen de Ciberseguridad',
    rol: 'Tutor pedagógico experto en seguridad digital y prevención de fraudes.',
    contexto: 'Soy un aprendiz que necesita dominar la diferencia práctica entre Phishing y Malware para proteger mis cuentas y equipos.',
    tarea: 'Explica ambos conceptos utilizando analogías con la vida cotidiana en una vivienda común.',
    formato: 'Crea una tabla comparativa de 3 columnas: Concepto, Analogía Cotidiana y Cómo Protegerse.',
    restricciones: 'Usa lenguaje claro para aprendices, sin jerga de redes compleja.'
  }
];

export const PromptCraftSandbox: React.FC = () => {
  const [rol, setRol] = useState<string>(PRESETS[0].rol);
  const [contexto, setContexto] = useState<string>(PRESETS[0].contexto);
  const [tarea, setTarea] = useState<string>(PRESETS[0].tarea);
  const [formato, setFormato] = useState<string>(PRESETS[0].formato);
  const [restricciones, setRestricciones] = useState<string>(PRESETS[0].restricciones);
  const [copied, setCopied] = useState<boolean>(false);
  const [showSimulatedOutput, setShowSimulatedOutput] = useState<boolean>(false);

  const loadPreset = (p: PresetPrompt) => {
    setRol(p.rol);
    setContexto(p.contexto);
    setTarea(p.tarea);
    setFormato(p.formato);
    setRestricciones(p.restricciones);
    setShowSimulatedOutput(false);
  };

  // Calculate score based on components filled
  const componentsCount = [rol, contexto, tarea, formato, restricciones].filter(s => s.trim().length > 10).length;
  const score = Math.round((componentsCount / 5) * 100);

  const assembledPrompt = `Actúa como: ${rol}\n\nContexto: ${contexto}\n\nTarea principal: ${tarea}\n\nFormato de respuesta: ${formato}\n\nRestricciones: ${restricciones}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(assembledPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm my-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">Simulador de Inteligencia Artificial</span>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">Arquitecto de Prompts Profesionales (Fórmula R-C-T-F-R)</h4>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Plantillas de Práctica:</span>
          <div className="flex gap-1">
            {PRESETS.map((p, i) => (
              <button
                key={i}
                onClick={() => loadPreset(p)}
                className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors cursor-pointer border border-transparent dark:border-slate-700"
              >
                {p.name.split(':')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Input blocks */}
        <div className="space-y-3">
          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-1.5">
              <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-[11px] font-bold flex items-center justify-center">R</span>
              1. Rol (Identidad y especialidad de la IA)
            </label>
            <textarea
              value={rol}
              onChange={(e) => setRol(e.target.value)}
              rows={2}
              className="w-full p-3 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              placeholder="Ej. Actúa como tutor experto en ofimática con explicaciones paso a paso..."
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-1.5">
              <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 text-[11px] font-bold flex items-center justify-center">C</span>
              2. Contexto (Tu situación y nivel como aprendiz)
            </label>
            <textarea
              value={contexto}
              onChange={(e) => setContexto(e.target.value)}
              rows={2}
              className="w-full p-3 text-xs sm:text-sm border border-slate-300 dark:border-slate-700 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              placeholder="Ej. Soy un aprendiz en etapa lectiva aprendiendo a estructurar fórmulas en Excel..."
            />
          </div>

          <div>
            <label className="text-xs sm:text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5 mb-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold flex items-center justify-center">T</span>
              3. Tarea (Acción concreta y verbo principal)
            </label>
            <textarea
              value={tarea}
              onChange={(e) => setTarea(e.target.value)}
              rows={2}
              className="w-full p-2.5 text-xs border border-slate-300 dark:border-slate-700 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              placeholder="Ej. Explica la diferencia entre memoria RAM y disco duro..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
                <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[11px] font-bold flex items-center justify-center">F</span>
                4. Formato de Entrega
              </label>
              <textarea
                value={formato}
                onChange={(e) => setFormato(e.target.value)}
                rows={2}
                className="w-full p-2.5 text-xs border border-slate-300 dark:border-slate-700 rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                placeholder="Ej. Tabla con 3 columnas, viñetas, máx 2 párrafos..."
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5 mb-1">
                <span className="w-5 h-5 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 text-[11px] font-bold flex items-center justify-center">R</span>
                5. Restricciones
              </label>
              <textarea
                value={restricciones}
                onChange={(e) => setRestricciones(e.target.value)}
                rows={2}
                className="w-full p-2.5 text-xs border border-slate-300 dark:border-slate-700 rounded-xl focus:border-rose-500 focus:ring-1 focus:ring-rose-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                placeholder="Ej. No uses jerga técnica, máximo 200 palabras..."
              />
            </div>
          </div>
        </div>

        {/* Right: Assembly and Quality Meter */}
        <div className="flex flex-col justify-between bg-slate-50 dark:bg-slate-850/80 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">Prompt Ensamblado Final</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 dark:text-slate-400">Calidad:</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${score >= 80 ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700' : 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-700'}`}>
                  {score}% Completo
                </span>
              </div>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-mono text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed max-h-[220px] overflow-y-auto mb-4">
              {assembledPrompt}
            </div>

            {/* Quality feedback message */}
            <div className="flex items-start gap-2 p-3 bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/60 rounded-xl text-xs text-purple-900 dark:text-purple-200 mb-4">
              <Sparkles className="w-4 h-4 text-purple-700 dark:text-purple-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold mb-0.5">Por qué este prompt obtiene resultados superiores:</p>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  Al fijar el <strong>Rol</strong> y las <strong>Restricciones</strong>, obligas a la IA a descartar divagaciones genéricas y concentrar su potencia estadística exactamente en el tono y formato que requieres.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setShowSimulatedOutput(!showSimulatedOutput)}
              className="px-3.5 py-2 text-xs font-semibold text-purple-800 dark:text-purple-300 bg-purple-100 dark:bg-purple-950/70 hover:bg-purple-200 dark:hover:bg-purple-900 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer border border-purple-200 dark:border-purple-800"
            >
              <Bot className="w-4 h-4" />
              {showSimulatedOutput ? 'Ocultar Salida Simulada' : 'Simular Respuesta de IA'}
            </button>

            <button
              onClick={handleCopy}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-500 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? '¡Copiado para usar en Gemini!' : 'Copiar Prompt Completo'}
            </button>
          </div>

          {showSimulatedOutput && (
            <div className="mt-4 p-3 bg-white dark:bg-slate-800 border border-purple-300 dark:border-purple-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 animate-fadeIn">
              <p className="font-bold text-purple-900 dark:text-purple-300 mb-1 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Respuesta estructurada entregada por el modelo:
              </p>
              <p className="italic text-slate-600 dark:text-slate-300 mb-2">
                "¡Entendido! Asumiendo el rol solicitado, aquí tienes el desglose respetando el límite de extensión y el formato solicitado..."
              </p>
              <div className="text-[11px] text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
                Respuesta generada con cero alucinaciones gracias a las restricciones claras de vocabulario y estructura delimitada.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
