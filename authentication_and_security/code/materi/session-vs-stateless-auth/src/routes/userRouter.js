import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js";
import { authorization } from "../middlewares/authorizeRoles.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../validators/userSchema.js";
import { create } from "../controllers/userController.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  authorization("admin"),
  validate(createUserSchema),
  create
);

export default router;
