import app from "./src/app.js";
import { dbConnection } from "./src/config/db.js";
import { envConfig } from "./src/config/envConfig.js";

dbConnection();

app.listen(envConfig.app_port, () => {
  console.log(
    `server running at http://${envConfig.app_host}:${envConfig.app_port}`
  );
});
