import express from "express";
import { createUser, getAllUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUser);
router.post("/", createUser);

export default router;
