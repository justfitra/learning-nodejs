import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello this is my server with express");
});

app.post("/", (req, res) => {
  res.send("Got a POST request");
});

app.put("/user", (req, res) => {
  res.send(`Got a ${req.method}`);
});

app.delete("/user", (req, res) => {
  res.send(`Got a delete`);
});

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});

// Route bisa menggunakan *

// app.get("/us*er", (req, res) => {
//   res.send(`Hello this is user with method ${req.method}`); // is true (ini sah sah saja digunakan), tetapi akan ketika anda membuat route baru dengan ada isi parameternya maka route tersebut tidak akan tereksekusi karena  route yang ada * yang akan tereksekusi terlebih dahulu
// });

// Route akan error ketika menggunakan (?,+,(shomenting),)
// ketika menggunakan (/.*fly$/) route tidak error, tetapi akan sulit jika di gunakan untuk real project

app.get("/.*fly$/", (req, res) => {
  res.send(`Hello this is profile page with method ${req.method}`);
});

// Route Parameters

// Kalian bisa menggunakan path ini (/users/:userId/books/:bookId) jika kalian punya 1 atau lebih paramater
app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(`${req.params.male} and ${req.params.female}`);
});

// Atau kalian bisa menggunakan path ini (/ride/:from-:to) menggunakan simbol (-)
app.get("/ride/:from-:to", (req, res) => {
  res.send(`${req.params.male} and ${req.params.female}`);
});

// Atau kalian bisa juga menggunakan (.) dengan path (/gender/:male.:female)
app.get("/gender/:male.:female", (req, res) => {
  res.send(`${req.params.male} and ${req.params.female}`);
});

// Route Handlers
