import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { envConfig } from "./src/config/envConfig.js";

connectDB();

app.listen(envConfig.appHost, () => {
  console.log(
    `Server running at http://${envConfig.appHost}:${envConfig.appPort}`
  );
});
