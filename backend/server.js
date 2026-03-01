import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });
import app from "./app.js";
import { connectMongoDatabase } from "./config/db.js";
import { v2 as cloudinary } from "cloudinary";
connectMongoDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

//connect to the database
console.log("DB URI:", process.env.DB_URI, process.env.PORT);
const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`server is running on PORT ${port}`);
});
