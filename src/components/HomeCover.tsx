import React from 'react';
import { Unit } from '../types/manual';
import { MANUAL_METADATA } from '../data/manualData';
import { BookOpen, ArrowRight, CheckCircle2, Shield, Sparkles, Terminal, Smartphone, LayoutGrid, HelpCircle, Layers, Compass, Mic } from 'lucide-react';

interface HomeCoverProps {
  units: Unit[];
  onSelectUnit: (unitId: string) => void;
  onOpenWorkshops: () => void;
  onOpenGlossary: () => void;
  onOpenVoiceTutor: () => void;
  completedUnits: Record<string, boolean>;
}

export const HomeCover: React.FC<HomeCoverProps> = ({
  units,
  onSelectUnit,
  onOpenWorkshops,
  onOpenGlossary,
  onOpenVoiceTutor,
  completedUnits
}) => {
  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-12">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-xs font-semibold text-indigo-300 mb-6">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Manual Didáctico con Tutor de Voz en Vivo</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 leading-tight">
                {MANUAL_METADATA.courseTitle}
              </h1>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-6 font-normal">
                Manual diseñado exclusivamente para aprendices en formación. Una ruta guiada desde el hardware físico y la ofimática analítica hasta la productividad móvil, prompting ético de Inteligencia Artificial y ciberseguridad práctica.
              </p>

              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-slate-300 mb-8 font-medium">
                <span>{units.length} Unidades Temáticas</span>
                <span aria-hidden="true">·</span>
                <span>Laboratorios Interactivos</span>
                <span aria-hidden="true">·</span>
                <span>Tutor de Voz Integrado</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onSelectUnit('unidad-1')}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 group"
              >
                <span>Explorar Unidad 1: Fundamentos</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>

              <button
                onClick={onOpenVoiceTutor}
                className="px-5 py-3 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-200 border border-indigo-400/40 font-semibold text-xs rounded-xl transition-all flex items-center gap-2"
              >
                <Mic className="w-4 h-4 text-indigo-400 animate-pulse" />
                <span>Hablar con Tutor de Voz</span>
              </button>

              <button
                onClick={onOpenWorkshops}
                className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl transition-all border border-slate-700 flex items-center gap-2"
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Ver Talleres y Atajos</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
            <img
              src={MANUAL_METADATA.heroImage}
              alt="Plataforma interactiva del manual de herramientas TIC"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* Pedagogical Methodology Framework */}
      <section className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xs transition-colors">
        <div className="flex items-center gap-2 mb-2">
          <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Estructura Didáctica: ¿Cómo está organizado este manual?
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-6 leading-relaxed">
          Este manual sigue el principio del <strong>constructivismo digital progresivo</strong>: cada unidad toma como cimiento los conceptos aprendidos en las anteriores, guiando al lector desde el plano físico tangible hasta la abstracción productiva inteligente.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-5 bg-gradient-to-br from-slate-50 to-indigo-50/50 dark:from-slate-800/80 dark:to-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 rounded-2xl shadow-xs">
            <span className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center mb-3 text-xs shadow-xs">1</span>
            <h4 className="font-bold text-slate-900 dark:text-white mb-1 text-sm">Nivel 1: Lo Tangible y Conectable</h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Comprender el hardware físico, la CPU, la RAM, el almacenamiento SSD, los periféricos, los puertos de conexión y las redes que sostienen los datos.
            </p>
          </div>
          <div className="p-5 bg-gradient-to-br from-slate-50 to-emerald-50/50 dark:from-slate-800/80 dark:to-emerald-950/40 border border-emerald-100 dark:border-emerald-900/60 rounded-2xl shadow-xs">
            <span className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-bold flex items-center justify-center mb-3 text-xs shadow-xs">2</span>
            <h4 className="font-bold text-slate-900 dark:text-white mb-1 text-sm">Nivel 2: La Creación y el Análisis</h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Estructurar documentos formales con estilos, dominar fórmulas matemáticas en hojas de cálculo y sintetizar ideas con la regla 6x6.
            </p>
          </div>
          <div className="p-5 bg-gradient-to-br from-slate-50 to-purple-50/50 dark:from-slate-800/80 dark:to-purple-950/40 border border-purple-100 dark:border-purple-900/60 rounded-2xl shadow-xs">
            <span className="w-7 h-7 rounded-xl bg-purple-600 text-white font-bold flex items-center justify-center mb-3 text-xs shadow-xs">3</span>
            <h4 className="font-bold text-slate-900 dark:text-white mb-1 text-sm">Nivel 3: La Movilidad y el Futuro</h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Optimizar el celular para escaneo y oficina móvil, estructurar prompts para IA sin alucinaciones y defenderse del fraude digital con 2FA.
            </p>
          </div>
        </div>
      </section>

      {/* Curriculum Units Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Unidades Temáticas del Manual</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Selecciona cualquier unidad para consultar explicaciones, laboratorios y ejercicios</p>
          </div>
          <button
            onClick={onOpenGlossary}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Consultar Glosario TIC</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {units.map((unit) => {
            const isCompleted = !!completedUnits[unit.id];
            return (
              <div
                key={unit.id}
                onClick={() => onSelectUnit(unit.id)}
                className="group cursor-pointer p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-3xl shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 px-3 py-1 rounded-full border border-indigo-200 dark:border-indigo-800">
                      Unidad {unit.unitNumber} · {unit.level}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        Completada
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">Por estudiar</span>
                    )}
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors mb-2">
                    {unit.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                    {unit.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-700 dark:group-hover:text-indigo-300">
                  <span>{unit.sections.length} temas explicados + Laboratorio</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Didactic Guidelines Callout */}
      <section className="p-6 sm:p-8 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/90 dark:border-amber-900/50 rounded-3xl transition-colors">
        <h3 className="text-base sm:text-lg font-bold text-amber-950 dark:text-amber-200 mb-2">
          Orientaciones Didácticas para la Consulta y Práctica
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">
          Este manual utiliza un lenguaje técnico accesible y pedagogía activa. Recomendaciones para aprovechar al máximo el material:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <li className="flex items-start gap-2.5">
            <span className="text-amber-700 dark:text-amber-400 font-bold">•</span>
            <span>Estudiar las analogías cotidianas (el chef, la despensa, la partitura) para comprender la lógica de fondo antes de memorizar tecnicismos.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-amber-700 dark:text-amber-400 font-bold">•</span>
            <span>Interactuar con los simuladores en vivo (explorador de hardware, mini-hoja de cálculo y detector de phishing) para experimentar en tiempo real.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-amber-700 dark:text-amber-400 font-bold">•</span>
            <span>Utilizar las tarjetas de repaso rápido (Flashcards) antes de resolver los cuestionarios de autoevaluación.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="text-amber-700 dark:text-amber-400 font-bold">•</span>
            <span>Aprovechar el botón de "Modo Impresión / PDF" para generar resúmenes físicos o material de estudio impreso.</span>
          </li>
        </ul>
      </section>
    </div>
  );
};
