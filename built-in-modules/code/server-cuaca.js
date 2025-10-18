/*
Studi Kasus 3: Server Cuaca

Server akan memberikan informasi cuaca berdasarkan kota.

GET /weather?city=Jakarta → tampilkan teks: “Cuaca di Jakarta: Cerah”

GET /weather?city=Surabaya → tampilkan teks: “Cuaca di Surabaya: Hujan ringan”

Jika tidak ada parameter city, balas: “Masukkan nama kota terlebih dahulu.”

Jika kota tidak dikenali, balas: “Data cuaca tidak ditemukan.”

Tujuan: melatih penggunaan query parameter dan validasi input.
*/

import http from "http";
import fs from "fs";

const port = 3000;
const hostname = "localhost";
const filePath = "built-in-modules/code/weather.json";

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  if (url.pathname === "/" && req.method === "GET") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Selamat datang di server Prediksi cuaca");
  } else if (url.pathname === "/weather" && req.method === "GET") {
    const city = url.searchParams.get("city");
    if (!city) {
      res.writeHead(400, { "content-type": "text/plain" });
      res.end("Masukkan nama kota terlebih dahulu.");
    }

    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "content-type": "text/plain" });
        return res.end("File Rusak");
      }

      if (!data) {
        res.writeHead(404, { "content-type": "text/plain" });
        return res.end("Data tidak ditemukan");
      } else {
        const weatherOfCity = JSON.parse(data);
        const filter = weatherOfCity.filter((res) => res.name === city);

        if (filter.length === 0) {
          res.writeHead(404, { "content-type": "text/plain" });
          return res.end("Data tidak ditemukan");
        }

        if (filter) {
          res.writeHead(200, { "content-type": "text/plain" });
          return res.end(
            `cuaca di ${filter.map((res) => res.name)} : ${filter.map(
              (res) => res.status
            )}`
          );
        }
      }
    });
  }
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
