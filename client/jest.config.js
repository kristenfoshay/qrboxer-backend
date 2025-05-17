module.exports = {
  // The root of your source code, typically /src
  roots: ["<rootDir>/src"],
  // Set testMatch to specifically look for tests in the tests directory
  testMatch: ["**/src/tests/**/*.test.js"],
  
  // Map the axios module to our mock implementation
  moduleNameMapper: {
    "^axios$": "<rootDir>/src/tests/__mocks__/axios.js",
    // Add any other module mappings as needed
    "\\.(css|less|scss|sass)$": "<rootDir>/src/tests/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/tests/__mocks__/fileMock.js"
  },
  
  // Setup files that will be run before each test
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.js"],
  
  // Test environment configuration
  testEnvironment: "jsdom",
  
  // Transform files for Jest
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },
  
  // Ignore these patterns when transforming
  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)"
  ],
  
  // Explicitly make axios transformable
  // This is needed because axios is an ESM module and Jest needs to transform it
  moduleFileExtensions: ["js", "jsx", "json", "node"],
  
  // Fix for the config.match is not a function error
  testPathIgnorePatterns: ["/node_modules/"]
};