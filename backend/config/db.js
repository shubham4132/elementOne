import mongoose from "mongoose";
export const connectMongoDatabase = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(() => console.log("mongoDB connected"))
    .catch((error) => console.log(error));
};
