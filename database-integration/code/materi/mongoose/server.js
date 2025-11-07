import express from "express";
import { connectDB } from "./db/conection.js";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express());

connectDB().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(
      `${process.env.APP_NAME} running at http://${process.env.HOST}:${process.env.PORT}`
    )
  );
});
