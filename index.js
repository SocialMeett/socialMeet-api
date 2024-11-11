import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";
import circleRouter from "./routes/circle.js";

// connect to database
await mongoose.connect(process.env.MONGO_URI);

// create express app
const app = express();

// use middlewares
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(circleRouter);

// create and listen on server

app.listen(4000, () => {
  console.log("App is listening  on port 4000");
});
