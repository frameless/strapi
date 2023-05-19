module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/node_modules/', '/dist'],
  coverageProvider: 'v8',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'ts-jest',
  },
};
