import express from "express";
import * as userController from "../controllers/userController.js";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now());
  },
});
const upload = multer({ storage: storage });

router.get("/", userController.get);
router.post("/", upload.single("image"), userController.create);

export default router;
