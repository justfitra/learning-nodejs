import express from "express";
import { create } from "../controllers/commentController.js";

const router = express.Router();

router.post("/", create);

export default router;
