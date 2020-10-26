module.exports = {
  testMatch: ['<rootDir>/test/**/*.test.tsx'],
  setupFilesAfterEnv: ['<rootDir>/test/jest.setup.ts'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/test/tsconfig.json'
    },
    __DEV__: true
  },
  coveragePathIgnorePatterns: ['<rootDir>/src/Augments.d.ts']
};
