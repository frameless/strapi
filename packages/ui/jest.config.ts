import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest();

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
const esModules = ['react-markdown'].join('|');

// work around https://github.com/vercel/next.js/issues/35634
async function hackJestConfig() {
  // createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
  const nextJestConfig = await createJestConfig(config)();
  // /node_modules/ is the first pattern, so overwrite it with the correct version
  nextJestConfig.transformIgnorePatterns = nextJestConfig.transformIgnorePatterns?.map((x) => {
    return x === '/node_modules/' ? `/node_modules/(?!(${esModules}))/` : x;
  });

  return nextJestConfig;
}

export default hackJestConfig;
