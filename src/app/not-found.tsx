"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotFound() {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    // Random blink effect for the cat
    let timeoutId: NodeJS.Timeout;

    const blink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150); // Eyes closed for 150ms

      // Schedule next blink randomly between 2 and 6 seconds
      const nextBlinkTime = Math.random() * 4000 + 2000;
      timeoutId = setTimeout(blink, nextBlinkTime);
    };

    timeoutId = setTimeout(blink, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-10 px-4">
      {/* ASCII Cat Container */}
      <div className="relative group select-none">
        <pre className="font-mono text-4xl sm:text-5xl md:text-6xl leading-tight text-zinc-300 transition-colors duration-300 group-hover:text-blue-400">
          {`   /\\_/\\  `}
          <br />
          {`  ( ${isBlinking ? "-.-" : "o.o"} ) `}
          <br />
          {`   > ^ <  `}
        </pre>
      </div>

      <div className="text-center space-y-4 max-w-md">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100">
          404 Not Found
        </h1>
      </div>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-medium rounded-xl transition-all border border-zinc-700 hover:border-zinc-500 shadow-sm group active:scale-95"
      >
        <span className="group-hover:-translate-x-1 transition-transform">
          ←
        </span>
        <span>Return to Territory</span>
      </Link>
    </div>
  );
}
