/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/test/**/*.test.(ts|tsx)'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/test/tsconfig.json'
    },
    __DEV__: true
  },
  coveragePathIgnorePatterns: ['<rootDir>/src/Augments.d.ts', '<rootDir>/src/tinyWarning.ts', '<rootDir>/src/isThenable.ts']
};

module.exports = config;
