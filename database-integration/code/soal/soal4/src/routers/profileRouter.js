import express from "express";
import { update } from "../controllers/profileController.js";
import { validate } from "../middleware/validate.js";
import { updateUserSchema } from "../validations/userSchema.js";

const router = express.Router();

router.patch("/:userId", validate(updateUserSchema), update);

export default router;
