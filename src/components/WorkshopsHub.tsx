import React from 'react';
import { Keyboard, Globe, MessageSquare, Github, ShieldAlert, Cable, Search } from 'lucide-react';
import { KeyboardShortcutTrainer } from './labs/KeyboardShortcutTrainer';
import { WhatsAppFormatTester } from './labs/WhatsAppFormatTester';
import { GithubPagesDeployGuide } from './labs/GithubPagesDeployGuide';
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
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Sección Práctica Especial</span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-2">
          Talleres de Destreza y Laboratorios Didácticos
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          Actividades prácticas con simuladores en tiempo real para desarrollar agilidad motriz con atajos de teclado, dominar WhatsApp profesional, auditar cables y puertos, detectar correos fraudulentos y publicar este manual en GitHub Pages.
        </p>

        {/* Segmented workshop buttons */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl transition-colors">
          <button
            onClick={() => setActiveWorkshop('atajos-pc')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeWorkshop === 'atajos-pc'
                ? 'bg-white dark:bg-slate-700 text-indigo-950 dark:text-white shadow-xs ring-1 ring-slate-200 dark:ring-slate-600'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Keyboard className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Atajos de Teclado PC</span>
          </button>

          <button
            onClick={() => setActiveWorkshop('atajos-web')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeWorkshop === 'atajos-web'
                ? 'bg-white dark:bg-slate-700 text-indigo-950 dark:text-white shadow-xs ring-1 ring-slate-200 dark:ring-slate-600'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            <span>Atajos Web & Búsqueda</span>
          </button>

          <button
            onClick={() => setActiveWorkshop('whatsapp')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeWorkshop === 'whatsapp'
                ? 'bg-white dark:bg-slate-700 text-indigo-950 dark:text-white shadow-xs ring-1 ring-slate-200 dark:ring-slate-600'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span>Trucos de WhatsApp</span>
          </button>

          <button
            onClick={() => setActiveWorkshop('phishing')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeWorkshop === 'phishing'
                ? 'bg-white dark:bg-slate-700 text-indigo-950 dark:text-white shadow-xs ring-1 ring-slate-200 dark:ring-slate-600'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>Detector de Phishing</span>
          </button>

          <button
            onClick={() => setActiveWorkshop('puertos')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeWorkshop === 'puertos'
                ? 'bg-white dark:bg-slate-700 text-indigo-950 dark:text-white shadow-xs ring-1 ring-slate-200 dark:ring-slate-600'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Cable className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span>Puertos & Cables</span>
          </button>

          <button
            onClick={() => setActiveWorkshop('github')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
              activeWorkshop === 'github'
                ? 'bg-white dark:bg-slate-700 text-indigo-950 dark:text-white shadow-xs ring-1 ring-slate-200 dark:ring-slate-600'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Github className="w-4 h-4 text-slate-800 dark:text-slate-200" />
            <span>Subir a GitHub Pages</span>
          </button>
        </div>
      </div>

      {/* Render Active Lab */}
      <div>
        {activeWorkshop === 'atajos-pc' && (
          <div>
            <div className="mb-4 p-4.5 bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-2xl text-xs text-indigo-900 dark:text-indigo-200">
              <h5 className="font-bold text-sm mb-1">Destreza de Operación con Teclado:</h5>
              <p className="leading-relaxed">
                El teclado es el instrumento más eficiente para operar un computador. Mientras un usuario novato tarda 4 segundos en mover la mano al ratón, hacer clic en "Editar" y buscar "Copiar", un usuario entrenado presiona <kbd className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-indigo-300 dark:border-indigo-700 font-bold">Ctrl + C</kbd> en 0.2 segundos. En una jornada de trabajo, esto ahorra hasta 45 minutos diarios.
              </p>
            </div>
            <KeyboardShortcutTrainer />
          </div>
        )}

        {activeWorkshop === 'atajos-web' && (
          <div className="space-y-6">
            <div className="p-4.5 bg-sky-50/70 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-2xl text-xs text-sky-900 dark:text-sky-200">
              <h5 className="font-bold text-sm mb-1">Navegación Eficiente y Búsqueda Precisa en Internet:</h5>
              <p className="leading-relaxed">
                Aprende a gestionar pestañas, revivir páginas cerradas accidentalmente con <kbd className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-sky-300 dark:border-sky-700 font-bold">Ctrl + Shift + T</kbd>, realizar recargas limpias de caché con <kbd className="font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-sky-300 dark:border-sky-700 font-bold">Ctrl + F5</kbd> y filtrar búsquedas exactas con comillas <code className="bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-sky-300 dark:border-sky-700 font-bold">"término exacto"</code> o <code className="bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded border border-sky-300 dark:border-sky-700 font-bold">site:edu</code>.
              </p>
            </div>
            <SearchOperatorsLab />
            <KeyboardShortcutTrainer />
          </div>
        )}

        {activeWorkshop === 'whatsapp' && (
          <div>
            <div className="mb-4 p-4.5 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 rounded-2xl text-xs text-emerald-900 dark:text-emerald-200">
              <h5 className="font-bold text-sm mb-1">WhatsApp como Herramienta de Comunicación y Productividad:</h5>
              <p className="leading-relaxed">
                Utiliza la sintaxis nativa de formato (*negrita*, _cursiva_, ~tachado~, ```mono```) para estructurar avisos claros y legibles. Conoce la diferencia crítica entre Grupos (abiertos y saturables) y Listas de Difusión (privadas y sin spam cruzado).
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

        {activeWorkshop === 'github' && (
          <div>
            <GithubPagesDeployGuide />
          </div>
        )}
      </div>
    </div>
  );
};
