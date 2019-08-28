module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  collectCoverage: false,
  watchPathIgnorePatterns: [
    "/lib",
    "/data",
    "/public",
    "/scripts"
  ],
  "globals": {
    // "window": {}
  },
  testMatch: [
    '**/test/browser/**/*.ts'
  ],
};
