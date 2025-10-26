import { dbConfig } from "./config/db.js";

if (dbConfig.node_env === "development" && dbConfig.log_level === "verbose") {
  console.log(`[${dbConfig.log_level}] Server running at port 3000`);
} else if (dbConfig.node_env === "production") {
  console.log(`Server running`);
}
