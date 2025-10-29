/*
Soal 3 — Custom Middleware (File Terpisah)

Buat file baru:
middleware/logger.js

Isi:

Middleware yang mencetak log:
[WAKTU] METHOD - PATH
contoh: [2025-10-28T12:00:00Z] GET - /users

Gunakan middleware itu di file app.js.
*/

import express from "express";
import { logger } from "./logger.js";

const app = express();

app.use(logger);

app.get("/users", (req, res) => {
  res.send("Hello World");
});

app.listen(3000);
