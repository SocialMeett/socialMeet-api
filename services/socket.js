// handle socket events
export const handleEvents = (socket, io) => {
  socket.on("message", (msg) => {
    console.log("message received: ${msg}");
    // emit to send message to all connected user
    io.emit("message", msg);
  });
  //listening for event: circle join
  socket.on("circle:join", (circleId) => {
    console.log(`User ${socket} joined circle ${circleId}`);
    // adding user to specific circle
    socket.join(circleId);
    io.to(circleId).emit("circle:join", `User ${socket.id} joined the circle`);
  });

  // handle disconnection, triggered when user disconnects from the server
  socket.on("disconnect", () => {
    console.log("user wth socket ID ${socket.id} disconnected");
  });
};
