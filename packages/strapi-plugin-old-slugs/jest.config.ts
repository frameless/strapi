import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  // to obtain access to the matchers.
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testEnvironment: 'node',
  modulePaths: ['<rootDir>'],
  testPathIgnorePatterns: ['/node_modules/', '.tmp', '.cache'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
};

export default config;
