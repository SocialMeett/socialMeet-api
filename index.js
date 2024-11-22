import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRouter from "./routes/user.js";
import circleRouter from "./routes/circle.js";
import { Server } from "socket.io";
import http from "http";
import { handleEvents } from "./services/socket.js";
import locationRouter from "./routes/location.js";

// connect to database
await mongoose.connect(process.env.MONGO_URI);

// create express app
const app = express();

// create an http server using express app
const server = http.createServer(app);

// attach socket.io to the http server
const io = new Server(server);

// listen for client connections
io.on("connection", (socket) => {
  console.log("A user connected with socket ID", socket.id);
  handleEvents(socket, io);
});

// use middlewares
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(circleRouter);
app.use(locationRouter);

// create and listen on server

server.listen(7000, () => {
  console.log("App is listening  on port 7000");
});
