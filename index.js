import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";

// connect to database
await mongoose.connect(process.env.MONGO_URI);

// create express app
const app = express();

// // create a single http server using the express app
// const server = http.createServer(app);

// set up the socket.io  on the same server

// use middlewares
app.use(express.json());
app.use(cors());
app.use(userRouter);

// create and listen on server

app.listen(4000, () => {
  console.log("App is listening  on port 4000");
});
