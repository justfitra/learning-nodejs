import express from "express";
import * as userController from "../controllers/userController.js";
import { upload } from "../middlewares/upload.js";
const router = express.Router();
router.get("/", userController.get);
router.post("/", upload.single("image"), userController.create);

export default router;
