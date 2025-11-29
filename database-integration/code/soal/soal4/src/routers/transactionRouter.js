import express from "express";
import { transaction } from "../controllers/transactionController.js";

const router = express.Router();

router.post("/", transaction);

export default router;
