import express from "express";
import { create, get } from "../controllers/user.controller.js";
import { validate } from "../middleware/validate.js";
import { userSchemaValidation } from "../validations/user.validation.js";

const router = express.Router();

router.post("/", validate(userSchemaValidation), create);
router.get("/", get);

export default router;
