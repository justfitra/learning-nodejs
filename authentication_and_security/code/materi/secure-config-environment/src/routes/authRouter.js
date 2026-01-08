import express from "express";
import { validate } from "../middlewares/validate.js";
import { loginSchema } from "../validations/authSchema.js";
import { createLogin } from "../controllers/authController";

const router = express.Router();

router.post("/", validate(loginSchema), createLogin);

export default router;
