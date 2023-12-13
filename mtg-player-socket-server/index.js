const { createServer } = require("http");
const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5173", "https://admin.socket.io"],
    credentials: true,
  },
});

const httpServer = createServer();

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("join-game", (room, callback) => {
    socket.join(room);
    callback(`Joined ${room}`);
  });

  socket.on("next-turn", (data, room) => {
    if (room) {
      console.log("socket.on ~ data:", data);
      console.log("socket.on ~ room:", room);
      // io.emit("next-turn", data); // send to all
      //   socket.broadcast.emit("next-turn", data); // send to all except sender
      socket.to(room).emit("next-turn", data); // send to all except sender
    }
  });

  socket.on("get-board-state", (room) => {
    console.log("GET-BOARD-STATE", room);
    if (room) {
      socket.to(room).emit("get-board-state"); // send to all except sender
    }
  });

  socket.on("push-board-state", (board, room) => {
    console.log("PUSH-BOARD-STATE");
    if (room) {
      socket.to(room).emit("pull-board-state", board); // send to all except sender
    }
  });

  socket.on("update-board", (board, room) => {
    console.log("UPDATE-BOARD");
    if (room) {
      socket.to(room).emit("update-board", board); // send to all except sender
    }
  });

  socket.on("updated-board", (board, room) => {
    console.log("UPDATED-BOARD");
    if (room) {
      socket.to(room).emit("updated-board", board); // send to all except sender
    }
  });

  // socket.on("push-initial-board-state", (board, room) => {
  //   if (room) {
  //     console.log("PUSHED BOARD STATE");
  //     // io.emit("next-turn", data); // send to all
  //     //   socket.broadcast.emit("next-turn", data); // send to all except sender
  //     socket.to(room).emit("pull-initial-board-state", board); // send to all except sender
  //   }
  // });

  // socket.on("update-host-board", (board, room) => {
  //   if (room) {
  //     console.log("update-host-board");
  //     // io.emit("next-turn", data); // send to all
  //     //   socket.broadcast.emit("next-turn", data); // send to all except sender
  //     socket.to(room).emit("update-host-board", board); // send to all except sender
  //   }
  // });

  // socket.on("board-state", (board, room) => {
  //   if (room) {
  //     console.log("BOARD STATE");
  //     // io.emit("next-turn", data); // send to all
  //     //   socket.broadcast.emit("next-turn", data); // send to all except sender
  //     console.log("socket.on ~ board:", board);
  //     socket.to(room).emit("board-state", board); // send to all except sender
  //   }
  // });
});

instrument(io, { auth: false, mode: "development" });

// https://admin.socket.io/#/
