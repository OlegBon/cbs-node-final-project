import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import { generateToken } from "../utils/tokenUtils.js";
import { Op } from "sequelize";

export const register = async (req, res) => {
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
};

export const login = async (req, res) => {
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
};

export const verifyToken = (req, res) => {
  res.json(req.user);
};

export const logout = (req, res) => {
  res.json({ message: "Вихід виконано" });
};
