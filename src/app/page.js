"use client";
import { useState, useEffect } from "react";

export default function Page() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [inputMinutes, setInputMinutes] = useState("");
  const [inputSeconds, setInputSeconds] = useState("");
  const [showTimer, setShowTimer] = useState(true);
  const [isExploded, setIsExploded] = useState(false);
  const [isChristmas] = useState(true);

  useEffect(() => {
    let timer;
    const audio = (filename) => new Audio(`/assets/${filename}`).play();
    const handleSpace = (e) => e.code === "Space" && audio("AK47_Fire1.wav");

    if (isRunning) {
      timer = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 0) {
            if (minutes === 0) {
              clearInterval(timer);
              setIsExploded(true);
              audio("explode.wav");
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
  }, [isRunning, minutes]);

  const startTimer = () => {
    if ((!inputMinutes && !inputSeconds) || isRunning) return;
    setIsRunning(true);
    setIsExploded(false);
    setMinutes(parseInt(inputMinutes) || 0);
    setSeconds(parseInt(inputSeconds) || 0);
    new Audio("/assets/armbomb.wav").play();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#282828]">
      {!isExploded ? (
        <div className="relative">
          <img
            src={`/assets/bomb${isChristmas ? "_christmas" : ""}.png`}
            alt="bomb"
            className="w-96 cursor-pointer"
          />
          <div className="absolute top-[118px] left-1/2 -translate-x-1/2">
            {!isRunning && (
              <span className="text-[#330000] text-4xl font-mono">00:00</span>
            )}
            <span
              className="text-red-600 text-4xl font-mono"
              style={{
                visibility: showTimer ? "visible" : "hidden",
                textShadow: "0 0 2px red",
              }}
            >
              {isRunning &&
                seconds !== -1 &&
                `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
                  2,
                  "0"
                )}`}
            </span>
          </div>
          {!isRunning && (
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 flex gap-2">
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  value={inputMinutes}
                  onChange={(e) => setInputMinutes(e.target.value)}
                  placeholder="00"
                  className="p-2 rounded w-16 text-black"
                  min="0"
                  max="59"
                />
                <span className="text-white">:</span>
                <input
                  type="number"
                  value={inputSeconds}
                  onChange={(e) => setInputSeconds(e.target.value)}
                  placeholder="00"
                  className="p-2 rounded w-16 text-black"
                  min="0"
                  max="59"
                />
              </div>
              <button
                onClick={startTimer}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Start
              </button>
            </div>
          )}
        </div>
      ) : (
        <img
          src="/assets/explosion2.gif"
          alt="explosion"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
    </div>
  );
}
