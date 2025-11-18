import joi from "joi";
import dotenv from "dotenv";
import { connectionDB } from "./src/config/db.js";
import app from "./src/app.js";

dotenv.config();

connectionDB();

app.listen(process.env.APP_PORT, () => {
  console.log(
    `server running at http://${process.env.APP_HOST}:${process.env.APP_PORT}`
  );
});
