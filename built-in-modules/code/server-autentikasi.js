/*
Studi Kasus 4: Server Autentikasi Manual

Kamu bikin server mini untuk login tanpa database:

POST /login?username=fitra&password=123

Jika cocok dengan data statis di kode (fitra, 123), balas “Login berhasil!”

Jika salah, balas status 401 Unauthorized

GET / → tampilkan “Silakan login untuk lanjut.”

Tujuan: paham alur HTTP method GET vs POST, validasi data, dan status autentikasi.
*/

import http from "http";

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://$${req.headers.host}`);

  if (url.pathname === "/" && req.method === "GET") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("Silakan login untuk lanjut.");
  } else if (url.pathname === "/login" && req.method === "POST") {
    const username = url.searchParams.get("username");
    const password = url.searchParams.get("password");
    const user = {
      username: "fitra",
      password: 123,
    };

    if (username !== user.username || Number(password) !== user.password) {
      res.writeHead(401, { "content-type": "text/plain" });
      res.end("Unauthorized");
    }

    if (username === user.username && Number(password) === user.password) {
      res.writeHead(200, { "content-type": "text/plain" });
      res.end("Login Successfully");
    }
  }
});

server.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
