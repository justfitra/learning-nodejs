import express from "express";
import {
  createUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";
import { validate } from "../middleware/validate.js";
import {
  createUserValidator,
  updateUserValidation,
} from "../validations/userValidator.js";

const router = express.Router();

router.post("/", validate(createUserValidator), createUser);
router.get("/", getUser);
router.patch("/:username", validate(updateUserValidation), updateUser);
// router.get('/:name', )

export default router;
