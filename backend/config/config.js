import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Визначаємо __dirname та __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Завантаження змінних оточення з .env файлу
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Константи для змінних середовища
const host = process.env.DATABASE_HOST || "localhost";
const user = process.env.DATABASE_USER || "root";
const password = process.env.DATABASE_PASSWORD || "rootpassword";
const database = process.env.DATABASE_NAME || "myapp";

export default {
  host,
  user,
  password,
  database,
};
