module.exports = {
  roots: ["<rootDir>/src"],
  testMatch: ["**/src/tests/**/*.test.js"],

  moduleNameMapper: {
    "^axios$": "<rootDir>/src/tests/__mocks__/axios.js",
    "\\.(css|less|scss|sass)$": "<rootDir>/src/tests/__mocks__/styleMock.js",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/tests/__mocks__/fileMock.js"
  },

  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.js"],

  testEnvironment: "jsdom",

  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest"
  },

  transformIgnorePatterns: [
    "/node_modules/(?!(axios)/)"
  ],

  moduleFileExtensions: ["js", "jsx", "json", "node"],

  testPathIgnorePatterns: ["/node_modules/"]
};
