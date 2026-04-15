import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  outDir: 'dist',
  format: ['esm'],
  platform: 'node',
  target: 'node18',
  sourcemap: true,
  clean: false,
  splitting: false,
  external: ['@frameless/ui', 'react', 'react-dom', 'react-markdown', 'jsdom', 'path', 'fs', 'lodash.kebabcase'],
});
