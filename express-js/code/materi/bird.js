import express from "express";
const router = express.Router();

const timeLog = (req, res, next) => {
  console.log("time : ", Date.now());
  next();
};

router.use(timeLog);

router.get("/", (req, res) => {
  res.send("Birds home page");
});

router.get("/about", (req, res) => {
  res.send("About birds");
});

export default router;
