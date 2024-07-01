// import commonjs from '@rollup/plugin-commonjs';
// import json from '@rollup/plugin-json';
// import { nodeResolve } from '@rollup/plugin-node-resolve';
// import { readFileSync } from 'fs';
// import { RollupOptions } from 'rollup';
// import copy from 'rollup-plugin-copy';
// import peerDepsExternal from 'rollup-plugin-peer-deps-external';
// import postcss from 'rollup-plugin-postcss';
// import scss from 'rollup-plugin-scss';
// import { terser } from 'rollup-plugin-terser';

import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import { readFileSync } from 'fs';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';

const pkg = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

export const config = {
  external: [/@tiptap\/pm\/.*/],
  input: 'src/index.ts',
  output: [
    {
      name: pkg.name,
      file: pkg.umd,
      format: 'umd',
      sourcemap: true,
    },
    {
      name: pkg.name,
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      exports: 'auto',
    },
    {
      name: pkg.name,
      file: pkg.module,
      format: 'es',
      sourcemap: true,
    },
  ],
  plugins: [
    sourcemaps(),
    resolve(),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: '../node_modules/**',
    }),
    typescript({ tsconfig: './tsconfig.json' }),
    json(),
  ],
};

export default config;
