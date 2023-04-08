import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center w-screen min-h-screen bg-gray-200">
        <canvas width={800} height={800} className="mx-auto border-2 border-collapse border-sky-500"/>
      </div>
    </>
  );
}
