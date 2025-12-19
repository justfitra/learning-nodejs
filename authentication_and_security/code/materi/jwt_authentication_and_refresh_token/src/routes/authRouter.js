import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { loginUser } from "../controllers/userController.js";
import { refreshAccessToken } from "../middlewares/refreshAccessToken.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/refresh", authMiddleware, refreshAccessToken);

export default router;
