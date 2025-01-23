import { Router } from "express";
import {
  register,
  login,
  verifyToken,
  logout,
} from "../controllers/authController.js";
import { verifyToken as verifyTokenMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-token", verifyTokenMiddleware, verifyToken);
router.post("/logout", logout);

export default router;
