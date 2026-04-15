import type { Config } from 'jest';
import { createDefaultEsmPreset } from 'ts-jest';

const presetConfig = createDefaultEsmPreset({
  tsconfig: {
    jsx: 'react-jsx',
    module: 'ES2022',
    target: 'ESNext',
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
  },
});

const config: Config = {
  ...presetConfig,
  displayName: '@frameless/ui',
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',

  // Setup files to run before tests
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],

  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^@utrecht/web-component-library-react$': '<rootDir>/tests/__mocks__/@utrecht/web-component-library-react.mjs',
    '^tabbable$': '<rootDir>/tests/__mocks__/tabbable.cjs',
  },

  transformIgnorePatterns: [
    '/node_modules/.pnpm/(?!(' +
      '@utrecht\\+' +
      '|react-markdown' +
      '|clsx' +
      '|lodash\\.chunk' +
      '|focus-trap' +
      '|focus-trap-react' +
      '|@babel\\+runtime' +
      ')/)',
    '/node_modules/(?!\\.pnpm|' +
      '@utrecht' +
      '|react-markdown' +
      '|clsx' +
      '|focus-trap' +
      '|lodash\\.chunk' +
      '|focus-trap-react' +
      '|@babel/runtime' +
      ')/',
  ],

  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'mjs', 'node'],

  modulePaths: ['<rootDir>/node_modules', '<rootDir>/../../node_modules'],
};

export default config;
