import express from "express";
import { create } from "../controllers/departementController.js";

const router = express.Router();

router.post("/", create);

export default router;
