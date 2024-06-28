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
      extends: ['plugin:react/recommended', 'eslint-config-prettier', './.eslintrc.js.json', './.eslintrc.react.json'],
      files: ['*.js', '*.jsx'],
      plugins: ['import', 'jest', 'prettier'],
      rules: {
        'prettier/prettier': 'error',
      },
    },
    {
      extends: ['plugin:react/recommended', 'eslint-config-prettier', './.eslintrc.js.json', './.eslintrc.react.json'],
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'import', 'jest', 'prettier'],
      rules: {
        'prettier/prettier': 'error',
      },
    },
    {
      extends: ['plugin:react/recommended', 'eslint-config-prettier', './.eslintrc.js.json', './.eslintrc.react.json'],
      files: ['*.ts', '*.tsx'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: [
          './apps/kennisbank-dashboard/src/admin/tsconfig.json',
          './apps/kennisbank-dashboard/tsconfig.json',
          './apps/kennisbank-frontend/tsconfig.json',
          './apps/pdc-dashboard/src/admin/tsconfig.json',
          './apps/pdc-dashboard/tsconfig.json',
          './apps/pdc-frontend/tsconfig.json',
          './apps/pdc-sc/tsconfig.json',
          './apps/vth-dashboard/src/admin/tsconfig.json',
          './apps/vth-dashboard/tsconfig.json',
          './apps/vth-frontend/tsconfig.json',
          './packages/catalogi-data/tsconfig.json',
          './packages/provider-upload-vercel/tsconfig.json',
          './packages/samenwerkende-catalogi/tsconfig.json',
          './packages/strapi-plugin-env-label/tsconfig.json',
          './packages/strapi-plugin-env-label/tsconfig.server.json',
          './packages/strapi-plugin-language/tsconfig.json',
          './packages/strapi-plugin-language/tsconfig.server.json',
          './packages/strapi-plugin-open-forms-embed/tsconfig.json',
          './packages/strapi-plugin-open-forms-embed/tsconfig.server.json',
          './packages/strapi-plugin-uniform-product-name/tsconfig.json',
          './packages/strapi-plugin-uniform-product-name/tsconfig.server.json',
          './packages/strapi-plugin-uuid-field/tsconfig.json',
          './packages/strapi-plugin-uuid-field/tsconfig.server.json',
          './packages/strapi-tiptap-editor/tsconfig.json',
          './packages/strapi-tiptap-editor/tsconfig.server.json',
          './packages/ui/tsconfig.json',
          './packages/ui/tsconfig.test.json',
          './packages/upl/tsconfig.json',
        ],
        tsconfigRootDir: __dirname,
      },
      plugins: ['@typescript-eslint', 'import', 'prettier'],
      rules: {
        'prettier/prettier': 'error',
      },
    },
  ],
};
