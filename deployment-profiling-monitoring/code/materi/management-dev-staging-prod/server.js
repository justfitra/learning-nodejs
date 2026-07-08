import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { envConfig } from "./src/config/envConfig.js";

connectDB();

app.use((req, res, next) => {
  console.log(`[PORT ${envConfig.app_port}] ${req.method} ${req.url}`);
  next();
});
app.listen(envConfig.app_port, () => {
  console.log(`app run at http://${envConfig.app_host}:${envConfig.app_port}`);
});
