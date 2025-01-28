import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { generateToken } from "../utils/tokenUtils.js";

dotenv.config();

describe("generateToken", () => {
  const mockUser = {
    id: "12345",
    name: "Test User",
    email: "testuser@example.com",
  };

  let jwtSecret;

  beforeAll(() => {
    jwtSecret = process.env.JWT_SECRET; // Ініціалізація змінної оточення
  });

  it("повертає валідний JWT токен", () => {
    const token = generateToken(mockUser);
    expect(typeof token).toBe("string");

    const decoded = jwt.verify(token, jwtSecret);

    expect(decoded).toMatchObject({
      id: mockUser.id,
      name: mockUser.name,
      email: mockUser.email,
    });
  });

  it("генерує токен з терміном дії 1 година", () => {
    const token = generateToken(mockUser);
    const decoded = jwt.verify(token, jwtSecret);

    const now = Math.floor(Date.now() / 1000);
    const expiresIn = decoded.exp - now;

    // Перевіряємо, що термін дії приблизно 3600 секунд (1 година)
    expect(expiresIn).toBeGreaterThan(3590); // Можливі кількасекундні похибки
    expect(expiresIn).toBeLessThanOrEqual(3600);
  });

  afterAll(() => {
    jwtSecret = null; // Очистка змінної
  });
});
