import express from "express";
import {
  createUser,
  getAllUsers,
  showUser,
} from "../controller/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.get("/detail", showUser);

export default router;
