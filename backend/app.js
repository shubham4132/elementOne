import express from "express";
import user from "./routes/userRoutes.js";
import errorHandleMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
const app = express();

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Route
app.use("/api/v1", user);

app.use(errorHandleMiddleware);

dotenv.config({ path: "backend/config/config.env" });
export default app;
