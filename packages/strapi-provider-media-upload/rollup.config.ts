import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { readFileSync } from 'fs';
import { RollupOptions } from 'rollup';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';

const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

const config: RollupOptions = {
  input: 'src/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      exports: 'auto',
    },
    {
      file: packageJson.module,
      format: 'esm',
    },
  ],
  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
    }),
    nodeResolve(),
    commonjs(),
    terser(),
    peerDepsExternal(),
    json(),
  ],
};

export default config;
