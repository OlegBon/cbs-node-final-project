import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Op } from "sequelize";
import { User } from "./models/index.js";
import sequelize from "./config/db.js";

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

// Синхронізація моделі з базою даних
sequelize
  .sync({ alter: true })
  .then(() => console.log("Моделі синхронізовані з базою даних"))
  .catch((error) => console.error("Помилка синхронізації:", error));

// Генерація токену
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h", // Термін дії токену
    }
  );
};

// Перевірка токену
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Токен не наданий" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Невірний токен" });
    }
    req.user = decoded;
    next();
  });
};

// Маршрут для реєстрації нового користувача
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Всі поля є обов'язковими" });
    }

    const userExists = await User.findOne({
      where: { [Op.or]: [{ email }, { name }] },
    });

    if (userExists) {
      return res.status(400).json({ error: "Користувач вже існує" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = generateToken(user);

    res.status(201).json({ message: "Користувача зареєстровано", token });
  } catch (error) {
    console.error("Помилка під час реєстрації:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: error.errors[0].message });
    }
    res.status(500).json({ error: "Внутрішня помилка сервера" });
  }
});

// Маршрут для входу користувача
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: "Користувач не знайдений" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Невірний пароль" });
    }

    const token = generateToken(user);

    res.json({ message: "Успішний вхід", token });
  } catch (error) {
    console.error("Помилка під час входу:", error);
    res.status(500).json({ error: "Внутрішня помилка сервера" });
  }
});

// Маршрут для перевірки токену
app.get("/verify-token", verifyToken, (req, res) => {
  res.json(req.user);
});

// Маршрут для виходу користувача
app.post("/logout", (req, res) => {
  res.json({ message: "Вихід виконано" });
});

// Маршрут для очищення бази даних
app.post("/clear", verifyToken, async (req, res) => {
  try {
    await User.destroy({ where: {}, truncate: true });
    res.json({ message: "Базу даних очищено", redirectTo: "/" });
  } catch (error) {
    console.error("Помилка очищення бази даних:", error);
    res.status(500).json({ error: "Внутрішня помилка сервера" });
  }
});

// Маршрут для отримання всіх користувачів
app.get("/users", verifyToken, async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Помилка отримання користувачів:", error);
    res.status(500).json({ error: "Внутрішня помилка сервера" });
  }
});

// Обробка помилок для неіснуючих маршрутів
app.use((req, res) => {
  res.status(404).json({ error: "Сторінка не знайдена" });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер працює на порту ${port}`);
});
