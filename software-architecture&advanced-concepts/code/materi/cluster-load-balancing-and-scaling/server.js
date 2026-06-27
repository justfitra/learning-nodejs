import { dbConnection } from "./src/config/db.js";
import app from "./src/app.js";
import { envConfig } from "./src/config/envConfig.js";

dbConnection();

app.listen(envConfig.app_port, () =>
  console.log(
    `Server jalan di http://${envConfig.app_host}:${envConfig.app_port}`,
  ),
);
