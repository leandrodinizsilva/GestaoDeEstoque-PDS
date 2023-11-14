// jest.config.js
module.exports = {
    collectCoverage: true,
    coverageDirectory: 'coverage',
    testEnvironment: 'node',
    testMatch: ['**/*.test.cjs'],
    collectCoverageFrom: [
      "controllers/*.js",
      "repositorios/*.js",
      "!**/node_modules/**"
    ],
  };
  