import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  // Support GitHub Actions environment variable or explicit BASE_URL
  const ghRepo = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
  const isUserPage = ghRepo.endsWith('.github.io');
  const ghBase = ghRepo && !isUserPage ? `/${ghRepo}/` : '/';
  const base = process.env.BASE_PATH || process.env.BASE_URL || (process.env.GITHUB_ACTIONS && ghRepo ? ghBase : './');

  return {
    base,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname ?? '.', '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
