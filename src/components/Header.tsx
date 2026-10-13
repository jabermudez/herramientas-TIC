import React from 'react';
import { BookOpen, Printer, HelpCircle, Check, Radio, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  onOpenGlossary: () => void;
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
  onToggleTheme
}) => {
  const percentage = totalUnitsCount > 0 ? Math.round((completedUnitsCount / totalUnitsCount) * 100) : 0;
  const isAllCompleted = percentage === 100;

  // Circular progress SVG math: radius 14, circumference 2 * PI * 14 ≈ 87.96
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Universal Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line, no pill badges) */}
        <button
          onClick={() => setActiveView('portada')}
          className="text-left font-bold text-lg text-slate-900 dark:text-white tracking-tight whitespace-nowrap shrink-0 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-2"
        >
          <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>Manual de Herramientas TIC</span>
        </button>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setActiveView('portada')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white transition-colors ${
              activeView === 'portada' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
            }`}
          >
            Inicio & Metodología
          </button>
          <button
            onClick={() => setActiveView('unidades')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white transition-colors ${
              activeView.startsWith('unidad') || activeView === 'unidades' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
            }`}
          >
            Unidades Temáticas
          </button>
          <button
            onClick={() => setActiveView('talleres-practicos')}
            className={`whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white transition-colors ${
              activeView === 'talleres-practicos' ? 'text-indigo-600 dark:text-indigo-400 font-semibold' : ''
            }`}
          >
            Talleres & Atajos
          </button>
          <button
            onClick={onOpenGlossary}
            className="whitespace-nowrap shrink-0 hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4 text-slate-400 dark:text-slate-500" />
            <span>Glosario TIC</span>
          </button>
        </nav>

        {/* Zone 3: 1 primary action + accessible controls + theme toggle + circular progress */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Circular Progress Gauge */}
          <div
            className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80 rounded-xl"
            title={`Progreso: ${completedUnitsCount} de ${totalUnitsCount} unidades completadas (${percentage}%)`}
          >
            <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
              <svg className="w-8 h-8 -rotate-90 transform" viewBox="0 0 36 36">
                {/* Background Track */}
                <circle
                  cx="18"
                  cy="18"
                  r={radius}
                  className="stroke-slate-200 dark:stroke-slate-700"
                  strokeWidth="3.2"
                  fill="transparent"
                />
                {/* Animated Progress Ring */}
                <circle
                  cx="18"
                  cy="18"
                  r={radius}
                  className={`transition-all duration-500 ease-out ${
                    isAllCompleted ? 'stroke-emerald-600 dark:stroke-emerald-400' : 'stroke-indigo-600 dark:stroke-indigo-400'
                  }`}
                  strokeWidth="3.2"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Center percentage label */}
              <span
                className={`absolute text-[9px] font-bold tabular-nums ${
                  isAllCompleted ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-100'
                }`}
              >
                {isAllCompleted ? <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400 stroke-[3]" /> : `${percentage}%`}
              </span>
            </div>

            {/* Progress Text Label */}
            <div className="hidden sm:flex flex-col text-left leading-none">
              <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Progreso
              </span>
              <span className="text-xs font-bold text-slate-900 dark:text-slate-100 tabular-nums mt-0.5">
                {completedUnitsCount}/{totalUnitsCount} <span className="font-normal text-slate-400 dark:text-slate-500 text-[10px]">uds.</span>
              </span>
            </div>
          </div>

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

          {/* Voice Tutor Button (Gemini Live) */}
          <button
            onClick={onOpenVoiceTutor}
            title="Abrir Tutor de Voz en vivo con Gemini 3.8 Live"
            className="px-3 py-2 text-xs font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800 rounded-xl transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 shadow-2xs"
          >
            <Radio className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
            <span className="hidden sm:inline">Tutor de Voz</span>
            <span className="sm:hidden">Voz</span>
          </button>

          {/* Primary CTA: Print or Export PDF */}
          <button
            onClick={onPrint}
            title="Imprimir o guardar como PDF"
            className="px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Modo Impresión / PDF</span>
            <span className="sm:hidden">PDF</span>
          </button>
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
