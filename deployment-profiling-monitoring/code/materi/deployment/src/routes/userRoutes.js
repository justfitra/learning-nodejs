import express from "express";
import { authenticationValidate } from "../middlewares/authenticationValidate.js";
import { authorization } from "../middlewares/authorization.js";
import * as userController from "../controllers/userController.js";
import { upload } from "../middlewares/uploads.js";
import { validate } from "../middlewares/validate.js";

const router = express.Router();

router.get(
  "/",
  authenticationValidate,
  authorization("user"),
  userController.get,
);
router.post("/", upload.single("avatar"), validate(createUserSch));
