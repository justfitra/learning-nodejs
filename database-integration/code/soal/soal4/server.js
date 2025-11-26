import app from "./src/app.js";
import { dbConnect } from "./src/config/db.js";
dbConnect();
app.listen(4000);
