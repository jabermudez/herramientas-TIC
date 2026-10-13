import React from 'react';
import { BookOpen, HelpCircle, Radio, Sun, Moon } from 'lucide-react';
import { SearchBar } from './SearchBar';

interface HeaderProps {
  onOpenGlossary: (initialTerm?: string) => void;
  onOpenVoiceTutor: () => void;
  onPrint: () => void;
  completedUnitsCount: number;
  totalUnitsCount: number;
  activeView: string;
  setActiveView: (view: string) => void;
  fontSize: 'normal' | 'large';
  setFontSize: (size: 'normal' | 'large') => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onSelectUnit: (unitId: string) => void;
  onSelectSection: (unitId: string, sectionId: string) => void;
  onSelectWorkshop: (workshopId: string) => void;
  isSidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenGlossary,
  onOpenVoiceTutor,
  onPrint,
  completedUnitsCount,
  totalUnitsCount,
  activeView,
  setActiveView,
  fontSize,
  setFontSize,
  theme,
  onToggleTheme,
  onSelectUnit,
  onSelectSection,
  onSelectWorkshop,
  isSidebarOpen = true,
  onToggleSidebar,
}) => {
  const percentage = totalUnitsCount > 0 ? Math.round((completedUnitsCount / totalUnitsCount) * 100) : 0;
  const isAllCompleted = percentage === 100;

  // Circular progress SVG math: radius 14, circumference 2 * PI * 14 ≈ 87.96
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Universal Top Bar Contract: 3 zones separated by gap-4 to gap-6 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-6">
        {/* Zone 1: Sidebar Toggle + Brand wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              title={isSidebarOpen ? "Ocultar panel lateral de unidades" : "Mostrar panel lateral de unidades"}
              aria-label={isSidebarOpen ? "Ocultar menú lateral" : "Mostrar menú lateral"}
              className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center justify-center ${
                isSidebarOpen
                  ? 'bg-indigo-50 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <BookOpen className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={() => setActiveView('portada')}
            className="text-left font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight whitespace-nowrap shrink-0 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span className="hidden sm:inline">Manual de Herramientas TIC</span>
            <span className="sm:hidden font-extrabold">Manual TIC</span>
          </button>
        </div>

        {/* Global Search Bar (Generous, prominent and easy to use) */}
        <div className="flex-1 max-w-xl md:max-w-2xl lg:max-w-3xl mx-2 sm:mx-4">
          <SearchBar
            onSelectUnit={onSelectUnit}
            onSelectSection={onSelectSection}
            onSelectGlossary={(term) => onOpenGlossary(term)}
            onSelectWorkshop={onSelectWorkshop}
          />
        </div>

        {/* Zone 2: Navigation links on large desktop */}
        <nav className="hidden xl:flex items-center gap-5 text-xs font-semibold text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setActiveView('portada')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white transition-colors ${
              activeView === 'portada' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
            }`}
          >
            Inicio
          </button>
          <button
            onClick={() => setActiveView('unidades')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white transition-colors ${
              activeView.startsWith('unidad') || activeView === 'unidades' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
            }`}
          >
            Unidades
          </button>
          <button
            onClick={() => setActiveView('talleres-practicos')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white transition-colors ${
              activeView === 'talleres-practicos' ? 'text-indigo-600 dark:text-indigo-400 font-bold' : ''
            }`}
          >
            Talleres
          </button>
          <button
            onClick={() => onOpenGlossary()}
            className="whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span>Glosario</span>
          </button>
        </nav>

        {/* Zone 3: Voice Tutor + Controls (Light/Dark mode + Font Size) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Voice Tutor Button */}
          <button
            onClick={onOpenVoiceTutor}
            title="Abrir Tutor de Voz pedagógico interactivo"
            className="px-3 py-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-2xs cursor-pointer"
          >
            <Radio className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
            <span className="hidden sm:inline">Tutor de Voz</span>
            <span className="sm:hidden">Voz</span>
          </button>

          {/* Theme Selector: Dark / Light Mode Toggle */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 rounded-xl transition-all shadow-2xs cursor-pointer flex items-center justify-center"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Font size toggle for classroom presentation readability */}
          <div className="hidden sm:flex items-center border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-800 text-xs">
            <button
              onClick={() => setFontSize('normal')}
              title="Texto estándar"
              className={`px-2 py-1 rounded transition-colors ${
                fontSize === 'normal'
                  ? 'bg-white dark:bg-slate-700 font-bold text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              title="Texto ampliado para aula"
              className={`px-2 py-1 rounded transition-colors ${
                fontSize === 'large'
                  ? 'bg-white dark:bg-slate-700 font-bold text-indigo-700 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              A+
            </button>
          </div>
        </div>
      </div>

      {/* Sleek Linear Progress Bar anchored at the bottom edge of the header */}
      <div className="w-full h-1 bg-slate-100 dark:bg-slate-800 overflow-hidden" role="progressbar" aria-valuenow={percentage} aria-valuemin={0} aria-valuemax={100}>
        <div
          className={`h-full transition-all duration-500 ease-out ${
            isAllCompleted
              ? 'bg-emerald-500'
              : 'bg-gradient-to-r from-indigo-500 via-indigo-600 to-emerald-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </header>
  );
};
