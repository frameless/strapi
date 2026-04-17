import { reactConfig } from '@frameless/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...reactConfig,

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'no-undef': 'off',
    },
  },
];
