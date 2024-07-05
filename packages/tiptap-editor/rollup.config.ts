import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { readFileSync } from 'fs';
import path from 'path';
import { dirname } from 'path';
import autoExternal from 'rollup-plugin-auto-external';
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import scss from 'rollup-plugin-scss';
import sourcemaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const outputGlobals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

export const config = {
  external: [/@tiptap\/pm\/.*/, 'react', 'react-dom'],
  input: 'src/index.tsx',
  output: [
    {
      file: packageJson.main,
      format: 'cjs', // CommonJS format
      exports: 'auto', // Automatic exports for CommonJS
      sourcemap: 'inline',
      globals: outputGlobals, // Global variables exposed to the browser
    },
    {
      file: packageJson.module,
      format: 'esm', // ES Module format
      sourcemap: 'inline',
      globals: outputGlobals, // Global variables exposed to the browser
    },
  ],
  plugins: [
    autoExternal({
      packagePath: './package.json',
    }),
    sourcemaps(),
    nodeResolve(),
    resolve(),
    commonjs(),
    peerDepsExternal(),
    typescript({ tsconfig: './tsconfig.json' }),
    scss({
      // Specify the output file where the bundled CSS will be written
      output: 'dist/tiptap.css',
      fileName: 'tiptap.css',
      includePaths: [path.resolve(__dirname, '../../node_modules')],
    }),
    postcss({
      // Include any PostCSS plugins and their configurations here
      plugins: [require('autoprefixer')],
      extract: true,
      minimize: true, // Minify the CSS
      modules: true,
      autoModules: true,
      use: ['sass'],
    }),
    json(),
    copy({
      targets: [{ src: 'src/i18n/locales/*', dest: 'dist/locales' }],
    }),
  ],
};

export default config;
