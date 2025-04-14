module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  "moduleNameMapper": {
      "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"
  }
};