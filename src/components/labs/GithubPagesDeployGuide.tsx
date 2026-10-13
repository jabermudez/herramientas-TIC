import React, { useState } from 'react';
import { Github, Globe, Check, Copy, Terminal, ExternalLink, ShieldCheck } from 'lucide-react';

export const GithubPagesDeployGuide: React.FC = () => {
  const [copiedScript, setCopiedScript] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(1);

  const workflowYaml = `name: Desplegar a GitHub Pages

on:
  push:
    branches: [ 'main', 'master' ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  build-and-deploy:
    environment:
      name: github-pages
      url: \${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout código fuente
        uses: actions/checkout@v4

      - name: Configurar Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Instalar dependencias
        run: npm ci || npm install --legacy-peer-deps

      - name: Configurar GitHub Pages
        id: pages
        uses: actions/configure-pages@v4

      - name: Compilar aplicación (Vite Build)
        run: npm run build
        env:
          BASE_URL: \${{ steps.pages.outputs.base_path }}

      - name: Subir artefacto compilado
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Desplegar a GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4`;

  const handleCopyYaml = () => {
    navigator.clipboard.writeText(workflowYaml);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm my-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-200 mb-6">
        <div className="flex items-center gap-2">
          <Github className="w-6 h-6 text-slate-900" />
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Publicación en Internet</span>
            <h4 className="text-xl font-bold text-slate-900">Guía de Despliegue Gratuito en GitHub Pages</h4>
          </div>
        </div>
        <span className="text-xs px-2.5 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded font-medium flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          Configurado con rutas relativas base: './'
        </span>
      </div>

      <p className="text-xs text-slate-600 mb-6 leading-relaxed">
        Este manual está 100% optimizado para compilarse como una aplicación estática y publicarse gratis en GitHub Pages, permitiendo que tanto docentes como alumnos dispongan de su propio sitio web público accesible desde cualquier computadora o celular.
      </p>

      {/* Steps tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
        {[
          { step: 1, title: '1. Repositorio en GitHub' },
          { step: 2, title: '2. Subir el Código' },
          { step: 3, title: '3. Acción Automática' },
          { step: 4, title: '4. Activar Pages' }
        ].map(item => (
          <button
            key={item.step}
            onClick={() => setActiveStep(item.step)}
            className={`p-3 text-left rounded-lg border transition-all text-xs font-semibold ${
              activeStep === item.step
                ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 ring-2 ring-indigo-500/10'
                : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
        {activeStep === 1 && (
          <div className="space-y-3 text-xs text-slate-700">
            <h5 className="text-sm font-bold text-slate-900">Paso 1: Crear tu repositorio gratuito en GitHub</h5>
            <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
              <li>Ingresa a tu cuenta en <a href="https://github.com" target="_blank" rel="noreferrer" className="text-indigo-600 font-semibold hover:underline">github.com</a>.</li>
              <li>Haz clic en el botón verde <strong>"New"</strong> o <strong>"Nuevo repositorio"</strong> en la esquina superior derecha.</li>
              <li>Asigna un nombre al proyecto, por ejemplo: <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono">manual-herramientas-tic</code>.</li>
              <li>Marca la visibilidad como <strong>Public</strong> (Público) para habilitar GitHub Pages sin costo.</li>
              <li>Haz clic en <strong>"Create repository"</strong>.</li>
            </ol>
          </div>
        )}

        {activeStep === 2 && (
          <div className="space-y-3 text-xs text-slate-700">
            <h5 className="text-sm font-bold text-slate-900">Paso 2: Subir el código desde tu computadora</h5>
            <p className="text-slate-600">
              Abre la terminal en la carpeta de este proyecto y ejecuta los siguientes comandos estándar de Git:
            </p>
            <div className="bg-slate-900 text-slate-100 p-3.5 rounded-lg font-mono text-[11px] space-y-1 overflow-x-auto">
              <p className="text-emerald-400"># Inicializar y vincular a tu repositorio remoto</p>
              <p>git init</p>
              <p>git add .</p>
              <p>git commit -m "Versión completa del Manual de Herramientas TIC"</p>
              <p>git branch -M main</p>
              <p>git remote add origin https://github.com/TU_USUARIO/manual-herramientas-tic.git</p>
              <p>git push -u origin main</p>
            </div>
            <p className="text-[11px] text-slate-500 italic">
              * Recuerda sustituir TU_USUARIO por tu nombre de usuario real en GitHub.
            </p>
          </div>
        )}

        {activeStep === 3 && (
          <div className="space-y-3 text-xs text-slate-700">
            <div className="flex items-center justify-between">
              <h5 className="text-sm font-bold text-slate-900">Paso 3: Automatizar la publicación con GitHub Actions</h5>
              <button
                onClick={handleCopyYaml}
                className="flex items-center gap-1 px-3 py-1 bg-white border border-slate-300 hover:bg-slate-100 rounded text-xs font-medium text-slate-800 transition-colors"
              >
                {copiedScript ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedScript ? '¡Copiado!' : 'Copiar Archivo Workflow'}
              </button>
            </div>
            <p className="text-slate-600">
              Crea un archivo en la ruta <code className="bg-white px-1.5 py-0.5 rounded border border-slate-300 font-mono">.github/workflows/deploy.yml</code> y pega el siguiente código:
            </p>
            <div className="bg-slate-900 text-slate-100 p-3 rounded-lg font-mono text-[11px] max-h-56 overflow-y-auto leading-relaxed">
              <pre>{workflowYaml}</pre>
            </div>
          </div>
        )}

        {activeStep === 4 && (
          <div className="space-y-3 text-xs text-slate-700">
            <h5 className="text-sm font-bold text-slate-900">Paso 4: Activar GitHub Pages en los Ajustes del Repositorio</h5>
            <ol className="list-decimal pl-5 space-y-2 leading-relaxed">
              <li>En la página de tu repositorio en GitHub, haz clic en la pestaña <strong>Settings (Configuración)</strong>.</li>
              <li>En el menú lateral izquierdo, haz clic en <strong>Pages</strong>.</li>
              <li>En la sección <strong>"Build and deployment" &gt; Source</strong>, selecciona: <strong>"GitHub Actions"</strong>.</li>
              <li>En 2 minutos, la pestaña <strong>Actions</strong> compilará automáticamente el proyecto y te entregará tu enlace público:</li>
            </ol>
            <div className="mt-3 p-3 bg-emerald-100/70 border border-emerald-300 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-emerald-800" />
                <span className="font-mono text-xs text-emerald-900 font-bold">
                  https://tu-usuario.github.io/manual-herramientas-tic/
                </span>
              </div>
              <span className="text-[11px] text-emerald-800 font-medium">¡Listo para compartir en clase!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
