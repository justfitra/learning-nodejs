/*
Buat script Node.js sederhana yang:

Mengambil variabel APP_NAME dan AUTHOR dari .env

Menampilkan pesan:

Aplikasi: AbsensiApp dibuat oleh Fitra Maulana

*/

import { envConfig } from "./config/db.js";
import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, "OK", { "content-type": "text/plain" });
  res.end(`Aplikasi : ${envConfig.name} dibuat oleh ${envConfig.author}`);
});

server.listen(envConfig.port, () => {
  console.log(`server running at http://${envConfig.host}:${envConfig.port}`);
});
