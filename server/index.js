import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { errorResponserHandler, invalidPathHandler } from "./middleware/errorHandler.js";
import blogRouters from "./routes/blogRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// users routes
app.use("/api/user", userRoutes);

app.use("/api/blog", blogRouters)

// order in which they are defined is important and next function is for triggering middleware/nextRoutes
app.use(errorResponserHandler)
app.use(invalidPathHandler)

app.listen(process.env.PORT || 8000, () => {
  connectDB();
  console.log(`listning... at http://localhost:${process.env.PORT || 8000}`);
});
