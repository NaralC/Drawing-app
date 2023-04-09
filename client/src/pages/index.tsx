"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useMouse, useMove, useEyeDropper } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3001/");

const inter = Inter({ subsets: ["latin"] });
const COOR_RATIO = 1.2435723951285520974289580514208;
const LINE_COLOR = "#000";
const LINE_WIDTH = 5;

export default function Home() {
  const [curCoordinates, setCurCoordinates] = useState({ x: 0, y: 0 });
  const { ref: canvasHoverRef, x, y } = useMouse();
  const { ref: canvasClickRef, active: mouseIsDown } = useMove(({ x, y }) => {
    setCurCoordinates({
      x: (x * 1000) / COOR_RATIO,
      y: (y * 1000) / COOR_RATIO,
    });
  });

  const drawLine = ({ context, curCoor }: Draw) => {
    let startPoint = curCoor;
    context.beginPath();
    context.lineWidth = LINE_WIDTH;
    context.strokeStyle = LINE_COLOR;
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(x, y);
    context.stroke();

    context.fillStyle = LINE_COLOR;
    context.beginPath();
    context.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    context.fill();
  };

  useEffect(() => {
    socket.on("draw-line", ({ color, curCoor }) => {
      drawLine({ context: canvasHoverRef.current?.getContext("2d"), curCoor });
    });

    return () => {
      socket.off("draw-line");
    };
  });

  useEffect(() => {
    socket.emit("draw-line", {
      color: LINE_COLOR,
      curCoor: curCoordinates,
    });
  }, [canvasClickRef, curCoordinates])

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-200">
        <div ref={canvasClickRef}>
          <canvas
            onMouseDown={() => {
              drawLine({
                context: canvasHoverRef.current?.getContext("2d"),
                curCoor: curCoordinates,
              });
            }}
            ref={canvasHoverRef}
            width={800}
            height={800}
            className="mx-auto border-2 border-collapse border-sky-500"
          />
        </div>
        <div className="text-3xl">
          Mouse coordinates {`{ x: ${x}, y: ${y} }`}
        </div>
        <div className="text-3xl">
          Last clicked mouse coordinates{" "}
          {`{ x: ${curCoordinates.x}, y: ${curCoordinates.y} }`}
        </div>
      </div>
    </>
  );
}
