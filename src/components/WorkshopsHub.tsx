import React from 'react';
import { Keyboard, Globe, MessageSquare, ShieldAlert, Cable } from 'lucide-react';
import { KeyboardShortcutTrainer } from './labs/KeyboardShortcutTrainer';
import { WhatsAppFormatTester } from './labs/WhatsAppFormatTester';
import { PhishingInspector } from './labs/PhishingInspector';
import { PortsConnectorLab } from './labs/PortsConnectorLab';
import { SearchOperatorsLab } from './labs/SearchOperatorsLab';

interface WorkshopsHubProps {
  activeWorkshop: string;
  setActiveWorkshop: (workshop: string) => void;
}

export const WorkshopsHub: React.FC<WorkshopsHubProps> = ({
  activeWorkshop,
  setActiveWorkshop
}) => {
  return (
    <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 space-y-8">
      {/* Top Navigation for Workshops */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
          Laboratorios Prácticos para Aprendices
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Talleres de Destreza y Laboratorios Didácticos
        </h2>
        <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed mb-6">
          Actividades interactivas en tiempo real diseñadas para que los aprendices desarrollen agilidad con atajos de teclado, dominen la comunicación en WhatsApp, reconozcan puertos y cables de computadores, y se defiendan de trampas de correo electrónico fraudulento.
        </p>

        {/* Segmented workshop buttons */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl transition-colors">
          <button
            onClick={() => setActiveWorkshop('atajos-pc')}
            className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeWorkshop === 'atajos-pc'
                ? 'bg-white dark:bg-slate-700 text-indigo-950 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Keyboard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Atajos de Teclado PC</span>
          </button>

          <button
            onClick={() => setActiveWorkshop('atajos-web')}
            className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeWorkshop === 'atajos-web'
                ? 'bg-white dark:bg-slate-700 text-indigo-950 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Atajos Web & Búsqueda</span>
          </button>

          <button
            onClick={() => setActiveWorkshop('whatsapp')}
            className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeWorkshop === 'whatsapp'
                ? 'bg-white dark:bg-slate-700 text-indigo-950 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Formatos de WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveWorkshop('phishing')}
            className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeWorkshop === 'phishing'
                ? 'bg-white dark:bg-slate-700 text-indigo-950 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>Detector de Phishing</span>
          </button>

          <button
            onClick={() => setActiveWorkshop('puertos')}
            className={`px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeWorkshop === 'puertos'
                ? 'bg-white dark:bg-slate-700 text-indigo-950 dark:text-white shadow-sm ring-1 ring-slate-200 dark:ring-slate-600'
                : 'text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Cable className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Puertos & Cables</span>
          </button>
        </div>
      </div>

      {/* Render Active Lab */}
      <div>
        {activeWorkshop === 'atajos-pc' && (
          <div>
            <div className="mb-4 p-5 bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-2xl text-xs sm:text-sm text-indigo-950 dark:text-indigo-200">
              <h5 className="font-bold text-sm sm:text-base mb-1">Destreza de Operación con Teclado para Aprendices:</h5>
              <p className="leading-relaxed">
                El teclado es el instrumento más rápido para operar tu computador. Mientras un usuario novato tarda varios segundos en buscar el menú con el ratón, un aprendiz entrenado presiona <kbd className="font-mono bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-indigo-300 dark:border-indigo-700 font-bold">Ctrl + C</kbd> en fracciones de segundo. Practica con los ejercicios a continuación para ganar velocidad.
              </p>
            </div>
            <KeyboardShortcutTrainer />
          </div>
        )}

        {activeWorkshop === 'atajos-web' && (
          <div className="space-y-6">
            <div className="p-5 bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-2xl text-xs sm:text-sm text-sky-950 dark:text-sky-200">
              <h5 className="font-bold text-sm sm:text-base mb-1">Navegación Eficiente y Búsqueda Precisa en Internet:</h5>
              <p className="leading-relaxed">
                Aprende a navegar como un profesional: recupera pestañas cerradas por error con <kbd className="font-mono bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-sky-300 dark:border-sky-700 font-bold">Ctrl + Shift + T</kbd>, fuerza recargas limpias con <kbd className="font-mono bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-sky-300 dark:border-sky-700 font-bold">Ctrl + F5</kbd> y filtra búsquedas exactas con comillas <code className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-sky-300 dark:border-sky-700 font-bold">"término exacto"</code> o <code className="bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-sky-300 dark:border-sky-700 font-bold">site:edu</code>.
              </p>
            </div>
            <SearchOperatorsLab />
            <KeyboardShortcutTrainer />
          </div>
        )}

        {activeWorkshop === 'whatsapp' && (
          <div>
            <div className="mb-4 p-5 bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl text-xs sm:text-sm text-emerald-950 dark:text-emerald-200">
              <h5 className="font-bold text-sm sm:text-base mb-1">WhatsApp como Herramienta de Comunicación y Productividad:</h5>
              <p className="leading-relaxed">
                Utiliza la sintaxis nativa de formato (*negrita*, _cursiva_, ~tachado~, ```mono```) para estructurar avisos claros y legibles. Conoce la diferencia entre Grupos y Listas de Difusión para proteger la privacidad de los contactos.
              </p>
            </div>
            <WhatsAppFormatTester />
          </div>
        )}

        {activeWorkshop === 'phishing' && (
          <div>
            <PhishingInspector />
          </div>
        )}

        {activeWorkshop === 'puertos' && (
          <div>
            <PortsConnectorLab />
          </div>
        )}
      </div>
    </div>
  );
};

