import { envConfig } from "../redis/src/config/envConfig.js";
import app from "./src/app.js";
import { dbConnect } from "./src/config/db.js";

dbConnect();

app.listen(envConfig.app_port, () => {
  console.log(
    `app running at http://${envConfig.app_host}:${envConfig.app_port}`,
  );
});
