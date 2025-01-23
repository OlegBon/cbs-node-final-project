import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

// Завантаження змінних оточення з .env
dotenv.config();

const app = express();
const port = process.env.APP_PORT || 5000;

// Middleware для обробки JSON-запитів
app.use(express.json());

// Налаштування CORS для роботи з фронтендом
app.use(
  cors({
    origin: "http://localhost:3000", // URL фронтенду
    credentials: true, // Дозвіл передавати куки між сервером і клієнтом
  })
);

// Додаємо просту затримку
await new Promise((resolve) => setTimeout(resolve, 1000)); // Затримка 1 секунда

// Синхронізація моделі з базою даних
async function initializeDatabase() {
  await sequelize
    .sync({ alter: true }) // alter: true означає, що таблиці будуть оновлені, щоб відповідати моделям, без втрати даних
    .then(() => console.log("Моделі синхронізовані з базою даних"))
    .catch((error) => console.error("Помилка синхронізації:", error));
}

// Підключення маршрутів
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// Обробка помилок для неіснуючих маршрутів
app.use((req, res) => {
  res.status(404).json({ error: "Сторінка не знайдена" });
});

// Запуск сервера
app.listen(port, async () => {
  await initializeDatabase(); // Синхронізація бази даних при старті сервера
  console.log(`Сервер працює на порту ${port}`);
});
