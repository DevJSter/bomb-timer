"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PresetButtonsProps {
  showPresets: boolean;
  isDarkTheme: boolean;
  setPresetTimer: (hours: number, minutes: number, seconds: number) => void;
  className?: string;
}

export default function PresetButtons({
  showPresets,
  isDarkTheme,
  setPresetTimer,
  className = ""
}: PresetButtonsProps) {
  return (
    <div className={`overflow-hidden transition-all duration-300 ease-in-out mt-6 md:mt-8 mb-4 ${
      showPresets ? "max-h-48 md:max-h-32 opacity-100" : "max-h-0 opacity-0"
    } ${className}`}>
      <Card className="p-4">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Button
            onClick={() => setPresetTimer(0, 5, 0)}
            variant="success"
            size="lg"
            className="flex flex-col items-center gap-1 h-16 text-xs font-black"
          >
            <span className="text-lg">☕</span>
            <span>5 MIN</span>
          </Button>
          <Button
            onClick={() => setPresetTimer(0, 15, 0)}
            variant="outline"
            size="lg"
            className="flex flex-col items-center gap-1 h-16 text-xs font-black bg-blue-400 text-black border-black hover:bg-blue-500"
          >
            <span className="text-lg">💪</span>
            <span>15 MIN</span>
          </Button>
          <Button
            onClick={() => setPresetTimer(0, 25, 0)}
            variant="destructive"
            size="lg"
            className="flex flex-col items-center gap-1 h-16 text-xs font-black"
          >
            <span className="text-lg">🍅</span>
            <span>25 MIN</span>
          </Button>
          <Button
            onClick={() => setPresetTimer(1, 0, 0)}
            variant="outline"
            size="lg"
            className="flex flex-col items-center gap-1 h-16 text-xs font-black bg-purple-400 text-black border-black hover:bg-purple-500"
          >
            <span className="text-lg">🧠</span>
            <span>1 HOUR</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}