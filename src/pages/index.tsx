"use client";

import Image from "next/image";
import { Inter } from "next/font/google";
import { useDraw } from "@/hooks/useDraw";
import { useMouse, useMove, useEyeDropper } from "@mantine/hooks";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const COOR_RATIO = 1.2435723951285520974289580514208;

export default function Home() {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const { ref: canvasHoverRef, x, y } = useMouse();
  const { ref: canvasClickRef, active } = useMove(({ x, y }) => {
    setCoordinates({ x: (x * 1000) / COOR_RATIO, y: (y * 1000) / COOR_RATIO });
  });

  function drawLine() {
    canvasHoverRef.current.stroke();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-200">
        <div ref={canvasClickRef}>
          <canvas
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
          {`{ x: ${(coordinates.x)}, y: ${(
            coordinates.y
          )} }`}
        </div>
      </div>
    </>
  );
}
