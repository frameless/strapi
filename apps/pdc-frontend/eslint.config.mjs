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

export default [...nextJsConfig, customConfig];
