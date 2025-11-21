import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { envConfig } from "./src/config/envConfig.js";
import dotenv from "dotenv";

connectDB();
dotenv.config();

app.listen(envConfig.appPort, () => {
  console.log(
    `Server running at http://${envConfig.appHost}:${envConfig.appPort}`
  );
});
