import express from "express";
import { connectDB } from "./db/conection.js";
import dotenv from "dotenv";
import karyawanRouter from "./routes/karyawanRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/karyawan", karyawanRouter);

connectDB().then(() => {
  app.listen(process.env.PORT, () =>
    console.log(
      `${process.env.APP_NAME} running at http://${process.env.HOST}:${process.env.PORT}`
    )
  );
});
