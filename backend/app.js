import express from "express";
import user from "./routes/userRoutes.js";
import product from "./routes/productRoutes.js";
import errorHandleMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());
// app.use(fileUpload());
app.use(fileUpload());
app.use(express.urlencoded());

//Route
app.use("/api/v1", user);
app.use("/api/v1", product);

app.use(errorHandleMiddleware);

dotenv.config({ path: "backend/config/config.env" });
export default app;
