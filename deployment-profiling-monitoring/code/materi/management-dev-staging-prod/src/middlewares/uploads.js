import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, file.filename + "-" + uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."));
  }
};

export const upload = multer({ storage, fileFilter });
