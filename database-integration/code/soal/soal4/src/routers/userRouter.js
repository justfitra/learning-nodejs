import express from "express";
import { validate } from "../middleware/validate.js";
import { createUserSchema } from "../validations/userSchema.js";
import { createUser, getUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/", validate(createUserSchema), createUser);
router.get("/", getUser);

export default router;
