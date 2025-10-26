// Buat aplikasi mini bernama note-api dengan ketentuan:

// Port, host, dan API key disimpan di .env

// Endpoint /save?text=...&key=...

// Cek dulu key apakah cocok dengan API_KEY

// Jika cocok, simpan text ke notes.txt

// Jika tidak cocok, kirim 403 Forbidden

// Gunakan async/await dan fs.promises

import { config } from "./config.mjs";
import http from "http";
import fs from "fs";

const fileOperation = async (data) => {
  try {
    if (!data) {
      throw new Error("Please input data first");
    }
    await fs.promises.appendFile(config.db_url, data, "utf8");

    return "File Successfully Added";
  } catch (err) {
    throw err;
  }
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const method = req.method;

  if (url.pathname === "/" && method === "GET") {
    res.writeHead(200, "OK", { "content-type": "text/plain" });
    res.end("Wellcome to notes server");
  } else if (url.pathname === "/save" && method === "POST") {
    try {
      const text = url.searchParams.get("text");
      const key = url.searchParams.get("key");

      if (config.api_key !== key) {
        res.writeHead(403, "Forbidden", { "content-type": "text/plain" });
        return res.end("Key must be failed");
      }

      fileOperation(text)
        .then((result) => {
          res.writeHead(201, "Created", { "content-type": "text/plain" });
          res.end(result);
        })
        .catch((err) => {
          res.writeHead(400, "Bad Request", { "content-type": "text/plain" });
          res.end(err.message);
        });
    } catch (err) {
      console.log(err);
    }
  }
});

server.listen(config.port, () => {
  console.log(`Server runinng at http://${config.host}:${config.port}`);
});
