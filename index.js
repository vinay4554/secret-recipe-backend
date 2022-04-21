import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";
import dotenv from "dotenv";

const app = express();
// secretrecipe
// secretrecipe123
app.use(cors());
dotenv.config();
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// Declaring Middlewares
app.use("/posts", postRoutes);
app.use("/user", userRoutes);

// connecting To the database

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT || 4000, () => console.log(`Server Started`))
  )
  .catch((err) => console.log(err.message));
