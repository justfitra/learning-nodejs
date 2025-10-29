/*
Soal 5 — Eksperimen Urutan Middleware

Kamu punya kode berikut:

app.use((req, res, next) => {
  console.log("Middleware A");
  next();
});

app.get("/", (req, res, next) => {
  console.log("Middleware B");
  next();
}, (req, res) => {
  console.log("Handler Route");
  res.send("Done");
});

Pertanyaan:
Urutan log yang muncul di terminal saat kamu buka http://localhost:3000/ adalah apa? 
dari middleware dulu kemudain respons reoute dan yang atas kemudian bawah
*/
import express from "express";

const app = express();
app.use((req, res, next) => {
  console.log("Middleware A");
  next();
});

app.get(
  "/",
  (req, res, next) => {
    console.log("Middleware B");
    next();
  },
  (req, res) => {
    console.log("Handler Route");
    res.send("Done");
  }
);

app.listen(3000);
