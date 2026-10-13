import React from 'react';
import { Unit } from '../types/manual';
import { CheckCircle2, Circle, Keyboard, MessageSquare, Globe, Sparkles, BookOpen, ChevronRight, Github } from 'lucide-react';

interface SidebarProps {
  units: Unit[];
  activeUnitId: string;
  onSelectUnit: (unitId: string) => void;
  completedUnits: Record<string, boolean>;
  activeView: string;
  setActiveView: (view: string) => void;
  activeWorkshop: string;
  setActiveWorkshop: (workshop: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  units,
  activeUnitId,
  onSelectUnit,
  completedUnits,
  activeView,
  setActiveView,
  activeWorkshop,
  setActiveWorkshop
}) => {
  return (
    <aside className="w-full lg:w-80 shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 lg:min-h-[calc(100vh-4rem)] flex flex-col justify-between transition-colors">
      <div>
        {/* Curricular Syllabus Navigation */}
        <div className="mb-6">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-2">
            Índice de Unidades Temáticas
          </p>
          <div className="space-y-1">
            {units.map((unit) => {
              const isSelected = activeView === 'unidades' && activeUnitId === unit.id;
              const isCompleted = !!completedUnits[unit.id];

              return (
                <button
                  key={unit.id}
                  onClick={() => {
                    setActiveView('unidades');
                    onSelectUnit(unit.id);
                  }}
                  className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start gap-2.5 ${
                    isSelected
                      ? 'bg-indigo-50/90 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 text-[10px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-center bg-slate-50 dark:bg-slate-800">
                        {unit.unitNumber}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="truncate font-semibold">{unit.title}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                      {unit.level}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Practical Workshops Section */}
        <div className="mb-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-2">
            Talleres de Destreza Práctica
          </p>
          <div className="space-y-1">
            <button
              onClick={() => {
                setActiveView('talleres-practicos');
                setActiveWorkshop('atajos-pc');
              }}
              className={`w-full text-left p-2 rounded-lg text-xs transition-all flex items-center gap-2 ${
                activeView === 'talleres-practicos' && activeWorkshop === 'atajos-pc'
                  ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Keyboard className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span className="truncate">Atajos de Teclado PC</span>
            </button>

            <button
              onClick={() => {
                setActiveView('talleres-practicos');
                setActiveWorkshop('atajos-web');
              }}
              className={`w-full text-left p-2 rounded-lg text-xs transition-all flex items-center gap-2 ${
                activeView === 'talleres-practicos' && activeWorkshop === 'atajos-web'
                  ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Globe className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
              <span className="truncate">Atajos de Navegación Web</span>
            </button>

            <button
              onClick={() => {
                setActiveView('talleres-practicos');
                setActiveWorkshop('whatsapp');
              }}
              className={`w-full text-left p-2 rounded-lg text-xs transition-all flex items-center gap-2 ${
                activeView === 'talleres-practicos' && activeWorkshop === 'whatsapp'
                  ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="truncate">Trucos de WhatsApp</span>
            </button>

            <button
              onClick={() => {
                setActiveView('talleres-practicos');
                setActiveWorkshop('github');
              }}
              className={`w-full text-left p-2 rounded-lg text-xs transition-all flex items-center gap-2 ${
                activeView === 'talleres-practicos' && activeWorkshop === 'github'
                  ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Github className="w-4 h-4 text-slate-800 dark:text-slate-200 shrink-0" />
              <span className="truncate">Subir a GitHub Pages</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
        <p className="font-semibold text-slate-700 dark:text-slate-300">Manual de Herramientas TIC</p>
        <p className="mt-0.5 text-slate-400 dark:text-slate-500">Progresión didáctica: De conceptos tangibles a herramientas intermedias.</p>
      </div>
    </aside>
  );
};
