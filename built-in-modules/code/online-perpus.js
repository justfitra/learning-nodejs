/*
Studi Kasus 1: Server Buku Digital

Kamu diminta membuat server sederhana untuk perpustakaan online.
Server ini harus:

Menerima permintaan dari user untuk melihat semua daftar buku (GET /books)

Menambahkan buku baru dengan judul dari query (POST /books?title=...)

Menampilkan detail buku berdasarkan ID (GET /books/:id)

Jika buku tidak ditemukan, kembalikan status 404 Not Found
*/

import http from "http";
import fs from "fs";

const filePath = "built-in-modules/code/books.json";
let id = 0;
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/books") {
    try {
      const title = url.searchParams.get("title");

      fs.readFile(filePath, "utf8", (err, data) => {
        let books = [];
        if (!err && data) {
          try {
            books = JSON.parse(data);
            return res.end(data);
          } catch {
            books = [];
          }
        }
        const newBook = {
          id: ++id,
          title,
        };

        books.push(newBook);
        if (url.search) {
          try {
            fs.writeFile(filePath, JSON.stringify(books, null, 2), (err) => {
              if (err) {
                res.writeHead(400, { "content-type": "text/plain" });
                res.end("Error data not found");
                books.push(content);
              }
            });
          } catch (err) {
            console.log(err);
          }
        }
      });
    } catch {
      res.writeHead(400, { "content-type": "text/plain" });
      res.end("File Tidak Valid");
    }
  } else {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Hello Testing");
  }
});
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
