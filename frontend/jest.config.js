module.exports = {
  transform: {
    "^.+\\.(js|jsx|mjs)$": "babel-jest", // трансформація для js, jsx, mjs файлів
  },
  transformIgnorePatterns: [
    "/node_modules/(?!axios)/", // не ігнорувати axios
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // для стилів
    "^axios$": "<rootDir>/src/__mocks__/axios.js", // правильний шлях до мока axios
  },
  testMatch: [
    "<rootDir>/src/**/*.test.js", // шаблон для тестових файлів
  ],
};
