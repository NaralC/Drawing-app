import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

type Draw = {
  color: string;
  curCoor: Coordinates;
  prevCoor: Coordinates | null;
};

type Coordinates = {
  x: number;
  y: number;
};

io.on("connection", (socket) => {
  socket.on("draw-line", ({ prevCoor, curCoor, color }: Draw) => {
    socket.broadcast.emit('draw-line', { prevCoor, curCoor, color })
  });
});
