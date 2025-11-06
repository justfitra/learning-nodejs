import express from "express";
import {
  createUser,
  detailUser,
  getUsers,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:idUser", detailUser);
router.post("/", createUser);

export default router;
