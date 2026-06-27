import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, file.fieldname + "-" + uniqueName);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimtype.startWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload an image."));
  }
};

export const upload = multer({ storage, multerFilter });
