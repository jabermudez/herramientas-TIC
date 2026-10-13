import React, { useState, useEffect } from 'react';
import { Home, BookOpen, Terminal, HelpCircle, Radio } from 'lucide-react';
import { UNITS_DATA } from './data/manualData';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { UnitView } from './components/UnitView';
import { HomeCover } from './components/HomeCover';
import { WorkshopsHub } from './components/WorkshopsHub';
import { GlossaryModal } from './components/GlossaryModal';
import { VoiceTutorModal } from './components/VoiceTutorModal';

export default function App() {
  const [activeView, setActiveView] = useState<'portada' | 'unidades' | 'talleres-practicos'>('portada');
  const [activeUnitId, setActiveUnitId] = useState<string>('unidad-1');
  const [activeWorkshop, setActiveWorkshop] = useState<string>('atajos-pc');
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  // Dark / Light Theme Mode state with persistence and system preference fallback
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('manual_tic_theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('manual_tic_theme', theme);
    } catch {
      // Ignore storage errors
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const [isGlossaryOpen, setIsGlossaryOpen] = useState<boolean>(false);
  const [glossaryInitialTerm, setGlossaryInitialTerm] = useState<string>('');
  const [isVoiceTutorOpen, setIsVoiceTutorOpen] = useState<boolean>(false);

  // LocalStorage persistence for student completion
  const [completedUnits, setCompletedUnits] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('manual_tic_completed_units');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('manual_tic_completed_units', JSON.stringify(completedUnits));
    } catch {
      // Ignore storage errors
    }
  }, [completedUnits]);

  const toggleCompleteUnit = (unitId: string) => {
    setCompletedUnits(prev => ({
      ...prev,
      [unitId]: !prev[unitId]
    }));
  };

  const currentUnitIndex = UNITS_DATA.findIndex(u => u.id === activeUnitId);
  const currentUnit = UNITS_DATA[currentUnitIndex] || UNITS_DATA[0];

  const handleSelectUnit = (unitId: string) => {
    setActiveUnitId(unitId);
    setActiveView('unidades');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSection = (unitId: string, sectionId: string) => {
    setActiveUnitId(unitId);
    setActiveView('unidades');
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 120);
  };

  const handleSelectWorkshop = (workshopId: string) => {
    setActiveWorkshop(workshopId);
    setActiveView('talleres-practicos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenGlossary = (initialTerm?: string) => {
    setGlossaryInitialTerm(initialTerm || '');
    setIsGlossaryOpen(true);
  };

  const handleNextUnit = () => {
    if (currentUnitIndex < UNITS_DATA.length - 1) {
      const nextId = UNITS_DATA[currentUnitIndex + 1].id;
      setActiveUnitId(nextId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevUnit = () => {
    if (currentUnitIndex > 0) {
      const prevId = UNITS_DATA[currentUnitIndex - 1].id;
      setActiveUnitId(prevId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // State for collapsible units sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(() => {
    // Default open on wide desktop, closed on mobile/tablet to avoid taking space
    return typeof window !== 'undefined' ? window.innerWidth >= 1280 : false;
  });

  const completedCount = Object.values(completedUnits).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Universal Top Header */}
      <Header
        onOpenGlossary={handleOpenGlossary}
        onOpenVoiceTutor={() => setIsVoiceTutorOpen(true)}
        onPrint={handlePrint}
        completedUnitsCount={completedCount}
        totalUnitsCount={UNITS_DATA.length}
        activeView={activeView}
        setActiveView={(v) => {
          setActiveView(v as 'portada' | 'unidades' | 'talleres-practicos');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        fontSize={fontSize}
        setFontSize={setFontSize}
        theme={theme}
        onToggleTheme={toggleTheme}
        onSelectUnit={handleSelectUnit}
        onSelectSection={handleSelectSection}
        onSelectWorkshop={handleSelectWorkshop}
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen(prev => !prev)}
      />

      {/* Main Layout Body */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto relative min-w-0">
        {/* Left Navigation Sidebar (Collapsible & 100% mobile responsive) */}
        <Sidebar
          units={UNITS_DATA}
          activeUnitId={activeUnitId}
          onSelectUnit={handleSelectUnit}
          completedUnits={completedUnits}
          activeView={activeView}
          setActiveView={(v) => {
            setActiveView(v as 'portada' | 'unidades' | 'talleres-practicos');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          activeWorkshop={activeWorkshop}
          setActiveWorkshop={(w) => {
            setActiveWorkshop(w);
            setActiveView('talleres-practicos');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          isOpen={isSidebarOpen}
          onToggle={() => setIsSidebarOpen(prev => !prev)}
          onOpenGlossary={handleOpenGlossary}
          onOpenVoiceTutor={() => setIsVoiceTutorOpen(true)}
        />

        {/* Dynamic Center Canvas */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 min-w-0 transition-all max-w-full">
          {/* Quick toggle indicator banner when sidebar is closed on desktop */}
          {!isSidebarOpen && activeView === 'unidades' && (
            <div className="mb-4 flex items-center justify-between p-3 bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-xl text-xs sm:text-sm text-indigo-950 dark:text-indigo-200">
              <span className="font-medium">
                Viendo: <strong className="font-bold">{currentUnit.title}</strong>
              </span>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="px-3 py-1 bg-white dark:bg-slate-800 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-700 rounded-lg font-semibold hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
              >
                Abrir Índice de Unidades
              </button>
            </div>
          )}

          {activeView === 'portada' && (
            <HomeCover
              units={UNITS_DATA}
              onSelectUnit={handleSelectUnit}
              onOpenWorkshops={() => {
                setActiveView('talleres-practicos');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenGlossary={() => setIsGlossaryOpen(true)}
              onOpenVoiceTutor={() => setIsVoiceTutorOpen(true)}
              completedUnits={completedUnits}
            />
          )}

          {activeView === 'unidades' && (
            <UnitView
              unit={currentUnit}
              isCompleted={!!completedUnits[currentUnit.id]}
              onToggleComplete={toggleCompleteUnit}
              onSelectNextUnit={currentUnitIndex < UNITS_DATA.length - 1 ? handleNextUnit : undefined}
              onSelectPrevUnit={currentUnitIndex > 0 ? handlePrevUnit : undefined}
              fontSize={fontSize}
            />
          )}

          {activeView === 'talleres-practicos' && (
            <WorkshopsHub
              activeWorkshop={activeWorkshop}
              setActiveWorkshop={setActiveWorkshop}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 text-center text-xs text-slate-600 dark:text-slate-400 no-print transition-colors pb-20 lg:pb-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            Manual de Herramientas TIC · Guía pedagógica e interactiva para aprendices (Nivel Básico a Intermedio).
          </p>
          <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400">
            <span>Orientado 100% a la práctica formativa</span>
            <span>·</span>
            <span>Compatible con celulares y computadores</span>
            <span>·</span>
            <span>Impresión / PDF</span>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (Persistent, thumb-friendly for phone screens) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 lg:hidden px-2 py-1.5 flex items-center justify-around shadow-lg transition-colors no-print">
        <button
          onClick={() => {
            setActiveView('portada');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-semibold transition-colors cursor-pointer ${
            activeView === 'portada'
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span>Inicio</span>
        </button>

        <button
          onClick={() => {
            setIsSidebarOpen(prev => !prev);
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-semibold transition-colors cursor-pointer ${
            isSidebarOpen || activeView === 'unidades'
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 mb-0.5" />
          <span>Unidades</span>
        </button>

        <button
          onClick={() => {
            setActiveView('talleres-practicos');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-semibold transition-colors cursor-pointer ${
            activeView === 'talleres-practicos'
              ? 'text-indigo-600 dark:text-indigo-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4 mb-0.5" />
          <span>Talleres</span>
        </button>

        <button
          onClick={() => handleOpenGlossary()}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
        >
          <HelpCircle className="w-4 h-4 mb-0.5" />
          <span>Glosario</span>
        </button>

        <button
          onClick={() => setIsVoiceTutorOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-[10px] font-semibold text-indigo-600 dark:text-indigo-400 transition-colors cursor-pointer"
        >
          <Radio className="w-4 h-4 mb-0.5 animate-pulse" />
          <span>Tutor Voz</span>
        </button>
      </nav>

      {/* Global Interactive Modals */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        initialSearchTerm={glossaryInitialTerm}
      />

      <VoiceTutorModal
        isOpen={isVoiceTutorOpen}
        onClose={() => setIsVoiceTutorOpen(false)}
      />
    </div>
  );
}
