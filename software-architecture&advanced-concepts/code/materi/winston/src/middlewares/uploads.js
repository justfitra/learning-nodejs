import multer from "multer";
import { envConfig } from "../config/envConfig.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (envConfig.node_env === "test") {
      cb(null, "test/uploads/");
    } else {
      cb(null, "src/uploads/");
    }
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."));
  }
};

export const upload = multer({ storage, multerFilter });
