"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useMouse, useMove, useEyeDropper } from "@mantine/hooks";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const COOR_RATIO = 1.2435723951285520974289580514208;
const LINE_COLOR = "#000";
const LINE_WIDTH = 5;

export default function Home() {
  const [curCoordinates, setCurCoordinates] = useState({ x: 0, y: 0 });
  const [prevCoordinates, setPrevCoordinates] = useState<typeof curCoordinates | null>(null);
  const { ref: canvasHoverRef, x, y } = useMouse();
  const { ref: canvasClickRef, active: mouseIsDown } = useMove(({ x, y }) => {
    setCurCoordinates({ x: (x * 1000) / COOR_RATIO, y: (y * 1000) / COOR_RATIO });
  });

  const drawLine = (prevCoor: Coordinates) => {
    const canvasContext = canvasHoverRef.current?.getContext("2d");

    let startPoint = prevCoor ?? { x, y };
    canvasContext.beginPath();
    canvasContext.lineWidth = LINE_WIDTH;
    canvasContext.strokeStyle = LINE_COLOR;
    canvasContext.moveTo(startPoint.x, startPoint.y);
    canvasContext.lineTo(x, y);
    canvasContext.stroke();

    canvasContext.fillStyle = LINE_COLOR;
    canvasContext.beginPath();
    canvasContext.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
    canvasContext.fill();

    setPrevCoordinates(curCoordinates)
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-200">
        <div ref={canvasClickRef}>
          <canvas
            onMouseDown={() => {
              drawLine({ x: curCoordinates.x, y: curCoordinates.y });
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
