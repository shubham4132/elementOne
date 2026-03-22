import express from "express";
import cors from "cors";
import user from "./routes/userRoutes.js";
import product from "./routes/productRoutes.js";
import order from "./routes/orderRoutes.js";
import wishList from "./routes/wishlistRoutes.js";
import payment from "./routes/paymentRoutes.js";
import errorHandleMiddleware from "./middleware/error.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import fileUpload from "express-fileupload";
const app = express();

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = ["http://localhost:5173"];
      // Vercel ke saare URLs allow karo
      if (
        !origin ||
        allowedOrigins.includes(origin) ||
        origin.endsWith(".vercel.app")
      ) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

//Middleware
app.use(express.json());
app.use(cookieParser());
// app.use(fileUpload());
app.use(fileUpload());
app.use(express.urlencoded());

//Route
app.use("/api/v1", user);
app.use("/api/v1", product);
app.use("/api/v1", order);
app.use("/api/v1", wishList);

app.use("/api/v1", payment);

app.use(errorHandleMiddleware);

dotenv.config({ path: "backend/config/config.env" });
export default app;
