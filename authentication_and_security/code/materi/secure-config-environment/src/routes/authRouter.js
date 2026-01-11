import express from "express";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validations/authSchema.js";
import { createLogin, createRegister } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", validate(loginSchema), createLogin);
router.post("/register", validate(registerSchema), createRegister);

export default router;
