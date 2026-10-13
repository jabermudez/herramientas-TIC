import React, { useState } from 'react';
import { Search, Sparkles, Filter, FileText, CheckCircle2 } from 'lucide-react';

interface OperatorDemo {
  operator: string;
  syntax: string;
  description: string;
  exampleQuery: string;
  simulatedReduction: string;
  idealFor: string;
}

const OPERATORS_DATA: OperatorDemo[] = [
  {
    operator: 'Comillas ("")',
    syntax: '"término exacto"',
    description: 'Obliga al buscador a encontrar la frase exacta en ese orden estricto de palabras, sin sinónimos ni palabras dispersas.',
    exampleQuery: '"seguridad en hojas de cálculo"',
    simulatedReduction: 'De 18.000.000 de resultados dispersos a 4.200 resultados con la frase exacta.',
    idealFor: 'Encontrar autores de citas, nombres de reglamentos o mensajes de error específicos.'
  },
  {
    operator: 'site:',
    syntax: 'site:dominio.com',
    description: 'Restringe la búsqueda exclusivamente a un sitio web específico o a un tipo de dominio (como .edu para universidades o .gob para el gobierno).',
    exampleQuery: 'manual tic site:edu',
    simulatedReduction: 'Filtra solo páginas académicas universitarias, eliminando publicidad y blogs comerciales.',
    idealFor: 'Investigación académica seria, leyes oficiales o manuales institucionales.'
  },
  {
    operator: 'filetype:',
    syntax: 'filetype:extension',
    description: 'Busca únicamente documentos descargables en un formato específico (como PDF, DOCX, XLSX, PPTX).',
    exampleQuery: 'ejercicios excel formulas filetype:xlsx',
    simulatedReduction: 'Descarga directa de plantillas de cálculo reales listas para practicar.',
    idealFor: 'Descargar libros completos en PDF, informes técnicos o plantillas de hojas de cálculo.'
  },
  {
    operator: 'Menos (-)',
    syntax: 'término -palabraExcluida',
    description: 'Excluye de los resultados cualquier página que contenga la palabra indicada después del signo menos.',
    exampleQuery: 'virus informatico -biologico',
    simulatedReduction: 'Elimina noticias de medicina y se enfoca 100% en ciberseguridad.',
    idealFor: 'Depurar búsquedas cuando una palabra tiene dos significados distintos.'
  }
];

export const SearchOperatorsLab: React.FC = () => {
  const [selectedOp, setSelectedOp] = useState<string>('Comillas ("")');
  const activeOp = OPERATORS_DATA.find(o => o.operator === selectedOp) || OPERATORS_DATA[0];

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm my-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sky-50 dark:bg-sky-950/60 rounded-lg text-sky-600 dark:text-sky-400">
            <Search className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400">Taller de Destreza Digital</span>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Operadores de Búsqueda Avanzada en la Web</h4>
          </div>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">Aprende a buscar información precisa como aprendiz</span>
      </div>

      {/* Operator Buttons */}
      <div className="flex flex-wrap gap-2 mb-5 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
        {OPERATORS_DATA.map(item => (
          <button
            key={item.operator}
            onClick={() => setSelectedOp(item.operator)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              selectedOp === item.operator
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {item.operator}
          </button>
        ))}
      </div>

      {/* Demo Box */}
      <div className="p-5 bg-sky-50/70 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800/60">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <h5 className="text-base font-bold text-slate-900 dark:text-white">Operador: {activeOp.syntax}</h5>
          <span className="text-xs font-mono font-semibold bg-white dark:bg-slate-800 px-2.5 py-1 rounded border border-sky-300 dark:border-sky-700 text-sky-900 dark:text-sky-200">
            {activeOp.simulatedReduction}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-4">{activeOp.description}</p>

        {/* Search bar simulation */}
        <div className="bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-300 dark:border-slate-700 shadow-inner flex items-center gap-3 mb-4">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
          <span className="font-mono text-xs sm:text-sm text-slate-900 dark:text-white font-semibold">{activeOp.exampleQuery}</span>
        </div>

        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span><strong>Caso de uso recomendado:</strong> {activeOp.idealFor}</span>
        </div>
      </div>
    </div>
  );
};
