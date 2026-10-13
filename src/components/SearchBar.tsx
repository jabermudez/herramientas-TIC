import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Search, X, BookOpen, Layers, HelpCircle, Terminal, ArrowRight, CornerDownLeft, Sparkles, Laptop, ShieldCheck } from 'lucide-react';
import { UNITS_DATA, GLOSSARY_TERMS, KEYBOARD_SHORTCUTS, WHATSAPP_TIPS } from '../data/manualData';

interface SearchBarProps {
  onSelectUnit: (unitId: string) => void;
  onSelectSection: (unitId: string, sectionId: string) => void;
  onSelectGlossary: (termName: string) => void;
  onSelectWorkshop: (workshopId: string) => void;
}

interface SearchResult {
  id: string;
  type: 'unit' | 'section' | 'glossary' | 'workshop';
  title: string;
  subtitle?: string;
  snippet?: string;
  category?: string;
  unitId?: string;
  sectionId?: string;
  workshopId?: string;
  termName?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSelectUnit,
  onSelectSection,
  onSelectGlossary,
  onSelectWorkshop,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const mobileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Global Keyboard shortcut: Ctrl+K or Cmd+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(true);
        if (window.innerWidth < 768) {
          setIsMobileModalOpen(true);
          setTimeout(() => mobileInputRef.current?.focus(), 100);
        } else {
          inputRef.current?.focus();
        }
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        setIsMobileModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close dropdown on outside click (desktop)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Normalize text for search comparison
  const normalize = (text: string) =>
    text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');

  // Computed Search Results
  const results = useMemo(() => {
    const q = normalize(query.trim());
    if (!q || q.length < 2) return [];

    const found: SearchResult[] = [];

    // 1. Search in Units (Title, subtitle, summary, objectives)
    UNITS_DATA.forEach((unit) => {
      const titleNorm = normalize(unit.title);
      const subtitleNorm = normalize(unit.subtitle);
      const summaryNorm = normalize(unit.summary);

      if (titleNorm.includes(q) || subtitleNorm.includes(q) || summaryNorm.includes(q)) {
        found.push({
          id: `unit-${unit.id}`,
          type: 'unit',
          title: `Unidad ${unit.unitNumber}: ${unit.title}`,
          subtitle: unit.subtitle,
          snippet: unit.summary.slice(0, 110) + '...',
          unitId: unit.id,
        });
      }

      // 2. Search in Sections of each unit
      unit.sections.forEach((sec) => {
        const secTitleNorm = normalize(sec.title);
        const secContentNorm = normalize(sec.content);

        if (secTitleNorm.includes(q) || secContentNorm.includes(q)) {
          // Extract a surrounding context snippet if matched in content
          let snippet = '';
          const matchIdx = secContentNorm.indexOf(q);
          if (matchIdx !== -1) {
            const start = Math.max(0, matchIdx - 35);
            const end = Math.min(sec.content.length, matchIdx + q.length + 65);
            snippet = (start > 0 ? '...' : '') + sec.content.slice(start, end).replace(/\n/g, ' ') + '...';
          } else {
            snippet = sec.content.slice(0, 95).replace(/\n/g, ' ') + '...';
          }

          found.push({
            id: `sec-${unit.id}-${sec.id}`,
            type: 'section',
            title: sec.title,
            subtitle: `Unidad ${unit.unitNumber} (${unit.level})`,
            snippet,
            unitId: unit.id,
            sectionId: sec.id,
          });
        }
      });
    });

    // 3. Search in Glossary
    GLOSSARY_TERMS.forEach((term) => {
      const termNorm = normalize(term.term);
      const defNorm = normalize(term.definition);

      if (termNorm.includes(q) || defNorm.includes(q)) {
        found.push({
          id: `glossary-${term.term}`,
          type: 'glossary',
          title: term.term,
          category: term.category,
          snippet: term.definition,
          termName: term.term,
        });
      }
    });

    // 4. Search in Workshops / Shortcuts
    KEYBOARD_SHORTCUTS.forEach((sc) => {
      const keysStr = Array.isArray(sc.keys) ? sc.keys.join(' + ') : String(sc.keys);
      const keysNorm = normalize(keysStr);
      const actionNorm = normalize(sc.action);
      const catNorm = normalize(sc.category);
      const tipNorm = normalize(sc.tip || '');

      if (keysNorm.includes(q) || actionNorm.includes(q) || catNorm.includes(q) || tipNorm.includes(q)) {
        const isBrowser = sc.context.toLowerCase().includes('navegador');
        found.push({
          id: `shortcut-${keysStr}`,
          type: 'workshop',
          title: `Atajo: ${keysStr} — ${sc.action}`,
          subtitle: `${sc.context} (${sc.category})`,
          snippet: sc.tip,
          workshopId: isBrowser ? 'atajos-web' : 'atajos-pc',
        });
      }
    });

    // WhatsApp Tips
    WHATSAPP_TIPS.forEach((tip) => {
      const titleNorm = normalize(tip.title);
      const descNorm = normalize(tip.description);
      const catNorm = normalize(tip.category);
      if (titleNorm.includes(q) || descNorm.includes(q) || catNorm.includes(q)) {
        found.push({
          id: `wa-${tip.title}`,
          type: 'workshop',
          title: `WhatsApp: ${tip.title}`,
          subtitle: tip.category,
          snippet: tip.description.slice(0, 100) + '...',
          workshopId: 'trucos-whatsapp',
        });
      }
    });

    return found.slice(0, 14); // Limit to top 14 relevant items for quick navigation
  }, [query]);

  const handleSelect = (item: SearchResult) => {
    setIsOpen(false);
    setIsMobileModalOpen(false);
    setQuery('');

    if (item.type === 'section' && item.unitId && item.sectionId) {
      onSelectSection(item.unitId, item.sectionId);
    } else if (item.type === 'unit' && item.unitId) {
      onSelectUnit(item.unitId);
    } else if (item.type === 'glossary' && item.termName) {
      onSelectGlossary(item.termName);
    } else if (item.type === 'workshop' && item.workshopId) {
      onSelectWorkshop(item.workshopId);
    }
  };

  const handleChipClick = (suggestion: string) => {
    setQuery(suggestion);
    setIsOpen(true);
    inputRef.current?.focus();
    mobileInputRef.current?.focus();
  };

  const renderBadge = (type: SearchResult['type'], category?: string) => {
    switch (type) {
      case 'unit':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300">
            <BookOpen className="w-3 h-3" /> Unidad
          </span>
        );
      case 'section':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300">
            <Layers className="w-3 h-3" /> Tema
          </span>
        );
      case 'glossary':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950/70 dark:text-purple-300">
            <HelpCircle className="w-3 h-3" /> {category || 'Glosario'}
          </span>
        );
      case 'workshop':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/70 dark:text-emerald-300">
            <Terminal className="w-3 h-3" /> Taller / Atajo
          </span>
        );
    }
  };

  const ALL_POPULAR_SUGGESTIONS = ['RAM', 'Excel', 'Fórmula =SI', 'Normas APA', 'WhatsApp HD', 'Atajos', 'Phishing', 'Win + V', 'CPU', 'SSD', 'Prompts IA'];

  const categorizedSuggestions = [
    { cat: 'Hardware', items: ['RAM', 'CPU', 'SSD', 'Placa Madre'] },
    { cat: 'Ofimática', items: ['Excel', 'BUSCARV', 'Fórmula =SI', 'Normas APA', 'Tablas Dinámicas'] },
    { cat: 'Móvil', items: ['WhatsApp HD', 'Batería Celular', 'Memoria Caché'] },
    { cat: 'Seguridad & Atajos', items: ['Phishing', '2FA', 'Win + V', 'Ctrl + Shift + T', 'Prompts IA'] }
  ];

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Desktop & Tablet Search Bar Input */}
      <div className="hidden sm:block relative">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-indigo-600 dark:text-indigo-400 absolute left-3.5 pointer-events-none" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder="Buscar temas, hardware, Excel, WhatsApp, atajos, glosario (Ctrl + K)..."
            aria-label="Buscar en el manual TIC"
            className="w-full pl-10 pr-20 py-2 sm:py-2.5 text-xs sm:text-sm bg-slate-100/90 dark:bg-slate-800/90 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-400 rounded-xl border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all shadow-2xs font-medium"
          />

          <div className="absolute right-2.5 flex items-center gap-1.5">
            {query ? (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setIsOpen(false);
                }}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md transition-colors cursor-pointer"
                title="Limpiar búsqueda"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <kbd className="hidden lg:inline-flex items-center px-2 py-0.5 text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-700/80 border border-slate-200 dark:border-slate-600 rounded-md shadow-2xs">
                Ctrl K
              </kbd>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Trigger Button (Clear visible tap target, min-w-0 safe) */}
      <div className="sm:hidden min-w-0">
        <button
          onClick={() => {
            setIsMobileModalOpen(true);
            setTimeout(() => mobileInputRef.current?.focus(), 150);
          }}
          title="Buscar temas y glosario"
          className="w-full px-2.5 py-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 border border-slate-200 dark:border-slate-700 rounded-xl transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer min-w-0"
        >
          <Search className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span className="truncate text-[11px] sm:text-xs">Buscar...</span>
        </button>
      </div>

      {/* Desktop Search Results Dropdown Popover */}
      {isOpen && (
        <div className="hidden sm:block absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 overflow-hidden animate-fadeIn backdrop-blur-md">
          {/* Header indicator */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
            <span>
              {query.trim().length >= 2
                ? `${results.length} resultado${results.length === 1 ? '' : 's'} para "${query}"`
                : 'Búsqueda global en el Manual TIC'}
            </span>
            <span className="text-[10px] text-slate-400 dark:text-slate-500">Esc para cerrar</span>
          </div>

          {/* Quick Suggestions when empty or short */}
          {query.trim().length < 2 && (
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                  Temas frecuentes para consultar:
                </p>
                <span className="text-[10px] text-slate-400">Clic para buscar</span>
              </div>
              <div className="space-y-2">
                {categorizedSuggestions.map((group) => (
                  <div key={group.cat} className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 w-24 shrink-0">
                      {group.cat}:
                    </span>
                    {group.items.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleChipClick(item)}
                        className="px-2.5 py-1 text-xs bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-300 dark:hover:border-indigo-700 rounded-lg text-slate-700 dark:text-slate-300 transition-colors border border-slate-200/70 dark:border-slate-700/70 cursor-pointer"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query.trim().length >= 2 && results.length > 0 && (
            <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60 p-1">
              {results.map((res) => (
                <button
                  key={res.id}
                  onClick={() => handleSelect(res)}
                  className="w-full text-left p-3 hover:bg-indigo-50/70 dark:hover:bg-slate-800/80 rounded-xl transition-all group cursor-pointer flex items-start gap-3"
                >
                  <div className="mt-0.5 shrink-0">{renderBadge(res.type, res.category)}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                        {res.title}
                      </h4>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                    {res.subtitle && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                        {res.subtitle}
                      </p>
                    )}
                    {res.snippet && (
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 line-clamp-2 leading-relaxed bg-slate-50/80 dark:bg-slate-800/40 p-1.5 rounded-lg border border-slate-100 dark:border-slate-800 font-normal">
                        {res.snippet}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* No results empty state */}
          {query.trim().length >= 2 && results.length === 0 && (
            <div className="p-6 text-center text-xs text-slate-500 dark:text-slate-400 space-y-3">
              <Search className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
              <p>No se encontraron resultados para <span className="font-semibold text-slate-700 dark:text-slate-200">"{query}"</span></p>
              <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                {ALL_POPULAR_SUGGESTIONS.slice(0, 5).map((sugg) => (
                  <button
                    key={sugg}
                    onClick={() => handleChipClick(sugg)}
                    className="px-2 py-0.5 text-[11px] bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded text-slate-700 dark:text-slate-300"
                  >
                    {sugg}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Mobile Fullscreen Search Modal */}
      {isMobileModalOpen && (
        <div className="sm:hidden fixed inset-0 z-50 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md flex flex-col p-4 animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col flex-1 max-h-[90vh] overflow-hidden">
            {/* Mobile Header Bar */}
            <div className="p-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <Search className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
              <input
                ref={mobileInputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar temas, unidades o glosario..."
                className="flex-1 text-xs bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsMobileModalOpen(false)}
                className="px-2.5 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 rounded-lg"
              >
                Cerrar
              </button>
            </div>

            {/* Mobile Content Area */}
            <div className="flex-1 overflow-y-auto p-3 divide-y divide-slate-100 dark:divide-slate-800">
              {query.trim().length < 2 && (
                <div className="space-y-3 py-2">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    Sugerencias pedagógicas:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {ALL_POPULAR_SUGGESTIONS.map((item) => (
                      <button
                        key={item}
                        onClick={() => handleChipClick(item)}
                        className="px-3 py-1.5 text-xs bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {query.trim().length >= 2 && results.map((res) => (
                <button
                  key={res.id}
                  onClick={() => handleSelect(res)}
                  className="w-full text-left py-3 px-1 flex flex-col gap-1 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {renderBadge(res.type, res.category)}
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                      {res.title}
                    </h4>
                  </div>
                  {res.subtitle && (
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {res.subtitle}
                    </p>
                  )}
                  {res.snippet && (
                    <p className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-lg line-clamp-2">
                      {res.snippet}
                    </p>
                  )}
                </button>
              ))}

              {query.trim().length >= 2 && results.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-500">
                  <p>No se encontraron resultados para "{query}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
