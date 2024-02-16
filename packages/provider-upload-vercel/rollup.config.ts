import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { readFileSync } from 'fs';
import { RollupOptions } from 'rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

const config: RollupOptions = {
  input: 'src/index.ts', // Entry point to your library
  output: [
    {
      file: packageJson.main,
      format: 'cjs', // CommonJS format
      exports: 'auto', // Automatic exports for CommonJS
    },
    {
      file: packageJson.module,
      format: 'esm', // ES Module format
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
    json(),
  ],
  external: ['@vercel/blob'],
};

export default config;
