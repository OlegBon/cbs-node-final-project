import { Router } from "express";
import { getAllUsers, clearDatabase } from "../controllers/userController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", verifyToken, getAllUsers);
router.post("/clear", verifyToken, clearDatabase);

export default router;
