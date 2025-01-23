import { User } from "../models/index.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Помилка отримання користувачів:", error);
    res.status(500).json({ error: "Внутрішня помилка сервера" });
  }
};

export const clearDatabase = async (req, res) => {
  try {
    await User.destroy({ where: {}, truncate: true });
    res.json({ message: "Базу даних очищено", redirectTo: "/" });
  } catch (error) {
    console.error("Помилка очищення бази даних:", error);
    res.status(500).json({ error: "Внутрішня помилка сервера" });
  }
};
