import express from "express";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../validations/userSchema.js";
import { createUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", validate(createUserSchema), createUser);

export default router;
