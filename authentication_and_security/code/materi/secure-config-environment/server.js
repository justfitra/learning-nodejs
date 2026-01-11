import app from "./src/app.js";
import dotenv from "dotenv";
import { envConfig } from "./src/config/envConfig.js";
import { dbConnect } from "./src/config/db.js";

dotenv.config();

dbConnect();

app.listen(envConfig.app_port, () => {
  console.log(
    `Server running at http://${envConfig.app_host}:${envConfig.app_port}`
  );
});
