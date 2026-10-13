import React, { useEffect } from 'react';
import { Unit } from '../types/manual';
import {
  CheckCircle2,
  Keyboard,
  MessageSquare,
  Globe,
  ShieldAlert,
  Cable,
  ChevronLeft,
  BookOpen,
  Layers,
  Home,
  HelpCircle,
  Radio,
  X,
  Compass
} from 'lucide-react';

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
  onOpenGlossary?: () => void;
  onOpenVoiceTutor?: () => void;
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
  onToggle,
  onOpenGlossary,
  onOpenVoiceTutor
}) => {
  // Prevent body scrolling when mobile drawer is open to eliminate jitter & overflow
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (isOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleMobileClose = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay - strictly covers full screen behind drawer */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs lg:hidden transition-opacity cursor-pointer animate-fadeIn"
          aria-label="Cerrar menú lateral"
        />
      )}

      {/* Main Sidebar Drawer Panel - Completely Responsive and Bounded */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 lg:z-10 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ease-in-out shrink-0 flex flex-col justify-between max-w-[85vw] sm:max-w-xs ${
          isOpen
            ? 'w-[285px] sm:w-80 translate-x-0 visible pointer-events-auto shadow-2xl lg:shadow-none'
            : '-translate-x-full invisible pointer-events-none lg:translate-x-0 lg:visible lg:pointer-events-auto lg:w-0 lg:border-r-0 lg:overflow-hidden lg:p-0'
        }`}
      >
        <div className={`flex-1 overflow-y-auto p-4 ${!isOpen && 'lg:hidden'}`}>
          {/* Header of Drawer */}
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
              <div className="p-1.5 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 rounded-lg">
                <Layers className="w-4 h-4" />
              </div>
              <span className="tracking-tight">Menú del Manual TIC</span>
            </div>

            {/* Mobile Close Button (X) or Desktop Collapse (ChevronLeft) */}
            <button
              onClick={onToggle}
              title="Cerrar menú lateral"
              aria-label="Cerrar menú lateral"
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              <span className="lg:hidden">
                <X className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </span>
              <span className="hidden lg:inline">
                <ChevronLeft className="w-5 h-5" />
              </span>
            </button>
          </div>

          {/* Quick Access Menu (Essential on mobile so users can switch views) */}
          <div className="mb-5 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2 px-2">
              Navegación General
            </p>

            <button
              onClick={() => {
                setActiveView('portada');
                handleMobileClose();
              }}
              className={`w-full text-left p-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2.5 cursor-pointer ${
                activeView === 'portada'
                  ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Home className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span className="font-semibold">Portada e Inicio</span>
            </button>

            {onOpenGlossary && (
              <button
                onClick={() => {
                  onOpenGlossary();
                  handleMobileClose();
                }}
                className="w-full text-left p-2.5 rounded-xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span>Glosario Pedagógico</span>
              </button>
            )}

            {onOpenVoiceTutor && (
              <button
                onClick={() => {
                  onOpenVoiceTutor();
                  handleMobileClose();
                }}
                className="w-full text-left p-2.5 rounded-xl text-xs sm:text-sm text-indigo-700 dark:text-indigo-300 bg-indigo-50/60 dark:bg-indigo-950/40 hover:bg-indigo-100/70 dark:hover:bg-indigo-900/50 border border-indigo-100 dark:border-indigo-900/60 transition-all flex items-center gap-2.5 cursor-pointer"
              >
                <Radio className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-pulse shrink-0" />
                <span className="font-semibold">Tutor de Voz Interactivo</span>
              </button>
            )}
          </div>

          {/* Curricular Syllabus Navigation */}
          <div className="mb-6 pt-3 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-2.5 px-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                Unidades de Aprendizaje
              </p>
              <span className="text-[10px] font-medium text-slate-400">
                {Object.values(completedUnits).filter(Boolean).length}/{units.length}
              </span>
            </div>

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
                      handleMobileClose();
                    }}
                    className={`w-full text-left p-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-start gap-2.5 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50/90 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800 shadow-2xs'
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
          <div className="mb-6 pt-3 border-t border-slate-200 dark:border-slate-800">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5 px-2">
              Talleres Prácticos y Labs
            </p>
            <div className="space-y-1">
              <button
                onClick={() => {
                  setActiveView('talleres-practicos');
                  setActiveWorkshop('atajos-pc');
                  handleMobileClose();
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
                  handleMobileClose();
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  activeView === 'talleres-practicos' && activeWorkshop === 'atajos-web'
                    ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Globe className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                <span className="truncate">Atajos Web & Búsqueda</span>
              </button>

              <button
                onClick={() => {
                  setActiveView('talleres-practicos');
                  setActiveWorkshop('whatsapp');
                  handleMobileClose();
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
                  handleMobileClose();
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
                  handleMobileClose();
                }}
                className={`w-full text-left p-2.5 rounded-xl text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer ${
                  activeView === 'talleres-practicos' && activeWorkshop === 'puertos'
                    ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 font-semibold border border-indigo-200 dark:border-indigo-800'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Cable className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                <span className="truncate">Puertos & Cables PC</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info Box */}
        {isOpen && (
          <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 bg-slate-50/70 dark:bg-slate-900/70">
            <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs">Manual TIC para Aprendices</p>
            <p className="mt-0.5 text-slate-500 dark:text-slate-400 text-[11px]">Diseño 100% responsivo para celular y PC.</p>
          </div>
        )}
      </aside>
    </>
  );
};
