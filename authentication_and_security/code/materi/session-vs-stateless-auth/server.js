import app from "./src/app.js";
import { dbConnect } from "./src/config/db.js";
import { envConfig } from "./src/config/envConfig.js";

dbConnect();

app.listen(envConfig.app_port, () => {
  console.log(
    `Server running at http://${envConfig.app_host}:${envConfig.app_port}`
  );
});
