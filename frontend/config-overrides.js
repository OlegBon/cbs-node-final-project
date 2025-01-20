const { overrideDevServer } = require("customize-cra");

const setupMiddlewares = () => (middlewares, devServer) => {
  // Твій власний код для додаткових middlewares
  return middlewares;
};

module.exports = {
  devServer: overrideDevServer(setupMiddlewares),
};
