import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  // to obtain access to the matchers.
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/jest.setup.ts'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
  moduleNameMapper: {
    uuid: '<rootDir>/src/__mocks__/uuid.ts',
  },
};

export default config;
