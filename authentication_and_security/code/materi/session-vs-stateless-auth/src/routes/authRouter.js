import express from "express";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validators/authSchema.js";
import { authLogin, authRegister } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", validate(loginSchema), authLogin);
router.post("/register", validate(registerSchema), authRegister);

export default router;
