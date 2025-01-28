export default {
  transform: {
    "^.+\\.js$": "babel-jest", // Використання babel-jest для трансформацій
  },
  transformIgnorePatterns: [
    "node_modules/(?!(module-to-transform)/)", // Якщо є модулі, які використовують ESM
  ],
  // extensionsToTreatAsEsm: [".js"], // Вказує, що файли .js слід обробляти як ESM
  testEnvironment: "node",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1", // Дозволяє використовувати імпорти без розширення
  },
  verbose: true,
};
