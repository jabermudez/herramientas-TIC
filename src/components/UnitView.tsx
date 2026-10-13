import React, { useState } from 'react';
import { Unit, CalloutBox, Flashcard } from '../types/manual';
import { CheckCircle2, AlertTriangle, Lightbulb, HelpCircle, Target, ArrowRight, ArrowLeft, BookOpen, Layers, Sparkles, RotateCw, Volume2, VolumeX, Printer } from 'lucide-react';
import { HardwareExplorer } from './labs/HardwareExplorer';
import { SpreadsheetSimulator } from './labs/SpreadsheetSimulator';
import { PromptCraftSandbox } from './labs/PromptCraftSandbox';
import { PhishingInspector } from './labs/PhishingInspector';
import { PortsConnectorLab } from './labs/PortsConnectorLab';
import { SearchOperatorsLab } from './labs/SearchOperatorsLab';

interface UnitViewProps {
  unit: Unit;
  isCompleted: boolean;
  onToggleComplete: (unitId: string) => void;
  onSelectNextUnit?: () => void;
  onSelectPrevUnit?: () => void;
  fontSize: 'normal' | 'large';
}

export const UnitView: React.FC<UnitViewProps> = ({
  unit,
  isCompleted,
  onToggleComplete,
  onSelectNextUnit,
  onSelectPrevUnit,
  fontSize
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState<boolean>(false);
  const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
  const [readingSectionId, setReadingSectionId] = useState<string | null>(null);

  const handleToggleReadSection = (secId: string, title: string, text: string) => {
    if (!('speechSynthesis' in window)) return;
    const synth = window.speechSynthesis;

    if (readingSectionId === secId) {
      synth.cancel();
      setReadingSectionId(null);
    } else {
      synth.cancel();
      const cleanText = `${title}. ${text.replace(/[*_~`#>]/g, '')}`;
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'es-ES';
      utterance.rate = 1.0;
      utterance.onend = () => setReadingSectionId(null);
      utterance.onerror = () => setReadingSectionId(null);
      synth.speak(utterance);
      setReadingSectionId(secId);
    }
  };

  const handleSelectAnswer = (qId: string, optionIdx: number) => {
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    unit.quiz.forEach(q => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const toggleFlipCard = (index: number) => {
    setFlippedCards(prev => ({ ...prev, [index]: !prev[index] }));
  };

  const renderCallout = (callout: CalloutBox, index: number) => {
    switch (callout.type) {
      case 'tip':
        return (
          <div key={index} className="my-6 p-5 bg-emerald-50/90 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-slate-800 dark:text-slate-100 shadow-xs transition-colors">
            <div className="flex items-center gap-2 mb-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-xs uppercase tracking-wider">
              <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Consejo de Productividad para el Aprendiz</span>
            </div>
            <h6 className="font-bold text-base text-emerald-950 dark:text-emerald-100 mb-1.5">{callout.title}</h6>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">{callout.content}</p>
          </div>
        );
      case 'warning':
        return (
          <div key={index} className="my-6 p-5 bg-amber-50/90 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-2xl text-slate-800 dark:text-slate-100 shadow-xs transition-colors">
            <div className="flex items-center gap-2 mb-1.5 text-amber-900 dark:text-amber-300 font-bold text-xs uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Advertencia de Seguridad Digital</span>
            </div>
            <h6 className="font-bold text-base text-amber-950 dark:text-amber-100 mb-1.5">{callout.title}</h6>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">{callout.content}</p>
          </div>
        );
      case 'curiosity':
        return (
          <div key={index} className="my-6 p-5 bg-sky-50/90 dark:bg-sky-950/40 border border-sky-300 dark:border-sky-800 rounded-2xl text-slate-800 dark:text-slate-100 shadow-xs transition-colors">
            <div className="flex items-center gap-2 mb-1.5 text-sky-900 dark:text-sky-300 font-bold text-xs uppercase tracking-wider">
              <HelpCircle className="w-4 h-4 text-sky-600 dark:text-sky-400" />
              <span>Dato Curioso & Evolución Tecnológica</span>
            </div>
            <h6 className="font-bold text-base text-sky-950 dark:text-sky-100 mb-1.5">{callout.title}</h6>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">{callout.content}</p>
          </div>
        );
      case 'challenge':
        return (
          <div key={index} className="my-6 p-5 bg-indigo-50/90 dark:bg-indigo-950/40 border border-indigo-300 dark:border-indigo-800 rounded-2xl text-slate-800 dark:text-slate-100 shadow-xs transition-colors">
            <div className="flex items-center gap-2 mb-1.5 text-indigo-900 dark:text-indigo-300 font-bold text-xs uppercase tracking-wider">
              <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Reto Práctico del Aprendiz</span>
            </div>
            <h6 className="font-bold text-base text-indigo-950 dark:text-indigo-100 mb-1.5">{callout.title}</h6>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">{callout.content}</p>
          </div>
        );
      default:
        return null;
    }
  };

  const textClass = fontSize === 'large' ? 'text-base sm:text-lg' : 'text-sm sm:text-base';

  return (
    <article className="max-w-4xl mx-auto py-4 px-2 sm:px-4">
      {/* Unit Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-6 mb-8 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/70 px-2.5 py-0.5 rounded-full border border-indigo-200 dark:border-indigo-800">
              Unidad {unit.unitNumber}
            </span>
            <span aria-hidden="true">·</span>
            <span className="font-medium text-slate-600 dark:text-slate-300">{unit.level}</span>
          </div>

          <button
            onClick={() => window.print()}
            title="Imprimir esta unidad temática o guardarla como PDF"
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer print:hidden"
          >
            <Printer className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>Imprimir Unidad / PDF</span>
          </button>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-3">
          {unit.title}
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed">{unit.subtitle}</p>

        {/* Learning Objectives Card */}
        <div className="mt-6 p-6 bg-gradient-to-br from-slate-50 to-indigo-50/50 dark:from-slate-900 dark:to-indigo-950/50 border border-indigo-200 dark:border-indigo-800/80 rounded-2xl shadow-xs transition-colors">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h4 className="font-bold text-slate-900 dark:text-white text-base">Objetivos de Aprendizaje para el Aprendiz</h4>
          </div>
          <ul className="grid grid-cols-1 gap-3">
            {unit.learningObjectives.map((obj, i) => (
              <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Unit Sections */}
      <div className="space-y-12">
        {unit.sections.map((sec) => (
          <section key={sec.id} id={sec.id} className="scroll-mt-24">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-4 pb-2 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 transition-colors">
              <span>{sec.title}</span>
              <button
                onClick={() => handleToggleReadSection(sec.id, sec.title, sec.content)}
                title={readingSectionId === sec.id ? 'Detener lectura en voz alta' : 'Escuchar esta sección con voz'}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer ${
                  readingSectionId === sec.id
                    ? 'bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-200 border border-rose-300 dark:border-rose-800 animate-pulse'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-950/60 hover:text-indigo-600 dark:hover:text-indigo-400 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
                }`}
              >
                {readingSectionId === sec.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
                <span>{readingSectionId === sec.id ? 'Detener Voz' : 'Escuchar Sección'}</span>
              </button>
            </h2>

            {/* Prose Content */}
            <div className={`text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap ${textClass} space-y-4 mb-4`}>
              {sec.content}
            </div>

            {/* Pedagogical Analogy Callout if provided */}
            {sec.analogy && (
              <div className="my-6 p-6 bg-gradient-to-r from-amber-50 to-orange-50/70 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-300 dark:border-amber-800 rounded-2xl shadow-xs transition-colors">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-1.5">
                  <span>Analogía Didáctica Cotidiana: {sec.analogy.concept}</span>
                </div>
                <p className="text-base font-bold text-amber-950 dark:text-amber-100 mb-2">
                  Comparación: {sec.analogy.comparison}
                </p>
                <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed">{sec.analogy.explanation}</p>
              </div>
            )}

            {/* Bullet points if provided */}
            {sec.bulletPoints && sec.bulletPoints.length > 0 && (
              <ul className="my-4 space-y-2.5 pl-4 border-l-3 border-indigo-500 dark:border-indigo-400">
                {sec.bulletPoints.map((bp, i) => (
                  <li key={i} className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed">
                    • {bp}
                  </li>
                ))}
              </ul>
            )}

            {/* Image Illustration if provided */}
            {sec.imageSrc && (
              <figure className="my-6">
                <img
                  src={sec.imageSrc}
                  alt={sec.imageAlt || sec.title}
                  referrerPolicy="no-referrer"
                  className="w-full max-h-[460px] object-cover rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md"
                />
                {sec.imageCaption && (
                  <figcaption className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2 italic">
                    {sec.imageCaption}
                  </figcaption>
                )}
              </figure>
            )}

            {/* Embedded Interactive Sandbox based on ID */}
            {sec.interactiveComponentId === 'hardware-lab' && <HardwareExplorer />}
            {sec.interactiveComponentId === 'spreadsheet-lab' && <SpreadsheetSimulator />}
            {sec.interactiveComponentId === 'prompt-lab' && <PromptCraftSandbox />}
            {sec.interactiveComponentId === 'phishing-lab' && <PhishingInspector />}
            {sec.interactiveComponentId === 'ports-lab' && <PortsConnectorLab />}
            {sec.interactiveComponentId === 'search-lab' && <SearchOperatorsLab />}

            {/* Callouts */}
            {sec.callouts && sec.callouts.map((c, ci) => renderCallout(c, ci))}
          </section>
        ))}
      </div>

      {/* Interactive Didactic Flashcards (Review Cards) */}
      {unit.flashcards && unit.flashcards.length > 0 && (
        <section className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
                Dinámica Didáctica de Memoria Activa
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Tarjetas de Repaso Rápido (Flashcards)</h3>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">Haz clic en cada tarjeta para girarla</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {unit.flashcards.map((card, cIdx) => {
              const isFlipped = !!flippedCards[cIdx];
              return (
                <div
                  key={cIdx}
                  onClick={() => toggleFlipCard(cIdx)}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all min-h-[160px] flex flex-col justify-between shadow-xs ${
                    isFlipped
                      ? 'bg-purple-900 dark:bg-purple-950 text-white border-purple-800 dark:border-purple-700'
                      : 'bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className={`font-bold uppercase tracking-wider text-xs ${isFlipped ? 'text-purple-200' : 'text-slate-500 dark:text-slate-400'}`}>
                      {isFlipped ? 'Respuesta / Explicación' : `Pregunta ${cIdx + 1}`}
                    </span>
                    <RotateCw className={`w-4 h-4 ${isFlipped ? 'text-purple-200' : 'text-slate-500 dark:text-slate-400'}`} />
                  </div>

                  <p className={`text-sm sm:text-base font-semibold leading-relaxed my-auto ${isFlipped ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
                    {isFlipped ? card.back : card.front}
                  </p>

                  <div className="text-xs pt-2.5 border-t border-black/10 dark:border-white/10 mt-2 flex items-center justify-between">
                    <span className={isFlipped ? 'text-purple-200' : 'text-slate-500 dark:text-slate-400 font-medium'}>
                      {isFlipped ? '✓ Toca para volver a la pregunta' : '💡 ' + (card.hint || 'Toca para ver la respuesta')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Practical Workshop Section */}
      <section className="mt-14 pt-8 border-t-2 border-slate-200 dark:border-slate-800 transition-colors">
        <div className="bg-slate-900 dark:bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-slate-800 dark:border-slate-700/80">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
              Actividad Práctica Guiada
            </span>
            <span className="text-xs px-3 py-1 bg-slate-800 dark:bg-slate-800 text-slate-200 rounded-full font-medium border border-slate-700">
              Taller de Aplicación para Aprendices
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
            {unit.practicalWorkshop.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-200 mb-6 leading-relaxed">
            {unit.practicalWorkshop.description}
          </p>

          <div className="space-y-4 mb-6">
            {unit.practicalWorkshop.steps.map((st) => (
              <div key={st.step} className="p-4.5 bg-slate-800/80 dark:bg-slate-800/60 border border-slate-700/80 rounded-2xl">
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {st.step}
                  </span>
                  <h5 className="font-semibold text-sm sm:text-base text-white">{st.instruction}</h5>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 pl-8.5 leading-relaxed mb-2">{st.detail}</p>
                {st.expectedResult && (
                  <p className="text-xs text-emerald-300 pl-8.5 font-mono">
                    ✓ Resultado esperado: {st.expectedResult}
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-800/90 dark:bg-slate-800/90 border border-indigo-500/40 rounded-2xl text-xs sm:text-sm flex items-center justify-between">
            <span className="text-slate-200">
              <strong>Evidencia entregable:</strong> {unit.practicalWorkshop.deliverable}
            </span>
          </div>
        </div>
      </section>

      {/* Review Summary Checklist */}
      <section className="mt-12 p-6 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 transition-colors">
        <h4 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          Cierre y Puntos Clave de Repaso
        </h4>
        <ul className="space-y-2.5 text-sm sm:text-base text-slate-800 dark:text-slate-200">
          {unit.reviewSummary.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5">
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Interactive Unit Quiz */}
      <section className="mt-12 p-6 sm:p-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-xs transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Autoevaluación Formativa</span>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white">Cuestionario de Comprensión para el Aprendiz</h4>
          </div>
          {showQuizResults && (
            <div className="text-right">
              <p className="text-xs text-slate-500 dark:text-slate-400">Puntaje Obtenido</p>
              <p className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
                {calculateScore()} / {unit.quiz.length}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-6">
          {unit.quiz.map((q, qIndex) => {
            const chosen = selectedAnswers[q.id];
            const isCorrect = chosen === q.correctAnswer;

            return (
              <div key={q.id} className="p-5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
                <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white mb-3">
                  {qIndex + 1}. {q.question}
                </p>

                <div className="space-y-2.5">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = chosen === optIndex;
                    let btnStyle = 'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700';

                    if (showQuizResults) {
                      if (optIndex === q.correctAnswer) {
                        btnStyle = 'bg-emerald-100 dark:bg-emerald-950/70 border-emerald-500 dark:border-emerald-600 text-emerald-900 dark:text-emerald-100 font-semibold';
                      } else if (isSelected) {
                        btnStyle = 'bg-rose-100 dark:bg-rose-950/70 border-rose-500 dark:border-rose-600 text-rose-900 dark:text-rose-100';
                      } else {
                        btnStyle = 'bg-white/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 opacity-60';
                      }
                    } else if (isSelected) {
                      btnStyle = 'bg-indigo-50 dark:bg-indigo-950/80 border-indigo-600 dark:border-indigo-500 text-indigo-950 dark:text-indigo-200 font-semibold';
                    }

                    return (
                      <button
                        key={optIndex}
                        onClick={() => handleSelectAnswer(q.id, optIndex)}
                        disabled={showQuizResults}
                        className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-2.5 cursor-pointer ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-slate-400 dark:border-slate-500 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span className="flex-1">{opt}</span>
                      </button>
                    );
                  })}
                </div>

                {showQuizResults && (
                  <div className={`mt-3 p-3 rounded-xl text-xs leading-relaxed ${isCorrect ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-800' : 'bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 border border-rose-200 dark:border-rose-800'}`}>
                    <strong>{isCorrect ? '¡Correcto!' : 'Respuesta incorrecta.'}</strong> {q.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          {!showQuizResults ? (
            <button
              onClick={() => setShowQuizResults(true)}
              disabled={Object.keys(selectedAnswers).length < unit.quiz.length}
              className={`px-6 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                Object.keys(selectedAnswers).length === unit.quiz.length
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
              }`}
            >
              Comprobar Respuestas del Cuestionario
            </button>
          ) : (
            <button
              onClick={() => {
                setShowQuizResults(false);
                setSelectedAnswers({});
              }}
              className="px-4 py-2 text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors font-medium"
            >
              Reintentar Cuestionario
            </button>
          )}

          <button
            onClick={() => window.print()}
            title="Imprimir unidad completa o exportar como PDF"
            className="px-4 py-2.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all flex items-center gap-2 cursor-pointer shadow-2xs print:hidden"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Imprimir Guía / PDF</span>
          </button>

          <button
            onClick={() => onToggleComplete(unit.id)}
            className={`px-5 py-2.5 text-xs font-semibold rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              isCompleted
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs'
                : 'bg-slate-900 dark:bg-indigo-600 text-white hover:bg-slate-800 dark:hover:bg-indigo-500'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {isCompleted ? 'Unidad Completada (Clic para desmarcar)' : 'Marcar Unidad como Completada'}
          </button>
        </div>
      </section>

      {/* Pagination Next / Prev */}
      <div className="flex items-center justify-between mt-12 pt-6 border-t border-slate-200 dark:border-slate-800 transition-colors">
        {onSelectPrevUnit ? (
          <button
            onClick={onSelectPrevUnit}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Unidad Anterior</span>
          </button>
        ) : <div />}

        {onSelectNextUnit && (
          <button
            onClick={onSelectNextUnit}
            className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
          >
            <span>Siguiente Unidad</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </article>
  );
};
