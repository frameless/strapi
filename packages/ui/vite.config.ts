import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({ include: ['src', 'global.d.ts'] })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@frameless/ui',
    },
    rollupOptions: {
      // externalize ALL node_modules — never bundle them into lib output
      external: (id) => !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('\0'),
      output: [
        {
          format: 'es',
          entryFileNames: 'index.esm.js',
          assetFileNames: 'bundle.css',
          dir: 'dist',
        },
        {
          format: 'cjs',
          entryFileNames: 'index.cjs.js',
          assetFileNames: '[name].[ext]',
          dir: 'dist',
        },
      ],
    },
  },
});
