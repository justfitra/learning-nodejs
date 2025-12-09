import express from "express";
import { createUser, getUser } from "../controllers/userController.js";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../validations/userSchema.js";

const router = express.Router();

router.post("/", validate(createUserSchema), createUser);
router.get("/", getUser);

export default router;
