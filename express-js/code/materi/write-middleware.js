import express from "express";
import { logger } from "./logger.js";

const app = express();

// 1. Global Middleware

// app.use((req, res, next) => {
//   console.log(`${req.method} ${req.url} at ${new Date().toISOString()}`);
//   next();
// });

// app.get("/", (req, res) => {
//   res.send("Halo dunia!");
// });

// 2. Route-Specific Middleware

// function checkAuth(req, res, next) {
//   const token = req.query.token;
//   if (token === "12345") {
//     next();
//   } else {
//     res.status(403).send("Akses ditolak");
//   }
// }

// app.get("/dashboard", checkAuth, (req, res) => {
//   res.send("selamat datang admin");
// });

// 3. Custom Middleware

app.use(logger);

app.get("/", (req, res) => res.send("OK!"));
app.listen(3000, () => console.log("Server jalan di port 3000"));
