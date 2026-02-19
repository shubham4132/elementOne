import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import app from "./app.js";
import { connectMongoDatabase } from "./config/db.js";

connectMongoDatabase();

//connect to the database
console.log("DB URI:", process.env.DB_URI, process.env.PORT);
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`server is running on PORT ${port}`);
});
