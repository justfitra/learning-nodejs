import express from "express";
import { createUserSchema } from "../validations/userSchema.js";
import { validate } from "../middlewares/validate.js";
import { createUser } from "../controllers/userController.js";
import { verifyAccessToken } from "../middlewares/verifyAccessToken.js";
import { authorizeRoles } from "../middlewares/authorizeRoles.js";

const router = express.Router();

router.post(
  "/",
  verifyAccessToken,
  authorizeRoles("admin"),
  validate(createUserSchema),
  createUser
);

export default router;
