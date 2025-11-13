import express from "express";
import { dbConnet } from "./db/connection.js";
import dotenv from "dotenv";
import departementRouter from "./routes/departementRouter.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/employe", departementRouter);

dbConnet().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(
      `Server running at http://${process.env.APP_HOST}:${process.env.APP_PORT}`
    );
  });
});

app.listen(3000);
