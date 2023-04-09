import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import ACTIONS from "../client/src/lib/actions";

const app = express();
app.use(cors());
const PORT = 3001;

app.get("/", (req, res) => {
  res.send({ uptime: process.uptime() });
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// const userSocketMap: {
//   [key: string]: string | undefined;
// } = {};
// const getAllConnectedClients = (roomId: string) => {
//   return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
//     (socketId) => {
//       return {
//         socketId,
//         nickname: userSocketMap[socketId],
//       };
//     }
//   );
// };

type DrawLine = {
  color: string;
  curCoor: Coordinates;
};

type Coordinates = {
  x: number;
  y: number;
};

// socket.emit = to everyone except sender
// io.emit = to everyone

io.on("connection", (socket) => {
  socket.on(ACTIONS.NEW_CLIENT, () => {
    socket.broadcast.emit(ACTIONS.GET_CANVAS_STATE);
  });

  socket.on(ACTIONS.DRAW_LINE, ({ color, curCoor }: DrawLine) => {
    socket.broadcast.emit(ACTIONS.DRAW_LINE, { color, curCoor });
  });

  socket.on(ACTIONS.UPDATE_CANVAS_STATE, (canvasState) => {
    console.log('new canvas state', canvasState)
    socket.broadcast.emit(ACTIONS.UPDATE_CANVAS_STATE, {
      canvasState
    })
  });
});

server.listen(PORT, () => {
  console.log(`Running at localhost:${PORT}`);
});
