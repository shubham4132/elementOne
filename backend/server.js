import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config/config.env" });

const app = express();

const port = 3000;

//connect to the database
mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("mongoDB connected"))
  .catch((error) => console.log(error));
app.listen(port, () => {
  console.log(`server is running on PORT ${port}`);
});
