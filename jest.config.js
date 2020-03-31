// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {

  clearMocks: true,
  coverageDirectory: "coverage",

  // An object that configures minimum threshold enforcement for coverage results
  // coverageThreshold: undefined,


  // Force coverage collection from ignored files using an array of glob patterns
  // forceCoverageMatch: [],

  // A set of global variables that need to be available in all test environments
  // globals: {},


  moduleFileExtensions: ["js","jsx"],

  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ["jest-enzyme"],

  // The test environment that will be used for testing
  testEnvironment: "enzyme",

  // Options that will be passed to the testEnvironment
  testEnvironmentOptions: {
    enzymeAdapter: "react16"
  },

  // This option allows use of a custom test runner
  // testRunner: "jasmine2",

  // A map from regular expressions to paths to transformers
  transform: {
    "^.+\\.jsx$": "babel-jest",
  },

};
