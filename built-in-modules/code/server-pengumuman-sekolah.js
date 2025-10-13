/*
Studi Kasus 1: Server Pengumuman Sekolah

Sebuah sekolah ingin server kecil untuk menampilkan dan menambah pengumuman.
Syaratnya:

/ → menampilkan teks sambutan: “Sistem Pengumuman Sekolah”.

GET /announcements → baca file announcement.txt dan tampilkan isinya.

POST /announcements → kirim data pengumuman baru, server menulisnya ke announcement.txt.

Kalau file belum ada, server harus buat otomatis.

Harus menangani kondisi file rusak (tidak bisa dibaca) tanpa crash.

Pertanyaan untukmu:

Bagaimana server tahu perbedaan antara GET dan POST? menggunakan req

Kalau dua orang akses /announcements bersamaan, bagaimana kamu pastikan file tidak corrupt? i dont know
*/

import http from "http";
import fs from "fs";
import path from "path";

const filePath = "built-in-modules/code/announcement.txt";

const server = http.createServer((req, res) => {
  fs.stat(filePath, (err) => {
    if (!err) {
      console.log("File exists");
    } else if (err) {
      fs.writeFile(filePath, "Halo Dunia!", (err) => {
        if (err) throw err;
        console.log("File berhasil dibuat!");
      });
    } else {
      console.log("Some other error: ", err.code);
    }
  });
  if (req.method === "GET" && req.url === "/announcements") {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("File Kosong");
      }
      res.writeHead(200, { "content-type": "text/plain" });
      return res.end(data);
    });
  } else if (req.method === "POST" && req.url === "/announcements") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        const text = parsed.text;

        if (!text) {
          res.writeHead(400, { "content-type": "text/plain" });
          return res.end("Text Harus di isi");
        }

        fs.appendFile(filePath, " " + text + "\n", (err) => {
          if (err) {
            res.writeHead(500, { "content-type": "text/plain" });
            return res.end("Gagal Menulis File");
          }

          res.writeHead(200, { "content-type": "text/plain" });
          return res.end("Text Sukses Di tambahkan");
        });
      } catch {
        res.writeHead(400, { "content-type": "text/plain" });
        return res.end("Body Harus Valid");
      }
    });
  } else {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Sistem Pengumuman Sekolah");
  }
});

server.listen(3000, () => {
  console.log("Server running in http://localhost:3000 ");
});

// fetch("http://localhost:3000/announcements", {
//   method: "POST",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify({ text: "Halo dunia" }),
// });
