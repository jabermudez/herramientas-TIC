import React, { useState } from 'react';
import { MessageSquare, Copy, Check, Bold, Italic, Strikethrough, Code, List, Quote, Users, Send } from 'lucide-react';

export const WhatsAppFormatTester: React.FC = () => {
  const [inputText, setInputText] = useState<string>(
    '*Estimados estudiantes:*\nRecuerden que la entrega del _Taller de TIC_ es este ~viernes~ *lunes* a las 23:59.\n\nRequisitos:\n- Documento en formato PDF\n- Fórmulas de Excel comprobadas\n\n> "La tecnología es mejor cuando une a la gente."\n\nCódigo de aula: ```TIC-2026-A```'
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'formato' | 'difusion' | 'privacidad'>('formato');

  const insertFormat = (prefix: string, suffix: string = prefix) => {
    setInputText(prev => prev + ` ${prefix}texto${suffix} `);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(inputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Parse custom WhatsApp syntax for the preview bubble
  const renderFormattedPreview = (raw: string) => {
    const lines = raw.split('\n');
    return lines.map((line, idx) => {
      let isQuote = false;
      let displayLine = line;

      if (displayLine.startsWith('> ')) {
        isQuote = true;
        displayLine = displayLine.substring(2);
      }

      const isBullet = displayLine.startsWith('- ') || displayLine.startsWith('• ');
      if (isBullet) {
        displayLine = displayLine.replace(/^[-•]\s*/, '• ');
      }

      // Format bold *text*
      let html = displayLine.replace(/\*([^*]+)\*/g, '<strong>$1</strong>');
      // Format italic _text_
      html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
      // Format strikethrough ~text~
      html = html.replace(/~([^~]+)~/g, '<del class="opacity-75">$1</del>');
      // Format monospace ```text```
      html = html.replace(/```([^`]+)```/g, '<code class="bg-black/10 px-1 py-0.5 rounded font-mono text-xs">$1</code>');

      if (isQuote) {
        return (
          <div key={idx} className="pl-3 border-l-2 border-emerald-700 text-slate-800 italic my-1">
            <span dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        );
      }

      return (
        <div key={idx} className={`${isBullet ? 'pl-2' : ''} min-h-[1.2em]`}>
          <span dangerouslySetInnerHTML={{ __html: html || '&nbsp;' }} />
        </div>
      );
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm my-6 transition-colors">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800 mb-5">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Taller Práctico de Comunicación</span>
          <h4 className="text-xl font-bold text-slate-900 dark:text-white">Laboratorio de Trucos y Formato en WhatsApp</h4>
        </div>
        <div className="flex gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl">
          <button
            onClick={() => setActiveTab('formato')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'formato' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Formateador en Vivo
          </button>
          <button
            onClick={() => setActiveTab('difusion')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'difusion' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Grupos vs. Difusión
          </button>
          <button
            onClick={() => setActiveTab('privacidad')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeTab === 'privacidad' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold' : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Privacidad & Web
          </button>
        </div>
      </div>

      {activeTab === 'formato' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Column */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Editor con Sintaxis Nativa:</label>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => insertFormat('*', '*')}
                  title="Negrita (*palabra*)"
                  className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs flex items-center gap-0.5 cursor-pointer"
                >
                  <Bold className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat('_', '_')}
                  title="Cursiva (_palabra_)"
                  className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs cursor-pointer"
                >
                  <Italic className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat('~', '~')}
                  title="Tachado (~palabra~)"
                  className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs cursor-pointer"
                >
                  <Strikethrough className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat('```', '```')}
                  title="Monoespaciado (```codigo```)"
                  className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs cursor-pointer"
                >
                  <Code className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat('\n- ', '')}
                  title="Viñeta (- item)"
                  className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs cursor-pointer"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => insertFormat('\n> ', '')}
                  title="Cita (> texto)"
                  className="p-1.5 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 text-xs cursor-pointer"
                >
                  <Quote className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={8}
              className="w-full p-3 font-mono text-xs border border-slate-300 dark:border-slate-700 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 leading-relaxed bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white"
              placeholder="Escribe aquí tu mensaje usando *negrita*, _cursiva_, ~tachado~..."
            />

            <div className="flex items-center justify-between mt-3">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Usa caracteres especiales para dar formato rápido.</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-emerald-800 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-950/70 hover:bg-emerald-200 dark:hover:bg-emerald-900 rounded-lg transition-colors cursor-pointer border border-emerald-300 dark:border-emerald-800"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? '¡Copiado!' : 'Copiar para WhatsApp'}
              </button>
            </div>
          </div>

          {/* WhatsApp Preview Column */}
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">Previsualización Exacta en Burbuja de WhatsApp:</span>
            <div className="flex-1 bg-[#EFEAE2] dark:bg-slate-950 p-4 rounded-2xl border border-slate-300 dark:border-slate-800 shadow-inner flex flex-col justify-end min-h-[220px]">
              <div className="self-end max-w-[90%] bg-[#D9FDD3] dark:bg-[#005c4b] text-slate-900 dark:text-white p-3 rounded-xl rounded-tr-none shadow-xs text-xs relative">
                <div className="space-y-1 mb-1 leading-relaxed">
                  {renderFormattedPreview(inputText)}
                </div>
                <div className="flex items-center justify-end gap-1 text-[10px] text-slate-500 dark:text-slate-300 mt-1">
                  <span>10:42</span>
                  <span className="text-[#53BDEB] font-bold">✓✓</span>
                </div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 text-center">
              Así es como tus alumnos o colegas verán el mensaje formateado en sus pantallas de WhatsApp.
            </p>
          </div>
        </div>
      )}

      {activeTab === 'difusion' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-850/80 border border-slate-200 dark:border-slate-800 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <h5 className="font-bold text-slate-900 dark:text-white text-sm">Grupo de WhatsApp</h5>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
              Espacio comunitario donde todos los miembros ven la lista completa de integrantes y pueden escribir (salvo que sea configurado como solo administradores).
            </p>
            <div className="space-y-1.5 text-xs">
              <p className="text-emerald-700 dark:text-emerald-400 font-medium">✓ Cuándo usarlo: Proyectos de equipo, debates de aula, coordinación colaborativa.</p>
              <p className="text-rose-700 dark:text-rose-400 font-medium">✕ Riesgos: Pérdida de privacidad (cualquiera ve los teléfonos ajenos) y saturación con cientos de mensajes.</p>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Send className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
              <h5 className="font-bold text-emerald-950 dark:text-emerald-200 text-sm">Lista de Difusión (Recomendado para Docentes)</h5>
            </div>
            <p className="text-xs text-emerald-900 dark:text-emerald-200/90 mb-3 leading-relaxed">
              Envías un mismo comunicado a hasta 256 personas simultáneamente. A cada receptor le llega como un mensaje privado 1 a 1 de tu parte.
            </p>
            <div className="space-y-1.5 text-xs">
              <p className="text-emerald-800 dark:text-emerald-300 font-medium">✓ Ventaja total: Los destinatarios NO ven quién más recibió el mensaje ni conocen sus números telefónicos.</p>
              <p className="text-slate-700 dark:text-slate-300 font-medium">ℹ Condición clave: El contacto debe tener guardado tu número telefónico en su agenda para recibir la difusión.</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'privacidad' && (
        <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <h6 className="font-bold text-slate-900 dark:text-white mb-1">1. WhatsApp Web Multidispositivo sin Conexión Móvil</h6>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Ve a web.whatsapp.com en tu navegador de PC. En tu celular entra a Ajustes &gt; Dispositivos vinculados y escanea el código QR. Tu PC queda autorizada de forma independiente por hasta 14 días sin requerir que el móvil esté encendido o conectado a Internet.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <h6 className="font-bold text-slate-900 dark:text-white mb-1">2. Mensajes Temporales (24h / 7 días / 90 días)</h6>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              En cualquier chat presiona el nombre del contacto &gt; Mensajes temporales &gt; Elige la duración. Es la mejor forma de no saturar la memoria del teléfono con avisos de clases o archivos efímeros.
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800">
            <h6 className="font-bold text-slate-900 dark:text-white mb-1">3. Bloqueo con Huella y Silenciar Llamadas de Desconocidos</h6>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              En Ajustes &gt; Privacidad &gt; Llamadas, activa "Silenciar llamadas de números desconocidos" para evitar llamadas de spam y estafas telefónicas automáticas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
