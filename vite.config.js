import { defineConfig } from 'vite';

export default defineConfig({
  base: '/atlas-triet-hoc/',
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true },
  build: {
    rolldownOptions: {
      onwarn(warning, defaultHandler) {
        // This is a browser-only SPA; RSC directives in client libraries are irrelevant.
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('use client')) return;
        defaultHandler(warning);
      },
    },
  },
});
