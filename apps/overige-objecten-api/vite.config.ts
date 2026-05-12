import path from 'node:path';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  resolve: {
    dedupe: ['react', 'react-dom'],
  },
  build: {
    outDir: 'public/vendor',
    rollupOptions: {
      input: 'src/client/index.tsx',
      output: {
        entryFileNames: 'client.js',
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/tests/vitest.setup.ts'],
    pool: 'forks',
    testTimeout: 30000,
    teardownTimeout: 10000,
    alias: {
      uuid: path.resolve(__dirname, './src/__mocks__/uuid.ts'),
      '@frameless/ui': path.resolve(__dirname, '../../packages/ui/src'),
      '@frameless/utils': path.resolve(__dirname, '../../packages/utils/src'),
    },
    server: {
      deps: {
        inline: [
          '@utrecht/component-library-react',
          '@utrecht/web-component-library-react',
          '@frameless/ui',
          '@frameless/utils',
        ],
      },
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
});
