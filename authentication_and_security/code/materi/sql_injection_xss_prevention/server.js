import express from "express";
import pool from "./src/config/db.js";

const app = express();
app.use(express.json());
app.get("/:email", async (req, res) => {
  try {
    const email = req.params.email;
    const result = await pool.query("SELECT * FROM users where email = $1", [
      email,
    ]);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
