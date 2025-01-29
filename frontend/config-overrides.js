const { overrideDevServer } = require("customize-cra");

const setupMiddlewares = () => (middlewares, devServer) => {
  // Код для додаткових middlewares
  return middlewares;
};

module.exports = {
  devServer: overrideDevServer(setupMiddlewares),
};
