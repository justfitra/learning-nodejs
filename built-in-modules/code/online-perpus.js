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
      const idParams = url.searchParams.get("id");
      if (!title && idParams) {
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            return res.end("Gagal membacaa data.");
          }

          const dtBook = JSON.parse(data);
          const bookFill = dtBook.filter((res) => res.id === Number(idParams));
          res.writeHead(200, { "Content-Type": "text/plain" });
          return res.end(JSON.stringify(bookFill));
        });
      } else if (title && !idParams) {
        fs.readFile(filePath, "utf8", (err, data) => {
          let books = [];
          if (!err && data) {
            try {
              if (!idParams) {
                books = JSON.parse(data);
              }
            } catch {
              books = [];
            }
          }

          const newBook = {
            id: ++id,
            title,
          };

          books.push(newBook);

          fs.writeFile(
            filePath,
            JSON.stringify(books, null, 2),
            "utf8",
            (err) => {
              if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                return res.end("Gagal menulis data.");
              }

              res.writeHead(200, { "Content-Type": "application/json" });
              res.end(JSON.stringify(newBook, null, 2));
            }
          );
        });
      }
    } catch {
      res.writeHead(400, { "content-type": "text/plain" });
      res.end("File Tidak Valid");
    }
  } else {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        res.writeHead(500, { "content-type": "text/plain" });
        res.end("Data Not Found");
      }

      if (!data) {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end("Belum Ada Buku");
      }
      if (data) {
        res.writeHead(200, { "content-type": "text/plain" });
        res.end(data);
      }
    });
  }
});
server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
