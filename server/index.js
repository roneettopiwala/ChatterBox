const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);
const users = {}
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {

  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {

    const messageData = 
    {author: data.author, 
    message: data.message, 
    room: data.room};
    
    socket.to(data.room).emit("receive_message", messageData);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});