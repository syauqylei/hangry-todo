/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: '@shelf/jest-mongodb',
  testEnvironment: 'node',
  "roots": [
    "<rootDir>/src"
  ],
  "testMatch": [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
};
