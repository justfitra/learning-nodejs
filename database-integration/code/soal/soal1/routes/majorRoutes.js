import express from "express";
import { create, get } from "../controllers/majorController.js";

const router = express.Router();

router.get("/", get);
router.post("/", create);

export default router;
