/*
Tugas:
Buat server Node.js tanpa framework (jangan pakai Express) dengan syarat ini:

Gunakan module http, fs, dan path.

Server harus punya tiga route dasar:

/ → menampilkan teks “Selamat datang di server Node.js milik Fitra”

/read → membaca isi file data.txt dari folder data dan menampilkan isinya.

/write?text=... → menulis teks dari query text ke file data.txt.

Jika file belum ada, server harus membuat file baru dulu.

Setiap kali /write dipanggil, teks baru ditambahkan (append) ke file.

Semua response harus pakai status code yang benar (200, 404, 500, dll).

Bonus (kalau kamu kuat): buat handler error agar server tetap jalan walau ada kesalahan.

Contoh alur:

Akses http://localhost:3000/ → teks sambutan.

Akses http://localhost:3000/write?text=halo → buat/append teks ke file.

Akses http://localhost:3000/read → baca semua isi file dan tampilkan.
*/

import http from "http";
import fs from "fs";

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/write") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk; // kumpulkan potongan data
    });

    req.on("end", () => {
      try {
        const parsed = JSON.parse(body); // parsing body (anggap JSON)
        const text = parsed.text;

        if (!text) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          return res.end("Field 'text' harus diisi");
        }

        fs.appendFile("built-in-modules/code/data.txt", text + "\n", (err) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            return res.end("Gagal menulis file");
          }

          res.writeHead(200, { "Content-Type": "text/plain" });
          res.end(`Teks "${text}" berhasil disimpan`);
        });
      } catch {
        res.writeHead(400, { "Content-Type": "text/plain" });
        res.end("Body harus JSON valid");
      }
    });
  } else if (req.method === "GET" && req.url === "/read") {
    fs.readFile("built-in-modules/code/data.txt", "utf8", (err, data) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        return res.end("File belum ada");
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Selamat datang di server Node.js milik Fitra");
  }
});

server.listen(3000, () => {
  console.log("Server berjalan di http://localhost:3000");
});

fetch("http://localhost:3000/write", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ text: "Halo dunia" }),
});
