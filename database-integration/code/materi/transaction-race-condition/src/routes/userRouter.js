import express from "express";
import { validate } from "../middlewares/validate.js";
import { createUserSchema } from "../validations/userSchema.js";
import { create, get } from "../controllers/userController.js";

const router = express.Router();
router.post("/", validate(createUserSchema), create);
router.get("/", get);
export default router;
