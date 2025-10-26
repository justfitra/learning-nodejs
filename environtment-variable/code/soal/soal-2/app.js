import { dbConfig } from "./config/db.js";
import http from "http";

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname === "/data") {
    const key = url.searchParams.get("key");

    if (key.trim() === dbConfig.api_key) {
      res.writeHead(200, "OK", { "content-type": "text/plain" });
      res.end("Akses Diterima✅");
    } else {
      res.writeHead(403, "Forbidden", { "content-type": "text/plain" });
      res.end("Akses Ditolak❌");
    }
  } else {
    res.writeHead(200, "OK", { "content-type": "text/plain" });
    res.end("Welcome to my server");
  }
});

server.listen(dbConfig.port, () => {
  console.log(`Server running at http://${dbConfig.host}:${dbConfig.port}`);
});
