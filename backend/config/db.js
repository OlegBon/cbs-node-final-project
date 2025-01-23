import { Sequelize } from "sequelize";
import config from "./config.js";

const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mysql",
  logging: false,
});

// Додаємо тестове підключення для перевірки
sequelize
  .authenticate()
  .then(() => console.log("Підключення до бази даних встановлено."))
  .catch((err) => console.error("Не вдалося підключитися до бази даних:", err));

export default sequelize;
