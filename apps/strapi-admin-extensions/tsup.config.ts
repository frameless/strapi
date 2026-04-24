import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'],
  external: ['jsdom'],
  platform: 'node',
  target: 'node18',
  bundle: true,
  sourcemap: true,
  clean: false,
  banner: {
    js: `
      /**
       * Required for CJS deps bundled into ESM (e.g. multer, mime-types, type-is).
       * tsup outputs ESM, but these deps still use require().
       * createRequire bridges ESM → CJS.
       *
       * Can be removed once these dependencies are ESM-native or marked external.
       */
      import { createRequire } from 'module';
      const require = createRequire(import.meta.url);
    `,
  },
});
