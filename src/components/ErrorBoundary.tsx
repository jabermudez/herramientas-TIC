import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Manual TIC:', error, errorInfo);
  }

  private handleReset = () => {
    try {
      localStorage.removeItem('manual_tic_completed_units');
    } catch {
      // ignore
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 max-w-lg w-full p-6 text-center">
            <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-7 h-7" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              Se ha producido un error al cargar el Manual
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              Ocurrió un problema inesperado en el navegador. Puedes reiniciar la aplicación o limpiar los datos temporales guardados.
            </p>
            {this.state.error && (
              <pre className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 p-3 rounded-lg text-xs text-left overflow-auto max-h-32 mb-5 font-mono">
                {this.state.error.message}
              </pre>
            )}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Recargar página
              </button>
              <button
                onClick={this.handleReset}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-xl text-sm font-semibold transition-colors"
              >
                <Home className="w-4 h-4" />
                Restablecer y recargar
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
