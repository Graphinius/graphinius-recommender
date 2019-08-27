module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  verbose: true,
  collectCoverage: false,
  // collectCoverageFrom: [
  //   "**/*.{ts}",
  //   "!**/node_modules/**",
  //   "!**/vendor/**"
  // ]
  watchPathIgnorePatterns: [
    "/lib",
    "/outputs",
    "/public"
  ],
  "globals": {
    // "window": {}
  }
};
