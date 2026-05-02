import app from "./src/app.js";
import dotenv from "dotenv";
import envConfig from "./src/config/envConfig.js";
import dbConnection from "./src/config/db.js";

dbConnection();

app.listen(envConfig.app_port, () => {
  console.log(
    `app running at http://${envConfig.app_host}:${envConfig.app_port}`,
  );
});
