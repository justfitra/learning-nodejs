/*
Deskripsi Kasus

Kamu bikin server Node.js bernama server.js.
Server ini bisa dijalankan di dua kondisi:

Development Mode

Port: 3000

Hostname: localhost

Pesan: "Running in development mode"

Production Mode

Port: 8080

Hostname: 0.0.0.0

Pesan: "Running in production mode"

Kamu ingin satu file kode bisa berjalan di dua mode hanya dengan mengganti environment variable, bukan ubah isi kode.
*/

import { dbConfig } from "./config/db.js";
import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, "OK", { "content-type": "text/plain" });
  res.end(dbConfig.message);
});

server.listen(dbConfig.port, () => {
  console.log(`Server running at http://${dbConfig.host}:${dbConfig.port}`);
});
