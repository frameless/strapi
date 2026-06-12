import { createConfig } from '@frameless/eslint-config/base';
const myAdditionalIgnores = [
  '**/.docusaurus/**',
  '**/editoria11y/lib/**',
  'apps/pdc-frontend/public/flo-client-plugin-polyfills.js',
  'apps/pdc-frontend/public/flo-client-plugin.js',
  'apps/pdc-frontend/gql/**',
  'apps/vth-frontend/gql/**',
  'apps/pdc-sc/src/gql/**',
  '**/loader/**',
  '**/www/**',
];

const customConfig = {
  languageOptions: {
    globals: {
      URL: 'readonly',
      process: 'readonly',
      __dirname: 'readonly',
    },
  },
};

const extendedConfig = createConfig(myAdditionalIgnores);

export default [...extendedConfig, customConfig];
