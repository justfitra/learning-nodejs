import express from "express";
import { loginUser } from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import { loginSchema } from "../validations/authSchema.js";

const router = express.Router();

router.post("/login", validate(loginSchema), loginUser);

export default router;
