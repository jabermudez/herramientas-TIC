import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, Eye, CheckCircle2, HelpCircle, ArrowRight, ShieldCheck, Mail, Smartphone } from 'lucide-react';

interface PhishingScenario {
  id: string;
  type: 'email' | 'sms';
  senderVisible: string;
  senderReal: string;
  subjectOrPreview: string;
  date: string;
  bodyHtml: string;
  buttonLabel: string;
  buttonRealUrl: string;
  urgencyTrap: string;
  verdict: string;
  safeAction: string;
}

const SCENARIOS: PhishingScenario[] = [
  {
    id: 'banco',
    type: 'email',
    senderVisible: 'Seguridad Banco Nacional <notificaciones@banco-oficial-seguro.com>',
    senderReal: 'alerta-banco-nacional@servidor-desconocido-xyz77.ru',
    subjectOrPreview: '¡URGENTE! Su cuenta bancaria ha sido bloqueada temporalmente por actividad inusual',
    date: 'Hoy, 09:14 AM',
    bodyHtml: `Estimado(a) cliente:<br/><br/>
    Hemos detectado un intento de inicio de sesión no reconocido desde una dirección IP extranjera. Por razones de estricta seguridad, <strong>sus fondos han sido congelados temporalmente</strong>.<br/><br/>
    Dispone de <strong>menos de 2 horas</strong> para confirmar su identidad; de lo contrario, su cuenta será cancelada definitivamente y transferida al departamento legal.`,
    buttonLabel: 'Desbloquear y Confirmar Mi Cuenta Ahora',
    buttonRealUrl: 'http://banco-nacional.verificacion-cuentas-urgente.net/login.php',
    urgencyTrap: 'Inculca pánico ("fondos congelados", "menos de 2 horas", "departamento legal") para anular el pensamiento reflexivo del usuario.',
    verdict: 'Ataque de Phishing bancario clásico con falsificación de remitente y suplantación de portal.',
    safeAction: 'Nunca hacer clic. Cerrar el correo, abrir el navegador e ingresar escribiendo manualmente el portal oficial del banco o llamar a la línea telefónica que figura al dorso de la tarjeta física.'
  },
  {
    id: 'paquete',
    type: 'sms',
    senderVisible: '+34 612 998 123 (Servicio Postal Express)',
    senderReal: 'Número desconocido no corporativo',
    subjectOrPreview: 'SMS Entrante',
    date: 'Hoy, 14:22 PM',
    bodyHtml: `[ServicioPostal] Su paquete con código #ES-98442 no pudo ser entregado debido a una tarifa de aduana impagada de $1.85 USD. Su paquete será destruido en 24h si no abona la tasa en el siguiente enlace:`,
    buttonLabel: 'http://rastreo-postal-pago-urgente.online/tarifa',
    buttonRealUrl: 'http://rastreo-postal-pago-urgente.online/tarifa (Sitio con formulario para robar número de tarjeta de crédito)',
    urgencyTrap: 'Cantidad pequeña de dinero ($1.85) para que parezca inofensiva y no genere sospechas inmediatas.',
    verdict: 'Ataque de Smishing (Phishing vía SMS) enfocado en recolectar números de tarjetas de crédito y códigos CVV.',
    safeAction: 'Bloquear y reportar como spam el número de teléfono. Si esperas un paquete, verificar el número de guía únicamente en la app o web oficial de la empresa de envíos.'
  },
  {
    id: 'whatsapp-soporte',
    type: 'email',
    senderVisible: 'WhatsApp Security Support <soporte@meta-verificacion.io>',
    senderReal: 'contacto-meta@hosting-gratuito-phish.biz',
    subjectOrPreview: 'Verificación requerida: Su cuenta de WhatsApp será suspendida',
    date: 'Ayer, 21:05 PM',
    bodyHtml: `Hola usuario de WhatsApp.<br/><br/>
    Hemos recibido múltiples reportes de infracción de términos de servicio asociados a su número telefónico. Para conservar su cuenta y lista de contactos, por favor ingrese al portal y reenvíe el código de 6 dígitos que acaba de recibir en su teléfono.`,
    buttonLabel: 'Verificar Número y Código de 6 Dígitos',
    buttonRealUrl: 'http://soporte-whatsapp-robocuentas.xyz/robar-sesion',
    urgencyTrap: 'Amenaza de perder la cuenta de WhatsApp para que entregues voluntariamente el código SMS de inicio de sesión multidispositivo.',
    verdict: 'Intento de secuestro de cuenta de WhatsApp para estafar posteriormente a tus contactos y familiares.',
    safeAction: 'NUNCA compartir códigos de 6 dígitos que lleguen por SMS con nadie, ni siquiera con supuestos operadores de soporte. Meta y WhatsApp jamás te pedirán tu código de verificación.'
  }
];

export const PhishingInspector: React.FC = () => {
  const [activeScenarioId, setActiveScenarioId] = useState<string>('banco');
  const [inspectedElements, setInspectedElements] = useState<{
    sender: boolean;
    link: boolean;
    urgency: boolean;
  }>({ sender: false, link: false, urgency: false });

  const activeScenario = SCENARIOS.find(s => s.id === activeScenarioId) || SCENARIOS[0];

  const handleToggleInspect = (element: 'sender' | 'link' | 'urgency') => {
    setInspectedElements(prev => ({ ...prev, [element]: !prev[element] }));
  };

  const handleSelectScenario = (id: string) => {
    setActiveScenarioId(id);
    setInspectedElements({ sender: false, link: false, urgency: false });
  };

  const allInspected = inspectedElements.sender && inspectedElements.link && inspectedElements.urgency;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-rose-50 rounded-lg text-rose-600">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-rose-600">Laboratorio Didáctico de Ciberseguridad</span>
            <h4 className="text-xl font-bold text-slate-900">Detector Interactivo de Phishing e Ingeniería Social</h4>
          </div>
        </div>

        {/* Scenario Picker */}
        <div className="flex gap-1.5 p-1 bg-slate-100 rounded-lg">
          {SCENARIOS.map(sc => (
            <button
              key={sc.id}
              onClick={() => handleSelectScenario(sc.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                activeScenarioId === sc.id
                  ? 'bg-white text-slate-900 font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {sc.id === 'banco' && 'Caso 1: Falso Banco'}
              {sc.id === 'paquete' && 'Caso 2: Falsa Encomienda'}
              {sc.id === 'whatsapp-soporte' && 'Caso 3: Falso Soporte'}
            </button>
          ))}
        </div>
      </div>

      <p className="text-xs text-slate-600 mb-4">
        Haz clic en las lupas de inspección para desenmascarar las trampas ocultas detrás de este mensaje aparentemente legítimo:
      </p>

      {/* Simulated Email / SMS UI */}
      <div className="border-2 border-slate-300 rounded-xl overflow-hidden bg-slate-50 mb-5 shadow-inner">
        {/* Email Header */}
        <div className="bg-white p-4 border-b border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-medium">
              <Mail className="w-4 h-4 text-slate-400" />
              <span className="text-slate-500">De:</span>
              <span className="font-semibold text-slate-800">{activeScenario.senderVisible}</span>
            </div>
            <button
              onClick={() => handleToggleInspect('sender')}
              className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                inspectedElements.sender ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              {inspectedElements.sender ? 'Ocultar Análisis' : 'Inspeccionar Remitente Real'}
            </button>
          </div>

          {inspectedElements.sender && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded text-rose-900 animate-fadeIn text-[11px]">
              <strong>⚠️ Remitente real descubierto en los encabezados técnicos:</strong>{' '}
              <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-rose-300 font-bold">
                {activeScenario.senderReal}
              </code>
              <p className="mt-0.5 text-rose-800">
                El nombre visible es una máscara. El correo proviene de un servidor extranjero sin relación con la entidad.
              </p>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <p className="font-bold text-slate-900">{activeScenario.subjectOrPreview}</p>
            <span className="text-[10px] text-slate-400">{activeScenario.date}</span>
          </div>
        </div>

        {/* Message Body */}
        <div className="p-6 bg-white text-xs text-slate-800 leading-relaxed">
          <div
            dangerouslySetInnerHTML={{ __html: activeScenario.bodyHtml }}
            className="mb-5"
          />

          <div className="flex flex-col sm:flex-row items-center gap-3 my-4">
            <div className="relative">
              <span className="inline-block px-5 py-2.5 bg-rose-600 text-white font-bold rounded-lg text-xs shadow-xs cursor-not-allowed opacity-90">
                {activeScenario.buttonLabel}
              </span>
            </div>

            <button
              onClick={() => handleToggleInspect('link')}
              className={`px-3 py-1.5 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                inspectedElements.link ? 'bg-rose-100 text-rose-800 border border-rose-300' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              {inspectedElements.link ? 'Ocultar Enlace Oculto' : 'Inspeccionar Destino del Enlace'}
            </button>

            <button
              onClick={() => handleToggleInspect('urgency')}
              className={`px-3 py-1.5 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                inspectedElements.urgency ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              {inspectedElements.urgency ? 'Ocultar Análisis Psicológico' : 'Analizar Trampa de Urgencia'}
            </button>
          </div>

          {inspectedElements.link && (
            <div className="my-3 p-3 bg-rose-50 border border-rose-300 rounded-lg text-rose-900 animate-fadeIn text-[11px]">
              <strong>🔗 Dirección web real detrás del botón (URL no oficial):</strong>
              <div className="mt-1 font-mono bg-white p-2 rounded border border-rose-300 text-rose-700 break-all font-semibold">
                {activeScenario.buttonRealUrl}
              </div>
              <p className="mt-1 text-slate-700">
                El dominio no pertenece a la entidad oficial. Es un clon diseñado para registrar tus credenciales en una base de datos clandestina.
              </p>
            </div>
          )}

          {inspectedElements.urgency && (
            <div className="my-3 p-3 bg-amber-50 border border-amber-300 rounded-lg text-amber-950 animate-fadeIn text-[11px]">
              <strong>⏳ Trampa de manipulación psicológica:</strong>
              <p className="mt-1 text-amber-900">{activeScenario.urgencyTrap}</p>
            </div>
          )}
        </div>
      </div>

      {/* Forensic Verdict Box */}
      <div className={`p-4 rounded-xl border transition-all ${allInspected ? 'bg-emerald-50 border-emerald-300' : 'bg-slate-50 border-slate-200'}`}>
        <div className="flex items-start gap-2.5">
          {allInspected ? (
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          )}
          <div className="text-xs">
            <h5 className={`font-bold ${allInspected ? 'text-emerald-950' : 'text-slate-900'} mb-1`}>
              {allInspected ? '¡Auditoría Completa Realizada!' : 'Diagnóstico de Seguridad en Progreso:'}
            </h5>
            <p className="text-slate-700 mb-2">
              <strong>Veredicto:</strong> {activeScenario.verdict}
            </p>
            <p className="text-slate-700">
              <strong>Conducta segura recomendada:</strong> {activeScenario.safeAction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
