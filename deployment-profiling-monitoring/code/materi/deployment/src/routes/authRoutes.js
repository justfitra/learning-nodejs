import express from "express";
import { validate } from "../middlewares/validate.js";
import {
  loginSchema,
  registerSchema,
  registerUserAvatarSchema,
} from "../validations/authSchema.js";
import * as authController from "../controllers/authController.js";

const router = express.Router();

router.post("/login", validate(loginSchema), authController.createLogin);
router.post(
  "/register",
  upload.single("avatar"),
  imageValidate(registerUserAvatarSchema),
  validate(registerSchema),
  authController.createRegister,
);
