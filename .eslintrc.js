/* eslint-env node */

module.exports = {
  globals: {
    process: true,
  },
  env: {
    browser: true,
    es6: true,
    node: false,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      extends: ['plugin:json/recommended'],
      files: ['*.json'],
    },
    {
      extends: [
        'plugin:react/recommended',
        'eslint-config-prettier',
        '@strapi-community',
        './.eslintrc.js.json',
        './.eslintrc.react.json',
      ],
      files: ['*.js', '*.jsx'],
      plugins: ['import', 'jest'],
    },
    {
      extends: ['plugin:react/recommended', 'eslint-config-prettier', './.eslintrc.js.json', './.eslintrc.react.json'],
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'import', 'jest'],
    },
    {
      extends: ['plugin:react/recommended', 'eslint-config-prettier', './.eslintrc.js.json'],
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: [
          './apps/pdc-frontend/tsconfig.json',
          './apps/pdc-dashboard/tsconfig.json',
          './apps/pdc-dashboard/src/admin/tsconfig.json',
          './packages/catalogi-data/tsconfig.json',
          './packages/upl/tsconfig.json',
          './packages/samenwerkende-catalogi/tsconfig.json',
          './packages/strapi-plugin-uniform-product-name/tsconfig.json',
          './packages/strapi-plugin-uniform-product-name/tsconfig.server.json',
          './packages/strapi-tiptap-editor/tsconfig.json',
          './packages/strapi-tiptap-editor/tsconfig.server.json',
        ],
        tsconfigRootDir: __dirname,
      },
      plugins: ['@typescript-eslint', 'import'],
    },
  ],
};
