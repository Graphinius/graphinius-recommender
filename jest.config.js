module.exports = {
  preset: 'ts-jest',
  // transform: {
  //   '^.+\\.ts?$': 'babel-jest',
  // },
  testEnvironment: 'jsdom',
  verbose: true,
  collectCoverage: false,
  watchPathIgnorePatterns: [
    "/lib",
    "/public"
  ],
  "globals": {
    "window": {}
  },
  testMatch: [
    '**/test/**/*.test.ts'
  ],
  transform: {
    ".(js|ts)": "ts-jest"
  },
};
