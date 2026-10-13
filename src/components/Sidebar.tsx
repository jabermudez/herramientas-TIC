import React, { useState } from 'react';
import { Unit } from '../types/manual';
import { CheckCircle2, Keyboard, MessageSquare, Globe, ShieldAlert, Cable, ChevronLeft, ChevronRight, BookOpen, Layers } from 'lucide-react';

interface SidebarProps {
  units: Unit[];
  activeUnitId: string;
  onSelectUnit: (unitId: string) => void;
  completedUnits: Record<string, boolean>;
  activeView: string;
  setActiveView: (view: string) => void;
  activeWorkshop: string;
  setActiveWorkshop: (workshop: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  units,
  activeUnitId,
  onSelectUnit,
  completedUnits,
  activeView,
  setActiveView,
  activeWorkshop,
  setActiveWorkshop,
  isOpen,
  onToggle
}) => {
  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Panel */}
      <aside
        className={`fixed lg:sticky top-16 z-40 lg:z-10 h-[calc(100vh-4rem)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out shrink-0 flex flex-col justify-between shadow-lg lg:shadow-none ${
          isOpen
            ? 'w-72 sm:w-80 translate-x-0'
            : '-translate-x-full lg:translate-x-0 lg:w-0 lg:border-r-0 lg:overflow-hidden lg:p-0'
        }`}
      >
        <div className={`flex-1 overflow-y-auto p-4 ${!isOpen && 'lg:hidden'}`}>
          {/* Header of Drawer */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Índice del Manual</span>
            </div>
            <button
              onClick={onToggle}
              title="Ocultar índice lateral para ampliar lectura"
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Curricular Syllabus Navigation */}
          <div className="mb-6">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3 px-2">
              Unidades de Aprendizaje
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
                      if (window.innerWidth < 1024) {
                        onToggle();
                      }
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-start gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/90 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
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
                      <p className="truncate font-semibold text-slate-900 dark:text-slate-100">{unit.title}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 font-normal">
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
              Talleres Prácticos
            </p>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setActiveView('talleres-practicos');
                  setActiveWorkshop('atajos-pc');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  activeView === 'talleres-practicos' && activeWorkshop === 'atajos-pc'
                    ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Keyboard className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                <span className="truncate">Atajos de Teclado PC</span>
              </button>

              <button
                onClick={() => {
                  setActiveView('talleres-practicos');
                  setActiveWorkshop('atajos-web');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  activeView === 'talleres-practicos' && activeWorkshop === 'atajos-web'
                    ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <span className="truncate">Atajos de Navegación Web</span>
              </button>

              <button
                onClick={() => {
                  setActiveView('talleres-practicos');
                  setActiveWorkshop('whatsapp');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  activeView === 'talleres-practicos' && activeWorkshop === 'whatsapp'
                    ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="truncate">Formatos de WhatsApp</span>
              </button>

              <button
                onClick={() => {
                  setActiveView('talleres-practicos');
                  setActiveWorkshop('phishing');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  activeView === 'talleres-practicos' && activeWorkshop === 'phishing'
                    ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                <span className="truncate">Detector de Phishing</span>
              </button>

              <button
                onClick={() => {
                  setActiveView('talleres-practicos');
                  setActiveWorkshop('puertos');
                  if (window.innerWidth < 1024) onToggle();
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  activeView === 'talleres-practicos' && activeWorkshop === 'puertos'
                    ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Cable className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span className="truncate">Puertos & Cables</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info Box */}
        {isOpen && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-900/50">
            <p className="font-semibold text-slate-700 dark:text-slate-300">Manual de Herramientas TIC</p>
            <p className="mt-0.5 text-slate-500 dark:text-slate-400 text-[11px]">Material pedagógico directo para aprendices.</p>
          </div>
        )}
      </aside>
    </>
  );
};
