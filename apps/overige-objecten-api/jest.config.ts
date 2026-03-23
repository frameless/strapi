import type { Config } from 'jest';
import { createDefaultEsmPreset } from 'ts-jest';

const esModules = ['@utrecht\\+component-library-react', '@utrecht\\+components-core'].join('|');

const normalModules = esModules.replace(/\\\+/g, '/');

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
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node', 'mjs'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest.setup.ts'],
  modulePaths: ['<rootDir>/node_modules', '<rootDir>/../../node_modules'],
  moduleDirectories: ['node_modules', '../../node_modules'],
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src'],
  transformIgnorePatterns: [`/node_modules/.pnpm/(?!(${esModules})@)`, `/node_modules/(?!(\\.pnpm|${normalModules}))`],
  moduleNameMapper: {
    '^@utrecht/(.*)$': '<rootDir>/../../node_modules/@utrecht/$1',
    uuid: '<rootDir>/src/__mocks__/uuid.ts',
  },
};
export default config;
