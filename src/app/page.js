"use client";
import React, { useState, useEffect } from "react";

export default function Page() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState("");
  const [inputSeconds, setInputSeconds] = useState("");
  const [showTimer, setShowTimer] = useState(true);
  const [isExploded, setIsExploded] = useState(false);
  const [isChristmas] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    let timer;
    const audio = (filename) => new Audio(`/assets/${filename}`).play();
    const handleSpace = (e) => e.code === "Space" && audio("AK47_Fire1.wav");

    if (isRunning && !isPaused) {
      timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 0) {
            if (minutes === 0) {
              clearInterval(timer);
              setIsExploded(true);
              audio("explode.wav");
              setTimeout(() => resetTimer(), 2000);
              return -1;
            }
            setMinutes((m) => m - 1);
            return 59;
          }
          minutes === 0 && prev <= 10 && prev > 0 && audio("beep.wav");
          minutes === 0 && prev === 0 && audio("doublebeep.wav");
          return prev - 1;
        });
      }, 1000);
    }

    window.addEventListener("keyup", handleSpace);
    return () => {
      clearInterval(timer);
      window.removeEventListener("keyup", handleSpace);
    };
  }, [isRunning, minutes, isPaused]);

  const startTimer = () => {
    if ((!inputMinutes && !inputSeconds) || isRunning) return;
    setIsRunning(true);
    setIsExploded(false);
    setMinutes(parseInt(inputMinutes) || 0);
    setSeconds(parseInt(inputSeconds) || 0);
    setIsPaused(false);
    new Audio("/assets/armbomb.wav").play();
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
    new Audio("/assets/beep.wav").play();
  };

  const resetTimer = () => {
    setIsExploded(false);
    setTimeout(() => {
      setIsRunning(false);
      setInputMinutes("");
      setInputSeconds("");
      setMinutes(0);
      setSeconds(0);
      setIsPaused(false);
      new Audio("/assets/doublebeep.wav").play();
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-zinc-800 to-zinc-900">
      {!isExploded ? (
        <div
          style={{ animation: "fadeIn 0.5s ease-out forwards" }}
          className="relative group opacity-0"
        >
          <img
            src={`/assets/bomb${isChristmas ? "_christmas" : ""}.png`}
            alt="bomb"
            className="w-96 transition-transform group-hover:scale-105"
          />
         
          <div className="absolute top-[114px] left-[182px] -translate-x-1/2 md:top-[119px] md:left-[185px]">
            <div>
              {!isRunning && (
                <span className="text-[#330000] text-3xl md:text-4xl font-mono font-bold">
                  00:00
                </span>
              )}
              <span
                className={`text-red-600 text-3xl md:text-4xl font-mono font-bold ${
                  minutes === 0 && seconds <= 10 && isRunning
                    ? "animate-pulse"
                    : ""
                }`}
                style={{
                  visibility: showTimer ? "visible" : "hidden",
                  textShadow: "0 0 4px red",
                }}
              >
                {isRunning &&
                  seconds !== -1 &&
                  `${String(minutes).padStart(2, "0")}:${String(
                    seconds
                  ).padStart(2, "0")}`}
              </span>
            </div>
          </div>
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 flex flex-col gap-4 w-full max-w-xs">
            {!isRunning ? (
              <div className="flex gap-2 items-center justify-center bg-black/30 p-4 rounded-lg backdrop-blur">
                <input
                  type="number"
                  value={inputMinutes}
                  onChange={(e) => setInputMinutes(e.target.value)}
                  placeholder="00"
                  className="w-20 p-2 text-center rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="0"
                  max="59"
                />
                <span className="text-white text-2xl">:</span>
                <input
                  type="number"
                  value={inputSeconds}
                  onChange={(e) => setInputSeconds(e.target.value)}
                  placeholder="00"
                  className="w-20 p-2 text-center rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-red-500"
                  min="0"
                  max="59"
                />
                <button
                  onClick={startTimer}
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Arm
                </button>
              </div>
            ) : (
              <div className="flex gap-2 justify-center">
                <button
                  onClick={togglePause}
                  className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                >
                  {isPaused ? "Resume" : "Pause"}
                </button>
                <button
                  onClick={resetTimer}
                  className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Defuse
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-black">
          <img
            src="/assets/explosion2.gif"
            alt="explosion"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}