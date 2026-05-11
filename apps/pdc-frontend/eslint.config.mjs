import next from 'eslint-config-next';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
/* eslint-disable import/no-unresolved */
import { nextJsConfig } from '@frameless/eslint-config/next-js';

const customConfig = {
  languageOptions: {
    globals: {
      URL: 'readonly',
      process: 'readonly',
      __dirname: 'readonly',
    },
  },
};

export default [
  ...next,
  ...nextCoreWebVitals,
  ...nextTypescript,
  ...nextJsConfig,
  customConfig,
  {
    ignores: ['node_modules/**', '.next/**', 'out/**', 'build/**', 'next-env.d.ts'],
  },
];
