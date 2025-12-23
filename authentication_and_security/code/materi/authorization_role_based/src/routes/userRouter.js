import express from "express";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../validations/userSchema.js";
import { createUser } from "../controllers/userController.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.post(
  "/",
  validate(createUserSchema),
  verifyAccessToken,
  authorizeRoles("user"),
  createUser
);

export default router;
