import React, { useState } from 'react';
import { Cpu, HardDrive, CircuitBoard, Zap, Monitor, Disc3, CheckCircle2, HelpCircle } from 'lucide-react';

interface ComponentDetail {
  id: string;
  name: string;
  category: 'Procesamiento' | 'Memoria' | 'Almacenamiento' | 'Conexión' | 'Energía';
  role: string;
  analogy: string;
  specStandard: string;
  commonFailureSymptom: string;
  icon: React.ReactNode;
}

const HARDWARE_COMPONENTS: ComponentDetail[] = [
  {
    id: 'cpu',
    name: 'CPU (Procesador)',
    category: 'Procesamiento',
    role: 'Ejecuta todas las instrucciones de los programas realizando cálculos matemáticos y decisiones lógicas a velocidades de miles de millones de ciclos por segundo.',
    analogy: 'El Chef Ejecutivo de la cocina: toma decisiones rápidas, procesa ingredientes y delega tareas a los demás ayudantes.',
    specStandard: '4 a 8 núcleos físicos, frecuencias de 2.5 a 4.5 GHz (Intel Core i5/i7 o AMD Ryzen 5/7).',
    commonFailureSymptom: 'Sobrecalentamiento, apagados repentinos del computador o lentitud extrema al ejecutar múltiples tareas simultáneas.',
    icon: <Cpu className="w-6 h-6 text-indigo-600" />
  },
  {
    id: 'ram',
    name: 'Memoria RAM',
    category: 'Memoria',
    role: 'Almacena temporalmente el sistema operativo y las aplicaciones que están abiertas en este instante para acceso instantáneo por la CPU. Es volátil (se vacía al apagar).',
    analogy: 'La Mesa de Trabajo del cocinero: mientras más ancha sea, más ollas e ingredientes puede tener abiertos sin que se caigan al piso.',
    specStandard: '8 GB a 16 GB DDR4 o DDR5 (velocidades de 3200 MHz o superiores).',
    commonFailureSymptom: 'Pestañas del navegador que se recargan solas por falta de espacio en memoria o pantallazos azules de volcado de memoria.',
    icon: <Disc3 className="w-6 h-6 text-emerald-600" />
  },
  {
    id: 'ssd',
    name: 'SSD (Disco de Estado Sólido)',
    category: 'Almacenamiento',
    role: 'Guarda de manera permanente los archivos, fotos, programas y Windows sin depender de la corriente. Utiliza memoria flash sin partes mecánicas móviles.',
    analogy: 'La Despensa de la cocina: estantes donde todo queda guardado en orden para mañana. En el SSD los ingredientes se extraen en segundos.',
    specStandard: '512 GB a 1 TB NVMe M.2 (velocidades de 3000 a 7000 MB/s).',
    commonFailureSymptom: 'Falta de espacio para actualizar el sistema operativo o archivos que tardan mucho en abrir si el disco está al 98% de su capacidad.',
    icon: <HardDrive className="w-6 h-6 text-sky-600" />
  },
  {
    id: 'motherboard',
    name: 'Placa Madre (Motherboard)',
    category: 'Conexión',
    role: 'El circuito principal que interconecta físicamente todos los componentes del computador mediante pistas conductoras (buses) y gestiona la comunicación.',
    analogy: 'El Sistema Nervioso y el suelo de la cocina: donde están enchufados los hornos, mesas y por donde circulan los ayudantes.',
    specStandard: 'Formatos ATX o Micro-ATX con zócalo compatible con la CPU elegida.',
    commonFailureSymptom: 'El equipo no enciende en absoluto, no emite pitidos de inicio o no reconoce puertos USB tras una sobretensión eléctrica.',
    icon: <CircuitBoard className="w-6 h-6 text-amber-600" />
  },
  {
    id: 'psu',
    name: 'Fuente de Poder (PSU)',
    category: 'Energía',
    role: 'Convierte la corriente alterna del enchufe de pared a voltajes continuos y limpios (+12V, +5V, +3.3V) para alimentar cada pieza con seguridad.',
    analogy: 'El Corazón que bombea sangre oxigenada (electricidad filtrada) a cada uno de los órganos del cuerpo.',
    specStandard: '550W a 750W con certificación de eficiencia 80 Plus Bronze o Gold.',
    commonFailureSymptom: 'El computador se reinicia solo justo cuando ejecutas un programa pesado que exige más energía eléctrica.',
    icon: <Zap className="w-6 h-6 text-rose-600" />
  },
  {
    id: 'gpu',
    name: 'Tarjeta Gráfica (GPU)',
    category: 'Procesamiento',
    role: 'Procesa paralelamente millones de polígonos y píxeles para generar imagen en la pantalla, renderizar videos y modelos 3D.',
    analogy: 'El Diseñador Artístico del restaurante: se encarga exclusivamente de que la presentación visual del plato sea impecable y deslumbrante.',
    specStandard: 'Integrada (Intel Iris / AMD Radeon) o Dedicada (NVIDIA RTX / AMD Radeon con 6GB+ VRAM).',
    commonFailureSymptom: 'Artefactos visuales (rayas de colores en pantalla) o caídas bruscas de fotogramas al reproducir video en alta resolución.',
    icon: <Monitor className="w-6 h-6 text-purple-600" />
  }
];

export const HardwareExplorer: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('cpu');
  const [diagnosticQuizState, setDiagnosticQuizState] = useState<{
    solved: boolean;
    userChoice: string | null;
    feedback: string | null;
  }>({
    solved: false,
    userChoice: null,
    feedback: null
  });

  const activeComponent = HARDWARE_COMPONENTS.find(c => c.id === selectedId) || HARDWARE_COMPONENTS[0];

  const handleDiagnosticAnswer = (choiceId: string) => {
    if (choiceId === 'ram') {
      setDiagnosticQuizState({
        solved: true,
        userChoice: choiceId,
        feedback: '¡Exacto! El síntoma de pestañas que se cierran o reinician al abrir varios programas a la vez es el clásico síntoma de saturación de Memoria RAM (falta de memoria de trabajo).'
      });
    } else {
      setDiagnosticQuizState({
        solved: false,
        userChoice: choiceId,
        feedback: 'No exactamente. Esta pieza no causa directamente que las pestañas activas se queden sin memoria de trabajo temporal. ¡Intenta de nuevo!'
      });
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm my-6 transition-colors">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Laboratorio Interactivo</span>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">Explorador de Arquitectura de Hardware</h4>
        </div>
        <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline">Haz clic en cada componente para auditar su función</span>
      </div>

      {/* Grid of interactive hardware selector buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        {HARDWARE_COMPONENTS.map(comp => {
          const isSelected = comp.id === selectedId;
          return (
            <button
              key={comp.id}
              onClick={() => setSelectedId(comp.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'border-indigo-600 dark:border-indigo-500 bg-indigo-50/80 dark:bg-indigo-950/70 ring-2 ring-indigo-500/20'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-100/70 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                {comp.icon}
                {isSelected && <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />}
              </div>
              <div>
                <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase">{comp.category}</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{comp.name.split(' ')[0]}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Detail panel of active component */}
      <div className="bg-slate-50 dark:bg-slate-850/80 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="p-2 bg-white dark:bg-slate-800 rounded-lg shadow-xs border border-slate-200 dark:border-slate-700">{activeComponent.icon}</span>
            <h5 className="text-lg font-bold text-slate-900 dark:text-white">{activeComponent.name}</h5>
          </div>
          <span className="text-xs px-2.5 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-medium">
            Categoría: {activeComponent.category}
          </span>
        </div>

        <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed mb-4">{activeComponent.role}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
          <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="font-semibold text-indigo-900 dark:text-indigo-300 mb-1">Analogía Pedagógica</p>
            <p className="text-slate-600 dark:text-slate-300">{activeComponent.analogy}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="font-semibold text-emerald-900 dark:text-emerald-300 mb-1">Estándar Actual Recomendado</p>
            <p className="text-slate-600 dark:text-slate-300 font-mono text-[11px]">{activeComponent.specStandard}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
            <p className="font-semibold text-rose-900 dark:text-rose-300 mb-1">Síntoma Clásico de Falla</p>
            <p className="text-slate-600 dark:text-slate-300">{activeComponent.commonFailureSymptom}</p>
          </div>
        </div>
      </div>

      {/* Mini Diagnostic Challenge */}
      <div className="p-4 bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 rounded-2xl">
        <div className="flex items-start gap-2 mb-2">
          <HelpCircle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <h6 className="text-sm font-semibold text-amber-900 dark:text-amber-200">Desafío Rápido de Diagnóstico Técnico</h6>
            <p className="text-xs text-amber-800 dark:text-amber-300/90 mt-1">
              "Un usuario reporta que su computadora funciona bien al inicio, pero cuando abre 12 pestañas en Chrome y un archivo de Word al mismo tiempo, el navegador se congela y las páginas se recargan forzosamente". ¿Qué componente es el responsable más probable?
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mt-3 pl-7">
          {['cpu', 'ram', 'ssd', 'psu'].map(optionId => {
            const comp = HARDWARE_COMPONENTS.find(c => c.id === optionId)!;
            const isChosen = diagnosticQuizState.userChoice === optionId;
            return (
              <button
                key={optionId}
                onClick={() => handleDiagnosticAnswer(optionId)}
                className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-colors cursor-pointer ${
                  isChosen
                    ? diagnosticQuizState.solved
                      ? 'bg-emerald-600 text-white'
                      : 'bg-rose-600 text-white'
                    : 'bg-white dark:bg-slate-800 border border-amber-300 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 hover:bg-amber-100 dark:hover:bg-slate-700'
                }`}
              >
                {comp.name}
              </button>
            );
          })}
        </div>

        {diagnosticQuizState.feedback && (
          <p className={`text-xs mt-3 pl-7 font-medium ${diagnosticQuizState.solved ? 'text-emerald-800 dark:text-emerald-300' : 'text-rose-800 dark:text-rose-300'}`}>
            {diagnosticQuizState.feedback}
          </p>
        )}
      </div>
    </div>
  );
};
