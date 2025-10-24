import http from "http";
import fs from "fs";

const port = 3000;
const hostname = `localhost`;

async function createFile(user, text) {
  try {
    const date = new Date();
    await fs.promises.appendFile(
      `notes_${user}.txt`,
      `${date.toISOString().split("T")[0]} | ${text} \n`,
      "utf8"
    );

    return "Data Successfully Added";
  } catch (err) {
    throw err;
  }
}

async function getData(user) {
  try {
    await fs.promises.access(`notes_${user}.txt`);

    const data = await fs.promises.readFile(`notes_${user}.txt`, "utf8");
    if (!data.trim()) {
      throw new Error("Data Not Found");
    }
    return data;
  } catch (err) {
    if (err.code === "ENOENT") {
      throw new Error(`Data with user ${user} not found`);
    }
    throw err;
  }
}
const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  const method = req.method;

  if (url.pathname === "/" && method === "GET") {
    res.writeHead(200, "OK", { "content-type": "text/plain" });
    res.end("Hello Wellcome");
  } else if (url.pathname === "/save" && method === "POST") {
    const text = url.searchParams.get("text");
    const user = url.searchParams.get("user");
    if (!text || !user) {
      res.writeHead(400, "Bad Request", { "content-type": "text/plain" });
      return res.end("User and Text must be required");
    }
    createFile(user, text)
      .then((result) => {
        res.writeHead(201, "Created", { "content-type": "text/plain" });
        res.end(result);
      })
      .catch((err) => {
        res.writeHead(400, "Bad Request", { "content-type": "text/plain" });
        res.end(err.message);
      });
  } else if (url.pathname === "/notes" && method === "GET") {
    const user = url.searchParams.get("user");

    if (!user) {
      res.writeHead(400, "Bad Request", { "content-type": "text/plain" });
      return res.end("user must be required");
    }
    getData(user)
      .then((result) => {
        res.writeHead(200, "OK", { "content-type": "text/plain" });
        res.end(result);
      })
      .catch((err) => {
        res.writeHead(404, "Not Found", { "content-type": "text/plain" });

        res.end(err.message);
      });
  }
});

server.listen(port, () => {
  console.log(`server running at http://${hostname}:${port}`);
});
