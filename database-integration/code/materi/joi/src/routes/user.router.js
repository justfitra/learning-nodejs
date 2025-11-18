import express from "express";
import { create, get } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/", create);
router.get("/", get);

export default router;
