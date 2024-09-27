import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { readFileSync } from 'node:fs';
import { RollupOptions } from 'rollup';
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
export const outputGlobals = {};

const config: RollupOptions = {
  input: 'src/index.ts', // Entry point to your library
  output: [
    {
      file: packageJson.main,
      format: 'cjs', // CommonJS format
      exports: 'auto', // Automatic exports for CommonJS
      globals: outputGlobals, // Global variables exposed to the browser
    },
    {
      file: packageJson.module,
      format: 'esm', // ES Module format
      globals: outputGlobals,
    },
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
    }),
    nodeResolve(),
    commonjs(),
    terser(), // Minify the output
    peerDepsExternal(), // Treat peer dependencies as externals
    copy({
      targets: [{ src: 'src/types/*.d.ts', dest: 'dist/types' }], // Copy type declarations to the dist folder
    }),
    json(),
  ],
};

export default config;
