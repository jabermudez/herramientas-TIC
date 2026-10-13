import React, { useState } from 'react';
import {
  Cpu,
  HardDrive,
  Database,
  Monitor,
  Network,
  Shield,
  ShieldCheck,
  Lock,
  Smartphone,
  Cloud,
  FileText,
  FileSpreadsheet,
  FolderTree,
  BatteryCharging,
  Zap,
  Layers,
  Sparkles,
  ArrowRight,
  Users,
  CheckCircle2,
  AlertTriangle,
  Info,
  Server,
  Globe,
  CornerDownRight,
  Eye,
  KeyRound,
  Laptop,
  MousePointer,
  Terminal
} from 'lucide-react';

interface DidacticGraphicProps {
  graphicId:
    | 'ecosistema-tic'
    | 'computer-cycle'
    | 'hardware-bus'
    | 'data-units'
    | 'os-architecture'
    | 'file-hierarchy'
    | 'excel-formula'
    | 'cloud-sync'
    | 'cyber-shield'
    | 'battery-care';
}

export const DidacticGraphic: React.FC<DidacticGraphicProps> = ({ graphicId }) => {
  switch (graphicId) {
    case 'ecosistema-tic':
      return <EcosistemaTicGraphic />;
    case 'computer-cycle':
      return <ComputerCycleGraphic />;
    case 'hardware-bus':
      return <HardwareBusGraphic />;
    case 'data-units':
      return <DataUnitsGraphic />;
    case 'os-architecture':
      return <OsArchitectureGraphic />;
    case 'file-hierarchy':
      return <FileHierarchyGraphic />;
    case 'excel-formula':
      return <ExcelFormulaGraphic />;
    case 'cloud-sync':
      return <CloudSyncGraphic />;
    case 'cyber-shield':
      return <CyberShieldGraphic />;
    case 'battery-care':
      return <BatteryCareGraphic />;
    default:
      return null;
  }
};

/* =========================================================================
   1. Ecosistema TIC Graphic
   ========================================================================= */
const EcosistemaTicGraphic: React.FC = () => {
  const [activePillar, setActivePillar] = useState<number>(0);

  const pillars = [
    {
      id: 'hw',
      title: 'Hardware & Dispositivos',
      icon: <Cpu className="w-5 h-5 text-indigo-500" />,
      color: 'indigo',
      badge: 'Capa Física',
      summary: 'Equipos tangibles donde se procesan los datos.',
      items: ['Procesadores (CPU)', 'Memoria RAM volátil', 'Almacenamiento NVMe SSD', 'Smartphones y Laptops']
    },
    {
      id: 'sw',
      title: 'Software & Aplicaciones',
      icon: <Layers className="w-5 h-5 text-emerald-500" />,
      color: 'emerald',
      badge: 'Capa Lógica',
      summary: 'Instrucciones programadas que dirigen las máquinas.',
      items: ['Sistemas Operativos (Win/Mac/Linux)', 'Suites Ofimáticas (Word, Excel)', 'Navegadores Web (Chrome, Edge)', 'Apps de Mensajería']
    },
    {
      id: 'net',
      title: 'Redes & Conectividad',
      icon: <Globe className="w-5 h-5 text-cyan-500" />,
      color: 'cyan',
      badge: 'Capa de Enlace',
      summary: 'Infraestructura global que enlaza dispositivos.',
      items: ['Fibra óptica e Internet', 'Protocolo seguro HTTPS / TLS', 'Routers y Wi-Fi 6', 'Direcciones IP y DNS']
    },
    {
      id: 'cloud-ai',
      title: 'Cloud Computing e IA',
      icon: <Sparkles className="w-5 h-5 text-purple-500" />,
      color: 'purple',
      badge: 'Capa Inteligente',
      summary: 'Servidores remotos y modelos de asistencia cognitiva.',
      items: ['Almacenamiento Drive / OneDrive', 'Coautoría multiusuario en tiempo real', 'Modelos de Lenguaje e IA Generativa', 'Automatización de tareas']
    }
  ];

  return (
    <div className="my-8 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2.5">
          <span className="p-2 bg-indigo-500/20 rounded-xl text-indigo-400 border border-indigo-400/30">
            <Network className="w-5 h-5" />
          </span>
          <div>
            <h4 className="text-base sm:text-lg font-bold text-white tracking-wide">Infografía Didáctica: El Ecosistema Integral de las TIC</h4>
            <p className="text-xs text-indigo-200">Explora la convergencia de las 4 dimensiones tecnológicas que mueven el mundo digital</p>
          </div>
        </div>
        <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-400/30">
          Diagrama Interactivo
        </span>
      </div>

      {/* Grid of 4 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-6">
        {pillars.map((p, idx) => {
          const isActive = activePillar === idx;
          return (
            <button
              key={p.id}
              onClick={() => setActivePillar(idx)}
              className={`text-left p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? 'bg-indigo-600/30 border-indigo-400 shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-400/40'
                  : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="p-2 rounded-lg bg-slate-900/80">{p.icon}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-900/90 text-slate-300">
                    {p.badge}
                  </span>
                </div>
                <h5 className="font-bold text-sm text-white mb-1">{p.title}</h5>
                <p className="text-xs text-slate-300 leading-snug line-clamp-2">{p.summary}</p>
              </div>
              <div className="mt-3 text-[11px] font-semibold text-indigo-300 flex items-center gap-1">
                <span>{isActive ? '● Seleccionado' : 'Click para ver detalles'}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Pillar Detail Showcase */}
      <div className="p-5 rounded-2xl bg-slate-950/80 border border-indigo-500/30 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-indigo-400 font-bold text-xs uppercase tracking-wider">Detalle del Componente:</span>
          <span className="text-sm font-bold text-white">{pillars[activePillar].title}</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 mb-4">{pillars[activePillar].summary}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5">
          {pillars[activePillar].items.map((it, i) => (
            <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{it}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   2. Hardware Bus Architecture Graphic
   ========================================================================= */
const HardwareBusGraphic: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState<'cpu' | 'ram' | 'ssd' | 'gpu'>('ram');

  const infoMap = {
    cpu: {
      title: 'CPU (Unidad Central de Procesamiento)',
      role: 'El Cerebro de la Computadora',
      analogy: 'El Chef Ejecutivo en una cocina.',
      speed: 'Gigahercios (3.0 - 5.5 GHz) · Latencia de nanosegundos',
      details: 'Ejecuta miles de millones de instrucciones por segundo. Toma datos de la RAM, realiza operaciones aritméticas y lógicas, y envía resultados a la pantalla o almacenamiento.',
      icon: <Cpu className="w-6 h-6 text-indigo-400" />
    },
    ram: {
      title: 'Memoria RAM (Random Access Memory)',
      role: 'Mesa de Trabajo Volátil Ultrarrápida',
      analogy: 'La mesa del chef donde coloca los ingredientes que está cocinando en este instante.',
      speed: 'Transferencia de hasta 64 GB/s · Latencia ultra baja (10-15 ns)',
      details: 'Almacena temporalmente los programas abiertos (Word, pestañas de Chrome, sistema operativo). Si se corta la energía o se apaga el equipo, su contenido se evapora por completo.',
      icon: <Layers className="w-6 h-6 text-amber-400" />
    },
    ssd: {
      title: 'Almacenamiento SSD NVMe / HDD',
      role: 'Bodega de Guardado Permanente',
      analogy: 'La despensa o alacena donde se guardan los paquetes y frascos por meses.',
      speed: '500 MB/s (SATA) hasta 7.000 MB/s (NVMe PCIe 4.0)',
      details: 'Guarda tus documentos, fotos, videos y el sistema operativo sin requerir electricidad. Es más lento que la RAM, pero conserva todo cuando apagas la máquina.',
      icon: <HardDrive className="w-6 h-6 text-emerald-400" />
    },
    gpu: {
      title: 'Tarjeta Gráfica (GPU)',
      role: 'Especialista en Píxeles e Inteligencia Artificial',
      analogy: 'El artista y decorador que dibuja instantáneamente cada plato.',
      speed: 'Miles de núcleos paralelos de cálculo masivo',
      details: 'Calcula millones de polígonos, colores y píxeles simultáneamente para proyectarlos en tu monitor HDMI o DisplayPort sin saturar a la CPU.',
      icon: <Monitor className="w-6 h-6 text-cyan-400" />
    }
  };

  const curr = infoMap[selectedPart];

  return (
    <div className="my-8 bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Diagrama Arquitectónico</span>
          <h4 className="text-base sm:text-lg font-bold text-white">Autopista de Datos: Cómo se comunican CPU, RAM y SSD</h4>
        </div>
        <span className="text-xs px-3 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
          Haz clic en cada componente para ver el flujo
        </span>
      </div>

      {/* Visual Motherboard Architecture */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {(['cpu', 'ram', 'ssd', 'gpu'] as const).map((key) => {
          const item = infoMap[key];
          const isSelected = selectedPart === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedPart(key)}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-indigo-600/30 border-indigo-400 shadow-md ring-2 ring-indigo-400/50'
                  : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700'
              }`}
            >
              <div className="mb-3">{item.icon}</div>
              <h5 className="font-bold text-sm text-white">{item.title.split(' ')[0]}</h5>
              <p className="text-[11px] text-slate-300 font-medium line-clamp-1">{item.role}</p>
              {isSelected && (
                <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              )}
            </button>
          );
        })}
      </div>

      {/* Detailed Component Breakdown */}
      <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            {curr.icon}
            <h5 className="font-bold text-base text-white">{curr.title}</h5>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 bg-slate-800 text-slate-200 rounded-lg">
            {curr.speed}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">{curr.details}</p>

        <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-amber-300 block mb-0.5">Analogía Pedagógica:</span>
            {curr.analogy}
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. Data Units Graphic (Bit to Terabyte)
   ========================================================================= */
const DataUnitsGraphic: React.FC = () => {
  const [selectedUnit, setSelectedUnit] = useState<number>(3); // Megabyte by default

  const scale = [
    { name: 'Bit (b)', power: '0 o 1', equivalence: 'Unidad elemental de información', example: 'Un interruptor: encendido (1) o apagado (0)' },
    { name: 'Byte (B)', power: '8 Bits', equivalence: '1 carácter de texto', example: 'La letra "A", un espacio o el número "7"' },
    { name: 'Kilobyte (KB)', power: '1.024 Bytes', equivalence: 'Párrafo o documento simple', example: 'Un correo electrónico breve sin imágenes adjuntas' },
    { name: 'Megabyte (MB)', power: '1.024 Kilobytes', equivalence: 'Canción o foto de celular', example: 'Una canción MP3 (~4 MB) o una foto en WhatsApp (~2 MB)' },
    { name: 'Gigabyte (GB)', power: '1.024 Megabytes', equivalence: 'Película HD o instalación de app', example: 'Un video de 1 hora en Netflix HD (~3 GB) o memoria RAM típica (8 a 16 GB)' },
    { name: 'Terabyte (TB)', power: '1.024 Gigabytes', equivalence: 'Biblioteca gigantesca de datos', example: 'Un disco duro externo de 1 TB almacena aprox. 250.000 fotos en alta resolución' }
  ];

  return (
    <div className="my-8 bg-gradient-to-br from-slate-900 to-indigo-950 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Escala de Almacenamiento</span>
          <h4 className="text-base sm:text-lg font-bold text-white">¿Cuánto pesa la información digital? (De Bit a Terabyte)</h4>
        </div>
        <span className="text-xs px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full border border-indigo-400/30">
          Factor multiplicador binario: ×1.024
        </span>
      </div>

      {/* Interactive Scale Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
        {scale.map((s, idx) => {
          const isSel = selectedUnit === idx;
          return (
            <button
              key={s.name}
              onClick={() => setSelectedUnit(idx)}
              className={`p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                isSel
                  ? 'bg-indigo-600 border-indigo-400 text-white font-bold shadow-md shadow-indigo-600/40'
                  : 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-300'
              }`}
            >
              <div className="text-xs sm:text-sm font-bold">{s.name.split(' ')[0]}</div>
              <div className="text-[10px] opacity-80">{s.name.split(' ')[1]}</div>
            </button>
          );
        })}
      </div>

      {/* Active unit breakdown */}
      <div className="p-6 rounded-2xl bg-slate-950/80 border border-indigo-500/20">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Database className="w-5 h-5 text-indigo-400" />
            <h5 className="font-bold text-base text-white">{scale[selectedUnit].name}</h5>
          </div>
          <span className="text-xs font-mono px-3 py-1 bg-indigo-950 text-indigo-300 rounded-lg border border-indigo-800">
            Equivalencia: {scale[selectedUnit].power}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-slate-400 font-semibold block mb-1">Capacidad Conceptual:</span>
            <span className="text-slate-100 font-medium">{scale[selectedUnit].equivalence}</span>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-emerald-400 font-semibold block mb-1">Ejemplo de la Vida Cotidiana:</span>
            <span className="text-slate-100 font-medium">{scale[selectedUnit].example}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   4. OS Architecture Graphic
   ========================================================================= */
const OsArchitectureGraphic: React.FC = () => {
  return (
    <div className="my-8 bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Estructura en Capas</span>
        <h4 className="text-base sm:text-lg font-bold text-white">Anatomía del Sistema Operativo: ¿Quién manda en tu equipo?</h4>
        <p className="text-xs text-slate-300">El sistema operativo es el mediador indispensable entre tus manos y el silicio del computador.</p>
      </div>

      <div className="space-y-3">
        {/* Layer 1: Usuario */}
        <div className="p-4 rounded-2xl bg-indigo-600/30 border border-indigo-400/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500 rounded-xl text-white">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-white">Capa 1: Usuario (Tú)</h5>
              <p className="text-xs text-indigo-200">Clics con el mouse, pulsaciones de teclas, órdenes de voz y gestos táctiles.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-300 hidden sm:inline">Entrada Humana</span>
        </div>

        {/* Layer 2: Aplicaciones */}
        <div className="p-4 rounded-2xl bg-cyan-600/20 border border-cyan-400/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-cyan-500 rounded-xl text-white">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-white">Capa 2: Aplicaciones (Programas)</h5>
              <p className="text-xs text-cyan-200">Microsoft Word, Google Chrome, Excel, reproductores multimedia, juegos.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-cyan-300 hidden sm:inline">Software de Usuario</span>
        </div>

        {/* Layer 3: Sistema Operativo */}
        <div className="p-4 rounded-2xl bg-emerald-600/20 border border-emerald-400/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-500 rounded-xl text-white">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-white">Capa 3: Sistema Operativo (Kernel & Drivers)</h5>
              <p className="text-xs text-emerald-200">Windows 11, macOS, GNU/Linux, Android. Asigna memoria RAM, gestiona archivos y coordina la CPU.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-emerald-300 hidden sm:inline">El Administrador</span>
        </div>

        {/* Layer 4: Hardware Físico */}
        <div className="p-4 rounded-2xl bg-amber-600/20 border border-amber-400/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500 rounded-xl text-white">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-white">Capa 4: Hardware Físico (Placa, Chips y Cables)</h5>
              <p className="text-xs text-amber-200">CPU ejecutando millones de pulsos eléctricos, transistores de memoria y discos magnéticos/ópticos.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-300 hidden sm:inline">Capa Material</span>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   5. File Hierarchy & Extensions Graphic
   ========================================================================= */
const FileHierarchyGraphic: React.FC = () => {
  return (
    <div className="my-8 bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Organización y Buenas Prácticas</span>
          <h4 className="text-base sm:text-lg font-bold text-white">Árbol de Directorios y Anatomía de Extensiones</h4>
        </div>
        <FolderTree className="w-6 h-6 text-cyan-400" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Tree Directory */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-slate-950 font-mono text-xs sm:text-sm border border-slate-800 space-y-2">
          <div className="text-slate-400 font-bold mb-3 flex items-center gap-2">
            <Server className="w-4 h-4 text-cyan-400" />
            <span>Estructura Recomendada (Nomenclatura Profesional):</span>
          </div>

          <div className="text-cyan-300 font-bold">📁 C:\Aprendices_TIC_2026\</div>
          <div className="pl-4 text-indigo-300">├── 📁 01_Documentos_Texto\</div>
          <div className="pl-8 text-slate-300">└── 📄 2026-03_Informe_Gestion_v1.docx</div>
          <div className="pl-4 text-emerald-300">├── 📁 02_Finanzas_Hojas_Calculo\</div>
          <div className="pl-8 text-slate-300">├── 📊 Presupuesto_Anual_Formulas.xlsx</div>
          <div className="pl-8 text-slate-300">└── 📈 Reporte_Ventas_Q1.csv</div>
          <div className="pl-4 text-amber-300">├── 📁 03_Recursos_Multimedia\</div>
          <div className="pl-8 text-slate-300">├── 🖼️ Banner_Institucional.png</div>
          <div className="pl-8 text-slate-300">└── 🎥 Video_Tutorial_HD.mp4</div>
          <div className="pl-4 text-purple-300">└── 📁 04_Entregables_Finales_PDF\</div>
          <div className="pl-8 text-slate-300">└── 📑 Evidencia_Certificada_TIC.pdf</div>
        </div>

        {/* Extensions cheat sheet */}
        <div className="lg:col-span-5 space-y-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Familias de Archivos:</div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
            <span className="font-bold text-indigo-300">.docx / .pdf</span>
            <span className="text-slate-300">Documentos de texto / Impresión fija</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
            <span className="font-bold text-emerald-300">.xlsx / .csv</span>
            <span className="text-slate-300">Hojas con fórmulas y bases de datos</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
            <span className="font-bold text-amber-300">.jpg / .png / .svg</span>
            <span className="text-slate-300">Fotografías / Transparencias / Vectores</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
            <span className="font-bold text-rose-300">.exe / .bat / .msi</span>
            <span className="text-rose-200">Ejecutables (¡Peligro si vienen de fuentes dudosas!)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   6. Excel Formula Anatomy Graphic
   ========================================================================= */
const ExcelFormulaGraphic: React.FC = () => {
  return (
    <div className="my-8 bg-slate-900 border border-slate-700/80 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Ofimática Analítica</span>
          <h4 className="text-base sm:text-lg font-bold text-white">Anatomía Visual de una Fórmula en Microsoft Excel</h4>
          <p className="text-xs text-slate-300">Entiende cada fragmento para no frustrarte con errores como #¿NOMBRE? o #¡VALOR!</p>
        </div>
        <FileSpreadsheet className="w-6 h-6 text-emerald-400" />
      </div>

      {/* Visual Formula Display */}
      <div className="my-6 p-6 rounded-2xl bg-slate-950 border border-emerald-500/30 flex flex-wrap items-center justify-center gap-2 text-base sm:text-xl font-mono">
        <span className="px-3 py-1.5 rounded-xl bg-rose-500/30 text-rose-300 border border-rose-400 font-bold" title="Signo igual obligatorio">
          =
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/30 text-emerald-300 border border-emerald-400 font-bold" title="Nombre de función">
          SI
        </span>
        <span className="text-slate-400 font-bold">(</span>
        <span className="px-3 py-1.5 rounded-xl bg-indigo-500/30 text-indigo-300 border border-indigo-400 font-bold" title="Prueba lógica o condición">
          C4 &gt;= 3.0
        </span>
        <span className="text-amber-400 font-bold">;</span>
        <span className="px-3 py-1.5 rounded-xl bg-cyan-500/30 text-cyan-300 border border-cyan-400 font-bold" title="Valor si se cumple la condición">
          &quot;Aprobado&quot;
        </span>
        <span className="text-amber-400 font-bold">;</span>
        <span className="px-3 py-1.5 rounded-xl bg-purple-500/30 text-purple-300 border border-purple-400 font-bold" title="Valor si NO se cumple">
          &quot;Pendiente&quot;
        </span>
        <span className="text-slate-400 font-bold">)</span>
      </div>

      {/* Legend & Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200">
          <span className="font-bold block mb-1 text-rose-300">1. Signo Igual (=)</span>
          Le indica a la celda que debe computar un cálculo matemático y no guardar texto estático.
        </div>
        <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
          <span className="font-bold block mb-1 text-emerald-300">2. Función (SI, SUMA...)</span>
          El comando programado que ejecuta la lógica. Siempre va seguido de paréntesis abierto.
        </div>
        <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-200">
          <span className="font-bold block mb-1 text-indigo-300">3. Condición Lógica</span>
          La pregunta que evalúa Excel: ¿es la celda C4 mayor o igual a 3.0? (Verdadero o Falso).
        </div>
        <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-purple-200">
          <span className="font-bold block mb-1 text-purple-300">4. El Signo Pesos ($)</span>
          En <code className="text-amber-300 font-bold">$A$1</code> fija la columna y la fila para que no se muevan al arrastrar.
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   7. Cloud Sync & Collaboration Graphic
   ========================================================================= */
const CloudSyncGraphic: React.FC = () => {
  return (
    <div className="my-8 bg-gradient-to-br from-slate-900 to-indigo-950 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Trabajo Colaborativo</span>
          <h4 className="text-base sm:text-lg font-bold text-white">Flujo en la Nube: Sincronización y Regla 3-2-1</h4>
          <p className="text-xs text-indigo-200">Despídete de enviar archivos por correo titulados &quot;final_v2_este_si.docx&quot;</p>
        </div>
        <Cloud className="w-6 h-6 text-indigo-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/30 text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 mb-3">
            <Users className="w-5 h-5" />
          </div>
          <h5 className="font-bold text-sm text-white mb-1">Coautoría en Vivo</h5>
          <p className="text-xs text-slate-300 leading-relaxed">
            Múltiples aprendices escriben simultáneamente en el mismo documento con cursores de colores en tiempo real.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/30 text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
            <Layers className="w-5 h-5" />
          </div>
          <h5 className="font-bold text-sm text-white mb-1">Historial de Versiones</h5>
          <p className="text-xs text-slate-300 leading-relaxed">
            Cada cambio queda registrado segundo a segundo. Puedes restaurar el documento al estado de hace tres días con un clic.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/90 border border-indigo-500/30 text-center">
          <div className="w-10 h-10 mx-auto rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400 mb-3">
            <Lock className="w-5 h-5" />
          </div>
          <h5 className="font-bold text-sm text-white mb-1">Permisos Granulares</h5>
          <p className="text-xs text-slate-300 leading-relaxed">
            Control de accesos: <strong>Lector</strong> (solo visualiza), <strong>Comentador</strong> (deja notas), <strong>Editor</strong> (modifica contenido).
          </p>
        </div>
      </div>

      <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs sm:text-sm">
        <span className="font-bold text-indigo-300">Regla de Respaldo 3-2-1:</span>
        <span className="text-slate-300">3 copias de tus datos importantes · 2 medios distintos · 1 copia fuera de sitio (en la Nube).</span>
      </div>
    </div>
  );
};

/* =========================================================================
   8. Cybersecurity Defense Shield Graphic
   ========================================================================= */
const CyberShieldGraphic: React.FC = () => {
  return (
    <div className="my-8 bg-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Seguridad Digital</span>
          <h4 className="text-base sm:text-lg font-bold text-white">El Escudo de las 5 Capas de Protección Digital</h4>
          <p className="text-xs text-slate-300">Medidas activas para blindar tus cuentas bancarias, correos y redes personales.</p>
        </div>
        <ShieldCheck className="w-6 h-6 text-emerald-400" />
      </div>

      <div className="space-y-3">
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
            <KeyRound className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-sm text-white">1. Contraseñas Fuertes y Únicas</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              Mínimo 12 caracteres mezclando mayúsculas, minúsculas, números y símbolos. <strong>Nunca uses la misma contraseña</strong> en más de un servicio.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-sm text-white">2. Autenticación en Dos Pasos (2FA)</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              Aunque un hacker descubra tu clave, no podrá entrar sin el código temporal generado por tu teléfono (Google Authenticator o Microsoft Authenticator).
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-sm text-white">3. Detección de Phishing (Ingeniería Social)</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              Desconfía de mensajes urgentes ("Su cuenta será bloqueada en 2 horas"). Revisa el dominio web real antes de ingresar tus datos.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h5 className="font-bold text-sm text-white">4. Actualizaciones de Seguridad Automáticas</h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              Las actualizaciones corrigen vulnerabilidades recién descubiertas por cibercriminales. Mantén tu celular y tu PC al día.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   9. Battery Care & Mobile Health Graphic
   ========================================================================= */
const BatteryCareGraphic: React.FC = () => {
  return (
    <div className="my-8 bg-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Salud del Dispositivo Móvil</span>
          <h4 className="text-base sm:text-lg font-bold text-white">Mantenimiento de Batería y Rendimiento en Celulares</h4>
          <p className="text-xs text-slate-300">Reglas físicas para alargar la vida útil de las baterías de iones de litio.</p>
        </div>
        <BatteryCharging className="w-6 h-6 text-amber-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/20">
          <h5 className="font-bold text-sm text-amber-300 mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>La Regla de Oro: Rango 20% - 80%</span>
          </h5>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            Las celdas de litio sufren estrés químico extremo cuando bajan del 20% o cuando se mantienen forzadas al 100% conectadas toda la noche bajo calor intenso.
          </p>
          <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden flex">
            <div className="bg-rose-500 w-[20%]" title="Estrés bajo (Evitar)" />
            <div className="bg-emerald-500 w-[60%]" title="Rango Óptimo de Trabajo" />
            <div className="bg-amber-500 w-[20%]" title="Estrés alto por saturación" />
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>0% (Peligro)</span>
            <span className="text-emerald-400 font-bold">20% - 80% (Zona Segura)</span>
            <span>100%</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/20">
          <h5 className="font-bold text-sm text-amber-300 mb-2 flex items-center gap-2">
            <Smartphone className="w-4 h-4" />
            <span>Limpieza de Caché y Espacio</span>
          </h5>
          <p className="text-xs text-slate-300 leading-relaxed mb-2">
            Borrar la memoria caché de aplicaciones pesadas (TikTok, Instagram, WhatsApp) libera gigabytes de espacio sin borrar tus chats ni contraseñas.
          </p>
          <p className="text-xs text-slate-400">
            En WhatsApp: Ajustes &gt; Almacenamiento &gt; Administrar almacenamiento para eliminar videos reenviados duplicados.
          </p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   10. El Computador & Ciclo de Procesamiento (Input-Process-Storage-Output)
   ========================================================================= */
const ComputerCycleGraphic: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cycle' | 'types' | 'concept'>('cycle');
  const [selectedPhase, setSelectedPhase] = useState<number>(1);
  const [selectedDevice, setSelectedDevice] = useState<number>(0);

  const phases = [
    {
      id: 'input',
      title: '1. Entrada (Input)',
      badge: 'Captura de Datos',
      icon: <MousePointer className="w-5 h-5 text-sky-400" />,
      color: 'border-sky-500/50 bg-sky-950/40 text-sky-300',
      activeColor: 'from-sky-600/30 to-blue-600/10 border-sky-400',
      description: 'El computador recibe datos brutos del exterior a través de periféricos de entrada. Transforma pulsaciones mecánicas, ondas sonoras, imágenes ópticas o clics en señales eléctricas de ceros y unos.',
      devices: ['Teclado físico o táctil', 'Ratón o Touchpad', 'Micrófono de voz', 'Cámara web', 'Escáner óptico'],
      example: 'El aprendiz pulsa teclas digitando el código de su producto o nota escolar (datos en texto crudo).'
    },
    {
      id: 'process',
      title: '2. Procesamiento (CPU)',
      badge: 'Cálculo y Lógica',
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      color: 'border-indigo-500/50 bg-indigo-950/40 text-indigo-300',
      activeColor: 'from-indigo-600/30 to-purple-600/10 border-indigo-400',
      description: 'La Unidad Central de Procesamiento (CPU) ejecuta las instrucciones del software a miles de millones de ciclos por segundo (GHz). Interpreta, compara lógicamente, clasifica y transforma los datos crudos en información útil.',
      devices: ['CPU (Unidad de Control + ALU)', 'GPU (procesamiento gráfico paralelo)', 'Caché L1/L2/L3 ultrarrápida'],
      example: 'El procesador ejecuta la fórmula matemática, calcula el promedio y verifica si el aprendiz aprueba según la regla lógica.'
    },
    {
      id: 'storage',
      title: '3. Almacenamiento',
      badge: 'Retención de Datos',
      icon: <Database className="w-5 h-5 text-violet-400" />,
      color: 'border-violet-500/50 bg-violet-950/40 text-violet-300',
      activeColor: 'from-violet-600/30 to-fuchsia-600/10 border-violet-400',
      description: 'Los datos en proceso se conservan temporalmente en la memoria RAM para que la CPU acceda en nanosegundos. Si se desea guardar permanentemente, se escriben en unidades secundarias no volátiles (SSD, HDD o Nube).',
      devices: ['Memoria RAM (volátil y temporal)', 'Unidades SSD NVMe (no volátiles)', 'Discos duros HDD', 'Almacenamiento Cloud'],
      example: 'La hoja de cálculo permanece abierta en la memoria RAM mientras trabajas, y al pulsar Ctrl + G se graba en el disco SSD.'
    },
    {
      id: 'output',
      title: '4. Salida (Output)',
      badge: 'Entrega de Información',
      icon: <Monitor className="w-5 h-5 text-emerald-400" />,
      color: 'border-emerald-500/50 bg-emerald-950/40 text-emerald-300',
      activeColor: 'from-emerald-600/30 to-teal-600/10 border-emerald-400',
      description: 'El computador convierte los resultados binarios procesados a formatos comprensibles por el ser humano o listos para ser consumidos por otros sistemas externos.',
      devices: ['Monitor o Pantalla táctil', 'Altavoces y Auriculares', 'Impresoras y Plotters', 'Proyectores de video'],
      example: 'La pantalla muestra el reporte en formato PDF con gráficos de barra en colores, listo para presentar al instructor o cliente.'
    }
  ];

  const computerTypes = [
    {
      name: 'Computador de Escritorio (Desktop / Torre)',
      badge: 'Potencia & Ergonomía Fija',
      icon: <Monitor className="w-6 h-6 text-indigo-400" />,
      idealFor: 'Oficinas fijas, talleres técnicos, diseño gráfico pesado y laboratorios formativos.',
      advantages: [
        'Componentes modulares intercambiables (puedes cambiar solo la gráfica, RAM o disco)',
        'Mayor disipación de calor y vida útil prolongada',
        'Mejor relación rendimiento / costo en tareas de alto impacto'
      ]
    },
    {
      name: 'Computador Portátil (Laptop / Notebook)',
      badge: 'Movilidad & Autonomía',
      icon: <Laptop className="w-6 h-6 text-sky-400" />,
      idealFor: 'Aprendices que se desplazan, teletrabajo, trabajo de campo y reuniones.',
      advantages: [
        'Batería recargable integrada que funciona ante cortes de energía',
        'Todo incluido en un solo chasis (pantalla, teclado, touchpad, cámara y Wi-Fi)',
        'Bajo consumo eléctrico en comparación con torres convencionales'
      ]
    },
    {
      name: 'Servidor y Computación en la Nube',
      badge: 'Alta Disponibilidad 24/7',
      icon: <Server className="w-6 h-6 text-purple-400" />,
      idealFor: 'Alojar sitios web, bases de datos corporativas, correo y plataformas de formación.',
      advantages: [
        'Diseñados para no apagarse nunca durante meses o años continuos',
        'Cuentan con fuentes redundantes y discos en espejo (RAID) ante fallos',
        'Atienden a miles de usuarios simultáneamente a través de redes e Internet'
      ]
    },
    {
      name: 'Dispositivo Móvil (Smartphone / Tablet)',
      badge: 'Microcomputador de Bolsillo',
      icon: <Smartphone className="w-6 h-6 text-emerald-400" />,
      idealFor: 'Comunicación en tiempo real, escaneo de evidencias fotográficas y productividad ágil.',
      advantages: [
        'Procesadores ARM energéticamente eficientes con conectividad 4G/5G y GPS',
        'Interacción táctil inmediata y cámara para capturar documentos',
        'Sincronización continua en tiempo real con cuentas en la nube'
      ]
    }
  ];

  return (
    <div className="my-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-900 text-white p-6 shadow-2xl overflow-hidden">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              Infografía Fundamental
            </span>
            <span className="text-xs text-slate-400">Modelo de Von Neumann y Arquitectura Universal</span>
          </div>
          <h4 className="text-lg font-black text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-indigo-400" />
            <span>El Computador: Concepto, Arquitectura y Ciclo de Datos</span>
          </h4>
        </div>

        {/* View Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('cycle')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === 'cycle'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Ciclo de Procesamiento
          </button>
          <button
            onClick={() => setActiveTab('types')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === 'types'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Tipos de Equipos
          </button>
          <button
            onClick={() => setActiveTab('concept')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
              activeTab === 'concept'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Dato vs. Información
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {activeTab === 'cycle' && (
        <div className="mt-6 space-y-6">
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            Un computador no es simplemente una caja con circuitos: es una <strong className="text-white">máquina electrónica programable</strong> que transforma datos mediante el ciclo secuencial universal de 4 fases. Haz clic en cada fase para ver sus dispositivos y ejemplos:
          </p>

          {/* 4 Phases Flow Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {phases.map((p, idx) => {
              const isSelected = selectedPhase === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPhase(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                    isSelected
                      ? `border-indigo-400 bg-linear-to-b from-indigo-900/40 to-slate-950 shadow-lg ring-1 ring-indigo-400`
                      : 'border-slate-800 bg-slate-950/70 hover:border-slate-700 hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">{p.badge}</span>
                    {p.icon}
                  </div>
                  <h5 className="font-bold text-sm text-white mb-1">{p.title}</h5>
                  <div className="flex items-center text-[11px] text-slate-400 gap-1">
                    <span>Fase {idx + 1} de 4</span>
                    {idx < 3 && <ArrowRight className="w-3 h-3 text-slate-500 hidden md:inline ml-auto" />}
                  </div>
                  {isSelected && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-indigo-500 via-sky-400 to-indigo-500 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Phase Detail Panel */}
          {phases[selectedPhase] && (
            <div className="p-6 rounded-2xl bg-linear-to-b from-slate-950 to-slate-900 border border-indigo-500/30">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                    {phases[selectedPhase].icon}
                  </div>
                  <div>
                    <h5 className="text-base font-bold text-white">{phases[selectedPhase].title}</h5>
                    <span className="text-xs text-indigo-300 font-medium">{phases[selectedPhase].badge}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">Flujo continuo en nanosegundos</span>
                  <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
                </div>
              </div>

              <p className="text-sm text-slate-200 leading-relaxed mb-5">
                {phases[selectedPhase].description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                  <h6 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Dispositivos y Periféricos Clave</span>
                  </h6>
                  <ul className="space-y-1.5">
                    {phases[selectedPhase].devices.map((d, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-indigo-950/30 border border-indigo-500/20">
                  <h6 className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Ejemplo Real del Aprendiz en Acción</span>
                  </h6>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {phases[selectedPhase].example}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'types' && (
        <div className="mt-6 space-y-6">
          <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
            Aunque todos los computadores comparten la misma lógica de Von Neumann, se adaptan a diferentes necesidades operativas y laborales:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {computerTypes.map((type, idx) => {
              const isSelected = selectedDevice === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedDevice(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'border-indigo-400 bg-indigo-950/40 ring-1 ring-indigo-400 shadow-lg'
                      : 'border-slate-800 bg-slate-950/70 hover:border-slate-700'
                  }`}
                >
                  <div className="p-2 rounded-xl bg-slate-900 w-fit mb-3 border border-slate-800">
                    {type.icon}
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 block mb-1">
                    {type.badge}
                  </span>
                  <h5 className="font-bold text-xs text-white leading-snug">{type.name}</h5>
                </button>
              );
            })}
          </div>

          {computerTypes[selectedDevice] && (
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300">
                  {computerTypes[selectedDevice].icon}
                </div>
                <div>
                  <h5 className="font-bold text-base text-white">{computerTypes[selectedDevice].name}</h5>
                  <p className="text-xs text-slate-400 mt-0.5">
                    <strong>Ámbito ideal:</strong> {computerTypes[selectedDevice].idealFor}
                  </p>
                </div>
              </div>

              <h6 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Ventajas Técnicas y Laborales:</h6>
              <ul className="space-y-2">
                {computerTypes[selectedDevice].advantages.map((adv, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {activeTab === 'concept' && (
        <div className="mt-6 space-y-6">
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
            <h5 className="font-bold text-sm text-indigo-300 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4" />
              <span>La Diferencia Crucial: Dato Crudo vs. Información Procesada</span>
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              El computador es esencialmente un <strong className="text-white">procesador de datos</strong>. Para el técnico o aprendiz es indispensable distinguir entre:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-rose-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-1">Entrada en Bruto</span>
                <h6 className="font-bold text-sm text-white mb-2">Dato (Materia Prima)</h6>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  Es un símbolo, número o registro aislado sin contexto ni significado inmediato.
                </p>
                <div className="p-2.5 rounded-lg bg-black/50 font-mono text-xs text-rose-300 border border-rose-900/50">
                  Ejemplo: &quot;39.4&quot; o &quot;010111&quot; (¿Es una temperatura? ¿Un precio? ¿Una hora?).
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/30">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">Resultado Tras Procesar</span>
                <h6 className="font-bold text-sm text-white mb-2">Información (Conocimiento Útil)</h6>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">
                  Son los datos organizados, calculados y estructurados con propósito para la toma de decisiones.
                </p>
                <div className="p-2.5 rounded-lg bg-black/50 font-mono text-xs text-emerald-300 border border-emerald-900/50">
                  Ejemplo: &quot;Temperatura del paciente: 39.4°C [Alerta: Fiebre Alta]&quot;.
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-xs text-slate-300 flex items-start gap-3">
            <Zap className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white block mb-1">¿Por qué el computador no piensa por sí mismo?</strong>
              El computador es sumamente veloz para calcular (miles de millones de operaciones por segundo), pero carece de conciencia y sentido común. Solo ejecuta instrucciones lógicas rigurosas codificadas por personas mediante lenguajes de programación.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

