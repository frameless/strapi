import { config } from '@frameless/eslint-config/base';

const customConfig = {
  languageOptions: {
    globals: {
      URL: 'readonly',
      process: 'readonly',
      __dirname: 'readonly',
      URLSearchParams: 'readonly',
    },
  },
};
export default [...config, customConfig];
