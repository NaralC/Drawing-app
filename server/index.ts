import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());
const PORT =  3001;

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

io.on("connection", (socket) => {
  socket.on("draw-line", ({ color, curCoor }: DrawLine) => {
    socket.broadcast.emit('draw-line', { color, curCoor })
  });
});

server.listen(PORT, () => {
  console.log(`Running at localhost:${PORT}`);
});
