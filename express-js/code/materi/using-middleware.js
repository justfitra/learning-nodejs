import express from "express";

const app = express();
const router = express.Router();

router.use((req, res, next) => {
  console.log(`Time : ${new Date().toISOString()}`);
  next();
});

router.use(
  "/users/:id",
  (req, res, next) => {
    console.log(`Req URL : `, req.originalUrl);

    next();
  },
  (req, res, next) => {
    console.log(`Req URL : `, req.params.id);
    next();
  }
);

// a middleware sub-stack that handles GET requests to the /user/:id path
router.get(
  "/user/:id",
  (req, res, next) => {
    // if the user ID is 0, skip to the next router
    if (req.params.id === "0") next("route");
    // otherwise pass control to the next middleware function in this stack
    else next();
  },
  (req, res, next) => {
    // render a regular page
    res.render("regular");
  }
);

// handler for the /user/:id path, which renders a special page
router.get("/user/:id", (req, res, next) => {
  console.log(req.params.id);
  res.render("special");
});

// mount the router on the app
app.use("/", router);

app.listen(3000);
