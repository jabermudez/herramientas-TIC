import React, { useState } from 'react';
import { Cable, CheckCircle2, Monitor, Wifi, Volume2, HardDrive, Smartphone, Sparkles } from 'lucide-react';

interface PortSpec {
  id: string;
  name: string;
  standard: string;
  shape: string;
  maxSpeedOrResolution: string;
  primaryDevices: string;
  practicalTip: string;
  symbolColor: string;
}

const PORTS_DATA: PortSpec[] = [
  {
    id: 'usb-c',
    name: 'USB Tipo C (USB-C)',
    standard: 'USB 3.2 / Thunderbolt / USB4',
    shape: 'Ovalado y simétrico (reversible, se conecta de cualquier lado)',
    maxSpeedOrResolution: 'Hasta 40 Gbps y hasta 240W de carga rápida',
    primaryDevices: 'Celulares modernos, laptops, tablets, monitores y cargadores rápidos.',
    practicalTip: 'Un solo cable USB-C puede transmitir video 4K, transferir archivos pesados y cargar la laptop simultáneamente.',
    symbolColor: 'text-indigo-600 bg-indigo-50 border-indigo-200'
  },
  {
    id: 'usb-a',
    name: 'USB Tipo A (USB-A)',
    standard: 'USB 2.0 (negro) / USB 3.0 (azul)',
    shape: 'Rectangular rígido (no reversible, entra de una sola posición)',
    maxSpeedOrResolution: '480 Mbps (USB 2.0) a 5 Gbps (USB 3.0 azul)',
    primaryDevices: 'Ratones, teclados tradicionales, memorias USB e impresoras.',
    practicalTip: 'Si el interior del conector es azul, es de alta velocidad (USB 3.0); conéctale allí tus discos externos o memorias USB rápidas.',
    symbolColor: 'text-sky-600 bg-sky-50 border-sky-200'
  },
  {
    id: 'hdmi',
    name: 'HDMI (High-Definition Multimedia)',
    standard: 'HDMI 2.0 / 2.1',
    shape: 'Trapezoidal asimétrico con 19 pines',
    maxSpeedOrResolution: 'Hasta 4K a 120Hz o 8K a 60Hz + Audio digital envolvente',
    primaryDevices: 'Monitores de PC, televisores Smart TV, proyectores multimedia y consolas.',
    practicalTip: 'Transmite imagen y sonido al mismo tiempo por un solo cable; no necesitas conectar cables de audio adicionales.',
    symbolColor: 'text-purple-600 bg-purple-50 border-purple-200'
  },
  {
    id: 'rj45',
    name: 'Ethernet RJ-45 (Red Cableada)',
    standard: 'Gigabit Ethernet (Cat 5e / Cat 6)',
    shape: 'Conector plástico rectangular con lengüeta elástica de clic',
    maxSpeedOrResolution: '1.000 Mbps (1 Gbps) a 10 Gbps con latencia mínima (< 2ms)',
    primaryDevices: 'Routers, módems de Internet, computadoras de escritorio y servidores.',
    practicalTip: 'La conexión por cable RJ-45 es incomparablemente más estable y rápida que el Wi-Fi para videoconferencias y descargas masivas.',
    symbolColor: 'text-emerald-600 bg-emerald-50 border-emerald-200'
  },
  {
    id: 'jack',
    name: 'Jack 3.5 mm (Audio Auxiliar)',
    standard: 'Analógico TRRS (Stereo + Micrófono)',
    shape: 'Clavija cilíndrica metálica con aros aislantes negros',
    maxSpeedOrResolution: 'Audio analógico estéreo de alta fidelidad',
    primaryDevices: 'Auriculares, altavoces, micrófonos de solapa.',
    practicalTip: 'Si la clavija metálica tiene 3 aros aislantes negros (TRRS), incluye micrófono además de los canales izquierdo y derecho.',
    symbolColor: 'text-amber-600 bg-amber-50 border-amber-200'
  }
];

export const PortsConnectorLab: React.FC = () => {
  const [selectedPortId, setSelectedPortId] = useState<string>('usb-c');
  const activePort = PORTS_DATA.find(p => p.id === selectedPortId) || PORTS_DATA[0];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
            <Cable className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Guía Visual Interactiva</span>
            <h4 className="text-xl font-bold text-slate-900">Laboratorio de Puertos, Cables y Conectividad</h4>
          </div>
        </div>
        <span className="text-xs text-slate-500">Selecciona un conector para inspeccionar su estándar</span>
      </div>

      {/* Port Buttons Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
        {PORTS_DATA.map(port => {
          const isSelected = port.id === selectedPortId;
          return (
            <button
              key={port.id}
              onClick={() => setSelectedPortId(port.id)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/80 shadow-xs ring-2 ring-indigo-500/20'
                  : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
              }`}
            >
              <p className="text-xs font-bold text-slate-900 truncate mb-1">{port.name.split(' ')[0]}</p>
              <p className="text-[10px] text-slate-500 truncate">{port.standard.split('/')[0]}</p>
            </button>
          );
        })}
      </div>

      {/* Selected Port Card */}
      <div className="p-5 bg-slate-50/80 rounded-xl border border-slate-200">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200">
          <div>
            <h5 className="text-lg font-bold text-slate-900">{activePort.name}</h5>
            <p className="text-xs text-slate-500 font-mono">Estándar: {activePort.standard}</p>
          </div>
          <span className={`px-2.5 py-1 text-xs font-semibold rounded-md border ${activePort.symbolColor}`}>
            {activePort.shape.split('(')[0]}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-4">
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <p className="font-bold text-slate-700 mb-1">Geometría Física</p>
            <p className="text-slate-600">{activePort.shape}</p>
          </div>
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <p className="font-bold text-slate-700 mb-1">Velocidad / Rendimiento</p>
            <p className="text-slate-600 font-mono text-[11px]">{activePort.maxSpeedOrResolution}</p>
          </div>
          <div className="p-3 bg-white rounded-lg border border-slate-200">
            <p className="font-bold text-slate-700 mb-1">Dispositivos Habituales</p>
            <p className="text-slate-600">{activePort.primaryDevices}</p>
          </div>
        </div>

        <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-lg text-xs flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-indigo-700 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-indigo-950">Consejo Didáctico de Conexión:</span>{' '}
            <span className="text-indigo-900">{activePort.practicalTip}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
