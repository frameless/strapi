import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'public/vendor',
    rollupOptions: {
      input: 'src/client/index.tsx',
      output: {
        entryFileNames: 'client.js',
      },
    },
  },
});
