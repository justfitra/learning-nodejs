import express from "express";
import { createUser } from "../controllers/userController.js";
import { validate } from "../middleware/validate.js";
import { userValidator } from "../validations/userValidator.js";

const router = express.Router();

router.post("/", validate(userValidator), createUser);

export default router;
