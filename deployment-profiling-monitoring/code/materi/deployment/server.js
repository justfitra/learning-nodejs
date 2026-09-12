import app from "./src/app.js";
import { dbConnector } from "./src/config/db.js";
import { envConfig } from "./src/config/envConfig.js";

console.log("=== ENV CHECK ===");
console.log("NODE_ENV:", envConfig.node_env);
console.log("APP_HOST:", envConfig.app_host);
console.log("APP_PORT:", envConfig.app_port);
console.log("MONGO_URI exists:", !!envConfig.mongo_uri);
console.log("MONGO_URI length:", envConfig.mongo_uri?.length);
console.log("==================");

process.on("uncaughtException", (err) => {
  console.error("UNCAUGHT EXCEPTION:", err);
});
process.on("unhandledRejection", (err) => {
  console.error("UNHANDLED REJECTION:", err);
});

dbConnector();

app.use((req, res, next) => {
  console.log(`[PORT ${envConfig.app_port}] ${req.method} ${req.url}`);
  next();
});

app.listen(envConfig.app_port, () => {
  console.log(`app run at http://${envConfig.app_host}:${envConfig.app_port}`);
});
