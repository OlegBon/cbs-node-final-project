import jwt from "jsonwebtoken";
import { verifyToken } from "../middleware/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config();

describe("verifyToken middleware", () => {
  const mockRequest = (headers = {}) => ({ headers });
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  const mockNext = jest.fn();

  let jwtSecret;

  beforeAll(() => {
    jwtSecret = process.env.JWT_SECRET;
  });

  it("повертає 401, якщо токен не наданий", () => {
    const req = mockRequest();
    const res = mockResponse();

    verifyToken(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Токен не наданий" });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("повертає 401, якщо токен невірний", () => {
    const req = mockRequest({ authorization: "Bearer invalidToken" });
    const res = mockResponse();

    verifyToken(req, res, mockNext);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Невірний токен" });
    expect(mockNext).not.toHaveBeenCalled();
  });

  it("декодує токен і викликає next() для валідного токена", () => {
    const user = { id: "12345", name: "Test User", email: "test@example.com" };
    const validToken = jwt.sign(user, jwtSecret);
    const req = mockRequest({ authorization: `Bearer ${validToken}` });
    const res = mockResponse();

    verifyToken(req, res, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(req.user).toMatchObject(user);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  afterAll(() => {
    jwtSecret = null;
  });
});
