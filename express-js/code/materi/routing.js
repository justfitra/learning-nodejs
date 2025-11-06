import express from "express";
import bird from "./bird.js";

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

app.get(/.*fly$/, (req, res) => {
  res.send(`Hello this is profile page with method ${req.method}`);
});

// Route Parameters

// Kalian bisa menggunakan path ini (/users/:userId/books/:bookId) jika kalian punya 1 atau lebih paramater
app.get("/users/:userId/books/:bookId", (req, res) => {
  res.send(`${req.params.userId} and ${req.params.bookId}`);
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

// Satu / Singgle callback

app.get("/single/a", (req, res) => {
  res.send("Hello");
});

// Lebih dari satu callback bisa menggunakan next()

app.get(
  "/much/b",
  (req, res, next) => {
    console.log("ini akan di eksekusi bersamaan dengan callback");
    // jika menaruh respon send disini kemungkinan akan muncul ini karena di eksekusi secara bersamaan dengan respon setelah next() dan akan terjadi error
    next();
  },
  (req, res) => {
    res.send("Hallo ini adalah B");
  }
);

// Callback bisa mnggunakan array sebuah function, untuk handle route

const cb0 = (req, res, next) => {
  console.log("cb-0");
  next();
};
const cb1 = (req, res, next) => {
  console.log("cb-1");
  next();
};
const cb2 = (req, res, next) => {
  res.send("cb-2");
};

app.get("/example/c", [cb0, cb1, cb2]);

// Atau

const cb3 = (req, res, next) => {
  console.log("cb-3");
  next();
};

const cb4 = (req, res, next) => {
  console.log("cb-4");
  next();
};

app.get(
  "/example/d",
  [cb3, cb4],
  (req, res, next) => {
    console.log(`ini akan di eksekusi bersamaan dengan callback dan array`);
    next();
  },
  (req, res) => {
    res.send("Hallo dari d");
  }
);

// untuk route juga bisa menngunakan app.route() yang menurut saya juga lebih simpel tapi sesuaikan kebutuhan juga

app
  .route("/book")
  .get((req, res) => {
    res.send("Hello");
  })
  .post((req, res) => {
    res.send("this is post method");
  })
  .put((req, res) => {
    res.json({
      name: "fitra",
    });
  })
  .delete((req, res) => {
    res.send("this is delete");
  });

app.use("/birds", bird);
