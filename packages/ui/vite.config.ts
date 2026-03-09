import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [react(), dts({ include: ['src'] })],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@frameless/ui',
      fileName: (format: string) => `index.${format === 'es' ? 'esm' : 'cjs'}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].esm.js',
          assetFileNames: 'bundle.css',
          dir: 'dist',
        },
        {
          format: 'cjs',
          entryFileNames: '[name].cjs.js',
          assetFileNames: '[name].[ext]',
          dir: 'dist',
        },
      ],
    },
  },
});
