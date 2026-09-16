import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        // Page components are already route-split via React.lazy() in
        // App.jsx (each gets its own chunk automatically) — this just
        // pulls the shared, rarely-changing libraries out of the main
        // entry chunk so a route change doesn't re-download React itself,
        // and browsers cache these two chunks across deploys that don't
        // touch these dependencies.
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
        },
      },
    },
  },
});
