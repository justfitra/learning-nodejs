import express from "express";
import { validate } from "../middlewares/validate.js";
import { loginSchema, registerSchema } from "../validators/authSchema.js";
import {
  authLogin,
  authLogout,
  authRegister,
} from "../controllers/authController.js";
import { authSession } from "../middlewares/authSession.js";

const router = express.Router();

router.post("/login", validate(loginSchema), authLogin);
router.post("/register", validate(registerSchema), authRegister);
router.post("/logout", authSession, authLogout);

export default router;
