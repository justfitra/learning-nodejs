/*
8. Kamu membuat server Node.js sederhana.
   Setiap kali user mengakses `/save?text=halo`, server harus:

   - Membaca file `log.txt`
   - Menambahkan teks baru di akhir file
   - Menyimpan kembali file tanpa menimpa isi lama

   a. Jelaskan pola asynchronous mana yang paling cocok untuk kasus ini dan kenapa?
   menggunakan async function karena mudah dan jelas
   b. Apa yang terjadi jika dua user mengakses endpoint itu **secara bersamaan**?
   tidak terjadi apa-apa
*/

import http from "http";
import fs from "fs";
const hostname = "localhost";
const port = 3000;
const filePath = "log.txt";
async function readFile(data) {
  try {
    await fs.promises.appendFile(filePath, data + "\n", "utf8");

    const getData = await fs.promises.readFile(filePath, "utf8");

    return getData;
  } catch (err) {
    throw new Error(err);
  }
}
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const text = url.searchParams.get("text");

  if (url.pathname === "/" && req.method === "GET") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Server Running");
  } else if (url.pathname === "/save" && req.method === "POST") {
    try {
      readFile(text)
        .then((result) => {
          res.writeHead(200, { "content-type": "text/plain" });
          res.end(result);
        })
        .catch((err) => {
          res.writeHead(400, { "content-type": "text/plain" });
          res.end(err);
        });
    } catch (err) {
      res.writeHead(500, { "content-type": "text/plain" });
      res.end("Internal Server Error");
    }
  }
});

server.listen(port, () => {
  console.log(`server running at http://${hostname}:${port}`);
});
