import { Sequelize } from "sequelize";
import config from "./config.js";
import mysql from "mysql2/promise"; // Додаємо mysql2/promise для створення бази даних і таблиць

// Функція для створення підключення до MySQL
async function createConnection() {
  return await mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
  });
}

// Функція для створення бази даних
async function createDatabase(connection) {
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${config.database}\`;`
  );
}

// Функція для створення таблиці
async function createTable(connection) {
  await connection.query(`USE \`${config.database}\`;`);
  await connection.query(`
    CREATE TABLE IF NOT EXISTS users (
      id CHAR(36) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
}

// Основна функція для створення бази даних і таблиці
async function initializeDatabase() {
  const connection = await createConnection();
  await createDatabase(connection);
  await createTable(connection);
  await connection.end();
}

// Ініціалізація Sequelize
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: "mysql",
  logging: false,
});

// Асинхронний виклик для ініціалізації бази даних і таблиць
(async () => {
  await initializeDatabase(); // Викликаємо функцію ініціалізації бази даних і таблиць

  // Додаємо просту затримку
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Затримка 1 секунда

  // Додаємо тестове підключення для перевірки
  sequelize
    .authenticate()
    .then(() => console.log("Підключення до бази даних встановлено."))
    .catch((err) =>
      console.error("Не вдалося підключитися до бази даних:", err)
    );
})();

export default sequelize;
