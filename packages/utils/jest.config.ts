import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',
  // to obtain access to the matchers.
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  modulePaths: ['<rootDir>'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json',
      },
    ],
  },
};

export default config;
