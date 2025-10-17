/*
Studi Kasus 2: Server Catatan Harian

Kamu bikin server buat mencatat mood harian.
Server harus:

GET / → tampilkan “Selamat datang di jurnal online!”

GET /notes → tampilkan semua catatan di file notes.txt

POST /notes?text=... → tambah catatan baru ke notes.txt

DELETE /notes → hapus semua isi file notes.txt

Semua operasi file harus lewat module fs.

Tujuan: latihan operasi file (readFile, appendFile, unlink) dan respon dinamis.
*/

import http from "http";
import fs from "fs";

const filePath = "built-in-modules/code/notes.json";

const server = http.createServer((req, res) => {
  const urlPath = new URL(req.url, `http://${req.headers.host}`);

  const { url, method } = req;
  if (urlPath.pathname === "/notes" && url === "/notes" && method === "GET") {
    try {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "content-type": "text/plain" });
          return res.end("File Rusak");
        }
        if (err.code === "ENOENT") {
          res.writeHead(404, { "content-type": "text/plain" });
          return res.end("File tidak ditemukan");
        }
        res.writeHead(200, { "content-type": "text/plain" });
        res.end(data);
      });
    } catch (err) {
      console.log(err);
    }
  } else if (urlPath.pathname === "/notes" && method === "POST") {
    try {
      const text = urlPath.searchParams.get("text");
      res.writeHead(200, { "content-type": "text/plain" });
      res.end(text);
    } catch (err) {
      console.log(err);
    }
  } else if (url === "/" && urlPath.pathname === "/" && method === "GET") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end(`Selamat datang di jurnal online!`);
  }
});

server.listen(3000, () => {
  console.log("Server Running At http://localhost:3000");
});
