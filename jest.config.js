module.exports = {
  preset: 'ts-jest',
  setupFiles: ["<rootDir>/jest.setup.js"], // Ensure to include <rootDir> for the correct path
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  moduleNameMapper: {
    "\\.(css|scss)$": "<rootDir>/__mocks__/styleMock.js"
  }
};