import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { readFileSync } from 'fs';
import path, { dirname } from 'node:path';
import { RollupOptions } from 'rollup';
import copy from 'rollup-plugin-copy';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import scss from 'rollup-plugin-scss';
import { terser } from 'rollup-plugin-terser';
import typescript from 'rollup-plugin-typescript2';
import { fileURLToPath } from 'url';
const packageJson = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const outputGlobals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};

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
    scss({
      // Specify the output file where the bundled CSS will be written
      output: 'dist/bundle.css',
      fileName: 'bundle.css',
      // To support @import statements in SCSS files
      include: [/\.scss$/],
      includePaths: [path.resolve(__dirname, '../../node_modules/')],
    }),
    postcss({
      // Include any PostCSS plugins and their configurations here
      plugins: [require('autoprefixer')],
      extract: 'dist/bundle.css', // Specify the output CSS file
      minimize: true, // Minify the CSS
      modules: true,
      autoModules: true,
      use: ['sass'],
    }),
    json(),
  ],
  external: ['react', 'react-dom'],
};

export default config;
