import React, { useState } from 'react';
import { Calculator, Sparkles, RefreshCw, Info } from 'lucide-react';

interface RowData {
  id: number;
  estudiante: string;
  tarea1: number;
  examen: number;
}

export const SpreadsheetSimulator: React.FC = () => {
  const [rows, setRows] = useState<RowData[]>([
    { id: 1, estudiante: 'Ana Martínez', tarea1: 85, examen: 90 },
    { id: 2, estudiante: 'Carlos Ruiz', tarea1: 65, examen: 70 },
    { id: 3, estudiante: 'Elena Gómez', tarea1: 95, examen: 92 },
    { id: 4, estudiante: 'David Morales', tarea1: 50, examen: 58 }
  ]);

  const [activeFormula, setActiveFormula] = useState<'promedio' | 'suma' | 'si' | 'max'>('promedio');

  const handleCellChange = (id: number, field: 'tarea1' | 'examen', value: string) => {
    const num = Math.min(100, Math.max(0, Number(value) || 0));
    setRows(prev => prev.map(r => r.id === id ? { ...r, [field]: num } : r));
  };

  const resetData = () => {
    setRows([
      { id: 1, estudiante: 'Ana Martínez', tarea1: 85, examen: 90 },
      { id: 2, estudiante: 'Carlos Ruiz', tarea1: 65, examen: 70 },
      { id: 3, estudiante: 'Elena Gómez', tarea1: 95, examen: 92 },
      { id: 4, estudiante: 'David Morales', tarea1: 50, examen: 58 }
    ]);
  };

  // Calculations
  const allExamScores = rows.map(r => r.examen);
  const examSum = allExamScores.reduce((a, b) => a + b, 0);
  const examAvg = (examSum / rows.length).toFixed(1);
  const examMax = Math.max(...allExamScores);

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm my-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Simulador Interactivo de Ofimática</span>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">Laboratorio en Vivo de Hojas de Cálculo</h4>
        </div>
        <button
          onClick={resetData}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Restablecer Valores
        </button>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
        Edita los números en las celdas directamente para observar cómo las fórmulas de Excel/Sheets se recalculan en tiempo real:
      </p>

      {/* Formula Selector Tabs */}
      <div className="flex flex-wrap gap-2 mb-4 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
        <button
          onClick={() => setActiveFormula('promedio')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeFormula === 'promedio'
              ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          =PROMEDIO(C2:D2)
        </button>
        <button
          onClick={() => setActiveFormula('si')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeFormula === 'si'
              ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          =SI(Promedio &gt;= 70, "Aprobado", "Reprobado")
        </button>
        <button
          onClick={() => setActiveFormula('suma')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeFormula === 'suma'
              ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          =SUMA(D2:D5)
        </button>
        <button
          onClick={() => setActiveFormula('max')}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
            activeFormula === 'max'
              ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs font-bold'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          =MAX(D2:D5)
        </button>
      </div>

      {/* Live Table Grid */}
      <div className="overflow-x-auto border border-slate-200 dark:border-slate-800 rounded-xl mb-4">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
              <th className="p-2.5 font-mono text-[11px] text-slate-400 dark:text-slate-500 w-12 text-center">Fila</th>
              <th className="p-2.5 font-semibold text-slate-800 dark:text-slate-200 w-48">Columna B: Estudiante</th>
              <th className="p-2.5 font-semibold text-slate-800 dark:text-slate-200 w-28 text-center">Col C: Tarea (0-100)</th>
              <th className="p-2.5 font-semibold text-slate-800 dark:text-slate-200 w-28 text-center">Col D: Examen (0-100)</th>
              <th className="p-2.5 font-semibold text-slate-800 dark:text-slate-200 w-36 text-center">Col E: Promedio</th>
              <th className="p-2.5 font-semibold text-slate-800 dark:text-slate-200 w-36 text-center">Col F: Estado Condicional</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {rows.map((row, index) => {
              const rowNum = index + 2;
              const rowAvg = ((row.tarea1 + row.examen) / 2).toFixed(1);
              const isApproved = Number(rowAvg) >= 70;
              return (
                <tr key={row.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-2.5 font-mono text-[11px] text-slate-400 dark:text-slate-500 text-center bg-slate-50/40 dark:bg-slate-850/40">{rowNum}</td>
                  <td className="p-2.5 font-medium text-slate-800 dark:text-slate-200">{row.estudiante}</td>
                  <td className="p-2.5 text-center">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={row.tarea1}
                      onChange={(e) => handleCellChange(row.id, 'tarea1', e.target.value)}
                      className="w-16 text-center py-1 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono text-xs tabular-nums"
                    />
                  </td>
                  <td className="p-2.5 text-center">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={row.examen}
                      onChange={(e) => handleCellChange(row.id, 'examen', e.target.value)}
                      className="w-16 text-center py-1 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono text-xs tabular-nums"
                    />
                  </td>
                  <td className="p-2.5 text-center font-mono font-semibold text-slate-800 dark:text-slate-200 tabular-nums">
                    {rowAvg}
                  </td>
                  <td className="p-2.5 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded text-[11px] font-semibold ${
                        isApproved
                          ? 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700'
                          : 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700'
                      }`}
                    >
                      {isApproved ? 'Aprobado' : 'Reprobado'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr className="bg-slate-50 dark:bg-slate-800/60 font-medium border-t-2 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200">
              <td className="p-2.5 text-center text-slate-400 dark:text-slate-500 font-mono text-[11px]">6</td>
              <td className="p-2.5 font-bold text-slate-900 dark:text-white">Resumen Estadístico</td>
              <td className="p-2.5 text-center text-slate-500 dark:text-slate-400 text-[11px]">4 alumnos</td>
              <td className="p-2.5 text-center font-mono font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                {activeFormula === 'suma' && `Σ = ${examSum}`}
                {activeFormula === 'promedio' && `X̄ = ${examAvg}`}
                {activeFormula === 'max' && `Max = ${examMax}`}
                {activeFormula === 'si' && `X̄ = ${examAvg}`}
              </td>
              <td className="p-2.5 text-center font-mono text-slate-500 dark:text-slate-400 text-[11px]">Promedio Gral: {examAvg}</td>
              <td className="p-2.5 text-center text-slate-500 dark:text-slate-400 text-[11px]">
                {rows.filter(r => (r.tarea1 + r.examen) / 2 >= 70).length} de {rows.length} Aprobados
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Formula Explanation Callout */}
      <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl p-4 transition-colors">
        <div className="flex items-start gap-2.5">
          <Calculator className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <h5 className="font-bold text-emerald-950 dark:text-emerald-200 mb-1">
              Desglose de la Fórmula Activa: <code className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-700 font-mono text-emerald-800 dark:text-emerald-300">
                {activeFormula === 'promedio' && '=PROMEDIO(C2:D2)'}
                {activeFormula === 'si' && '=SI(E2>=70, "Aprobado", "Reprobado")'}
                {activeFormula === 'suma' && '=SUMA(D2:D5)'}
                {activeFormula === 'max' && '=MAX(D2:D5)'}
              </code>
            </h5>
            <p className="text-emerald-900 dark:text-emerald-200/90 leading-relaxed">
              {activeFormula === 'promedio' && 'Suma las celdas seleccionadas y las divide automáticamente entre la cantidad de elementos. Si cambias el examen de David Morales a 90, su promedio pasa inmediatamente de 54 a 70.'}
              {activeFormula === 'si' && 'La función lógica condicional evalúa: ¿Es el promedio de la fila mayor o igual a 70? Si la respuesta es SÍ, arroja el texto "Aprobado"; si es NO, arroja "Reprobado" sin requerir intervención humana.'}
              {activeFormula === 'suma' && 'Suma verticalmente todos los exámenes finales de la clase. El total actual es ' + examSum + ' puntos.'}
              {activeFormula === 'max' && 'Identifica el puntaje más alto obtenido en la columna del examen final. Actualmente es ' + examMax + ' puntos.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
