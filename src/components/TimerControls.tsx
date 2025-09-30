"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface TimeInput {
  hours: string;
  minutes: string;
  seconds: string;
}

interface TimerControlsProps {
  isRunning: boolean;
  isPaused: boolean;
  isDarkTheme: boolean;
  inputTime: TimeInput;
  handleInputChange: (field: keyof TimeInput) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  startTimer: () => void;
  togglePause: () => void;
  resetTimer: () => void;
}

export default function TimerControls({
  isRunning,
  isPaused,
  isDarkTheme,
  inputTime,
  handleInputChange,
  startTimer,
  togglePause,
  resetTimer
}: TimerControlsProps) {
  return (
    <div className="w-[90vw] max-w-md">
      {!isRunning ? (
        <Card className="p-4">
          <div className="flex items-center justify-center gap-3">
            {/* Hours Input */}
            <div className="flex flex-col items-center gap-2">
              <Input
                type="number"
                value={inputTime.hours}
                onChange={handleInputChange("hours")}
                placeholder="0"
                className="w-12 h-12 text-center text-lg font-bold"
                min="0"
                max="23"
              />
              <span className="text-xs font-bold uppercase tracking-wider">HRS</span>
            </div>

            {/* Separator */}
            <div className="text-2xl font-black self-center">:</div>

            {/* Minutes Input */}
            <div className="flex flex-col items-center gap-2">
              <Input
                type="number"
                value={inputTime.minutes}
                onChange={handleInputChange("minutes")}
                placeholder="0"
                className="w-12 h-12 text-center text-lg font-bold"
                min="0"
                max="59"
              />
              <span className="text-xs font-bold uppercase tracking-wider">MIN</span>
            </div>

            {/* Separator */}
            <div className="text-2xl font-black self-center">:</div>

            {/* Seconds Input */}
            <div className="flex flex-col items-center gap-2">
              <Input
                type="number"
                value={inputTime.seconds}
                onChange={handleInputChange("seconds")}
                placeholder="0"
                className="w-12 h-12 text-center text-lg font-bold"
                min="0"
                max="59"
              />
              <span className="text-xs font-bold uppercase tracking-wider">SEC</span>
            </div>

            {/* Arm Button */}
            <Button
              onClick={startTimer}
              variant="destructive"
              size="lg"
              className="ml-2 text-base font-black tracking-wider"
            >
              💣 ARM
            </Button>
          </div>
        </Card>
      ) : (
        <div className="flex items-center justify-center gap-4">
          <Button
            onClick={togglePause}
            variant={isPaused ? "default" : "secondary"}
            size="lg"
            className="text-base font-black tracking-wider"
          >
            {isPaused ? "▶ RESUME" : "⏸ PAUSE"}
          </Button>
          <Button
            onClick={resetTimer}
            variant="destructive"
            size="lg"
            className="text-base font-black tracking-wider"
          >
            🛡 DEFUSE
          </Button>
        </div>
      )}
    </div>
  );
}