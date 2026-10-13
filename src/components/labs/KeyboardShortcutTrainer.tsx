import React, { useState, useMemo } from 'react';
import { Search, Keyboard, Trophy, CheckCircle, XCircle, Sparkles } from 'lucide-react';
import { KEYBOARD_SHORTCUTS } from '../../data/manualData';

interface GameQuestion {
  prompt: string;
  correctAnswer: string[];
  options: string[][];
  explanation: string;
}

const GAME_QUESTIONS: GameQuestion[] = [
  {
    prompt: 'Cerraste accidentalmente una pestaña del navegador con información importante. ¿Qué combinación mágica la reabre de inmediato?',
    correctAnswer: ['Ctrl', 'Shift', 'T'],
    options: [
      ['Ctrl', 'T'],
      ['Ctrl', 'Shift', 'T'],
      ['Ctrl', 'W'],
      ['Alt', 'F4']
    ],
    explanation: 'Ctrl + Shift + T reabre cronológicamente la última pestaña cerrada en Chrome, Edge y Firefox.'
  },
  {
    prompt: 'Te levantas de tu escritorio en la oficina o escuela y quieres bloquear la pantalla de Windows en un segundo sin cerrar tus programas:',
    correctAnswer: ['Win', 'L'],
    options: [
      ['Win', 'D'],
      ['Win', 'L'],
      ['Ctrl', 'Alt', 'Supr'],
      ['Alt', 'Tab']
    ],
    explanation: 'Win + L (Lock) bloquea la sesión de usuario instantáneamente, exigiendo contraseña o PIN para reanudar.'
  },
  {
    prompt: 'Quieres tomar una captura de pantalla seleccionando solo un recuadro específico con el ratón:',
    correctAnswer: ['Win', 'Shift', 'S'],
    options: [
      ['Impr Pant'],
      ['Win', 'Shift', 'S'],
      ['Ctrl', 'P'],
      ['Alt', 'Impr Pant']
    ],
    explanation: 'Win + Shift + S activa la herramienta Recortes moderna en Windows para capturas rectangulares o de ventana.'
  },
  {
    prompt: 'Una página web no refleja los cambios recientes y quieres forzar una recarga limpia borrando la memoria caché local:',
    correctAnswer: ['Ctrl', 'F5'],
    options: [
      ['F5'],
      ['Ctrl', 'R'],
      ['Ctrl', 'F5'],
      ['Ctrl', 'Shift', 'N']
    ],
    explanation: 'Ctrl + F5 ignora la memoria caché almacenada en el disco y solicita los archivos actualizados directamente al servidor web.'
  },
  {
    prompt: 'Quieres abrir una nueva pestaña en tu navegador web usando únicamente el teclado:',
    correctAnswer: ['Ctrl', 'T'],
    options: [
      ['Ctrl', 'N'],
      ['Ctrl', 'T'],
      ['Ctrl', 'Shift', 'T'],
      ['Alt', 'T']
    ],
    explanation: 'Ctrl + T (Tab) abre una pestaña nueva en el navegador actual.'
  }
];

export const KeyboardShortcutTrainer: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [gameIndex, setGameIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  const filteredShortcuts = useMemo(() => {
    return KEYBOARD_SHORTCUTS.filter(item => {
      const matchesSearch =
        item.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tip.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.keys.join(' ').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCat = selectedCategory === 'todos' || item.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [searchTerm, selectedCategory]);

  const currentQ = GAME_QUESTIONS[gameIndex];

  const handleSelectOption = (option: string[]) => {
    if (showResult) return;
    const optionStr = option.join(' + ');
    setSelectedOption(optionStr);
    setShowResult(true);

    const isCorrect = optionStr === currentQ.correctAnswer.join(' + ');
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowResult(false);
    setSelectedOption(null);
    if (gameIndex < GAME_QUESTIONS.length - 1) {
      setGameIndex(prev => prev + 1);
    } else {
      setGameFinished(true);
    }
  };

  const resetGame = () => {
    setGameIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setGameFinished(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm my-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Destreza Práctica</span>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">Entrenador y Catálogo de Atajos de Teclado</h4>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400">Windows & Navegadores Web</span>
      </div>

      {/* Mini Game Sandbox */}
      <div className="bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 rounded-2xl p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-indigo-700 dark:text-indigo-400" />
            <h5 className="font-bold text-indigo-950 dark:text-indigo-200 text-sm">Desafío Interactivo de Agilidad de Atajos</h5>
          </div>
          <span className="text-xs font-semibold text-indigo-800 dark:text-indigo-300 tabular-nums">
            Pregunta {gameIndex + 1} de {GAME_QUESTIONS.length} · Aciertos: {score}
          </span>
        </div>

        {!gameFinished ? (
          <div>
            <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-4">{currentQ.prompt}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
              {currentQ.options.map((opt, i) => {
                const optStr = opt.join(' + ');
                const isSelected = selectedOption === optStr;
                const isCorrect = optStr === currentQ.correctAnswer.join(' + ');

                let btnClass = 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:border-indigo-400';
                if (showResult) {
                  if (isCorrect) {
                    btnClass = 'bg-emerald-600 text-white border-emerald-600';
                  } else if (isSelected) {
                    btnClass = 'bg-rose-600 text-white border-rose-600';
                  } else {
                    btnClass = 'bg-white/60 dark:bg-slate-800/40 text-slate-400 dark:text-slate-500 border-slate-200 dark:border-slate-700 opacity-60';
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(opt)}
                    disabled={showResult}
                    className={`p-3 rounded-xl border font-mono text-xs font-bold transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer ${btnClass}`}
                  >
                    {opt.map((k, ki) => (
                      <React.Fragment key={ki}>
                        <kbd className="px-1.5 py-0.5 bg-black/5 dark:bg-white/10 rounded text-xs">{k}</kbd>
                        {ki < opt.length - 1 && <span className="opacity-50">+</span>}
                      </React.Fragment>
                    ))}
                  </button>
                );
              })}
            </div>

            {showResult && (
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <div className="flex items-center gap-2 text-xs">
                  {selectedOption === currentQ.correctAnswer.join(' + ') ? (
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
                  )}
                  <span className="text-slate-700 dark:text-slate-200 font-medium">{currentQ.explanation}</span>
                </div>
                <button
                  onClick={handleNextQuestion}
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                >
                  {gameIndex < GAME_QUESTIONS.length - 1 ? 'Siguiente Desafío →' : 'Ver Puntuación Final'}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4">
            <Sparkles className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
            <h6 className="text-base font-bold text-slate-900 dark:text-white mb-1">¡Desafío Completado!</h6>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-4">
              Obtuviste <strong className="text-indigo-700 dark:text-indigo-400 font-bold">{score} de {GAME_QUESTIONS.length}</strong> respuestas correctas.
              {score >= 4 ? ' ¡Excelente nivel de destreza con teclado!' : ' ¡Sigue practicando para acelerar tu flujo de trabajo!'}
            </p>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
            >
              Reiniciar Desafío
            </button>
          </div>
        )}
      </div>

      {/* Filter and Search Bar for Cheatsheet */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar atajo por acción o tecla (ej. 'pegar', 'cerrar', 'Ctrl')..."
            className="w-full pl-9 pr-4 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500"
          />
        </div>

        <div className="flex flex-wrap gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl shrink-0">
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'edicion', label: 'Edición' },
            { id: 'sistema', label: 'Sistema' },
            { id: 'ventanas', label: 'Ventanas' },
            { id: 'navegador', label: 'Navegador Web' },
            { id: 'captura', label: 'Captura' }
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Shortcuts Grid List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[460px] overflow-y-auto pr-1">
        {filteredShortcuts.map((item, idx) => (
          <div key={idx} className="p-3.5 bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-100/60 dark:hover:bg-slate-800 transition-colors flex items-start justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{item.action}</span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">· {item.context}</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-snug">{item.tip}</p>
            </div>
            <div className="flex items-center gap-1 shrink-0 font-mono">
              {item.keys.map((k, ki) => (
                <React.Fragment key={ki}>
                  <kbd className="px-2 py-1 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-xs text-xs font-semibold text-slate-800 dark:text-slate-200">
                    {k}
                  </kbd>
                  {ki < item.keys.length - 1 && <span className="text-slate-400 dark:text-slate-500 text-xs">+</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
