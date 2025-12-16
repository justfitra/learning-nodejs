import express from "express";
import { createUser, validate } from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.post("/validate", validate);

export default router;
