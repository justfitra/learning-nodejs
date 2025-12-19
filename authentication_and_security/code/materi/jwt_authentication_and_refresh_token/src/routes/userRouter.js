import express from "express";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../validations/userSchema.js";
import { createUser } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, validate(createUserSchema), createUser);

export default router;
