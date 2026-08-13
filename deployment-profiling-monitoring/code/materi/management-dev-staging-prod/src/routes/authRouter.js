import express from "express";
import * as authController from "../controllers/authController.js";
import { validate } from "../middlewares/validate.js";
import {
  loginSchema,
  registerSchema,
  registerUserAvatarScema,
} from "../validations/authSchema.js";
import { imageValidate } from "../middlewares/imageValidate.js";
import { upload } from "../middlewares/uploads.js";

const router = express.Router();

router.post("/login", validate(loginSchema), authController.createLogin);
router.post(
  "/register",
  upload.single("avatar"),
  imageValidate(registerUserAvatarScema),
  validate(registerSchema),
  authController.createRegister,
);

export default router;
