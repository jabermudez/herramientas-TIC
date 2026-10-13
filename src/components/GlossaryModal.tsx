import React, { useState } from 'react';
import { X, Search, HelpCircle, BookOpen } from 'lucide-react';
import { GLOSSARY_TERMS } from '../data/manualData';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSearchTerm?: string;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose, initialSearchTerm = '' }) => {
  const [searchTerm, setSearchTerm] = useState<string>(initialSearchTerm);
  const [selectedCat, setSelectedCat] = useState<string>('todos');

  React.useEffect(() => {
    if (isOpen) {
      setSearchTerm(initialSearchTerm);
    }
  }, [isOpen, initialSearchTerm]);

  if (!isOpen) return null;

  const categories = ['todos', 'Hardware', 'Software', 'Redes e Internet', 'Ofimática', 'Seguridad', 'Inteligencia Artificial'];

  const filtered = GLOSSARY_TERMS.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCat === 'todos' || item.category === selectedCat;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800 animate-fadeIn transition-colors">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Glosario Pedagógico de Términos TIC</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar término o definición (ej. 'RAM', 'Phishing', 'Prompt')..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
            />
          </div>

          <div className="flex flex-wrap gap-1">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                  selectedCat === cat
                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {cat === 'todos' ? 'Todos los términos' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Terms list */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50/70 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100/60 dark:hover:bg-slate-800/80 transition-colors">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{item.term}</h4>
                  <span className="text-[10px] uppercase font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 px-2 py-0.5 rounded border border-indigo-200 dark:border-indigo-800">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{item.definition}</p>
              </div>
            ))
          ) : (
            <p className="text-center py-8 text-xs text-slate-500 dark:text-slate-400">
              No se encontraron términos que coincidan con la búsqueda.
            </p>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>{filtered.length} conceptos disponibles para consulta rápida en clase.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
