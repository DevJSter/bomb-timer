"use client";
import React from "react";
import Image from "next/image";

interface BombDisplayProps {
  isChristmas: boolean;
  hours: number;
  minutes: number;
  seconds: number;
  isRunning: boolean;
  isDarkTheme: boolean;
  formatTime: (h: number, m: number, s: number) => string;
  showTimer: boolean;
}

export default function BombDisplay({
  isChristmas,
  hours,
  minutes,
  seconds,
  isRunning,
  isDarkTheme,
  formatTime,
  showTimer
}: BombDisplayProps) {
  return (
    <div
      style={{ animation: "fadeIn 0.5s ease-out forwards" }}
      className="relative group opacity-0"
    >
      <Image
        src={`/assets/bomb${isChristmas ? "_christmas" : ""}.png`}
        alt="bomb"
        width={384}
        height={384}
        className={`w-96 transition-all duration-300 group-hover:scale-105 ${
          hours === 0 && minutes === 0 && seconds <= 5 && isRunning ? "animate-pulse" : ""
        }`}
        priority
      />
     
      <div className="absolute top-[114px] left-[182px] -translate-x-1/2 md:top-[119px] md:left-[185px]">
        <div className="bg-black border-2 border-white rounded-none px-2 py-1 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
          {!isRunning && (
            <span className="text-lg md:text-xl font-black tracking-wider text-green-400 drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)]">
              SET FOCUS
            </span>
          )}
          <span
            className={`text-red-400 text-lg md:text-xl font-black tracking-wider drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)] ${
              hours === 0 && minutes === 0 && seconds <= 10 && isRunning
                ? "animate-pulse"
                : ""
            }`}
            style={{
              visibility: showTimer ? "visible" : "hidden",
            }}
          >
            {isRunning && seconds >= 0 && formatTime(hours, minutes, seconds)}
          </span>
        </div>
      </div>
    </div>
  );
}