import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    proxy: {
      '/api/suggest': {
        target: 'http://suggestqueries.google.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/suggest/, '/complete/search'),
      },
    },
  },
});
