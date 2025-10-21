"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface SoundControlsProps {
  isDarkTheme: boolean;
  isMuted: boolean;
  volume: number;
  showPresets: boolean;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  setShowPresets: (show: boolean) => void;
}

export default function SoundControls({
  isDarkTheme,
  isMuted,
  volume,
  showPresets,
  toggleMute,
  setVolume,
  setShowPresets
}: SoundControlsProps) {
  return (
    <div className="relative md:absolute left-1/2 -translate-x-1/2 w-[90vw] max-w-md md:top-[-12vh]">
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <Button
              onClick={toggleMute}
              variant="ghost"
              size="icon"
              className="text-lg font-black"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? "🔇" : "🔊"}
            </Button>
            
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(parseInt(e.target.value))}
                className="w-24 md:w-20 h-2 bg-gray-300 rounded-none appearance-none cursor-pointer border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                title={`Volume: ${volume}%`}
                style={{
                  background: `linear-gradient(to right, #000 0%, #000 ${volume}%, #ccc ${volume}%, #ccc 100%)`
                }}
              />
              <span className="text-xs font-bold min-w-[32px] bg-yellow-400 px-2 py-1 border-2 border-black">
                {volume}%
              </span>
            </div>
          </div>
          
          <Button
            onClick={() => setShowPresets(!showPresets)}
            variant="secondary"
            className="text-xs font-black tracking-wider w-full md:w-auto"
          >
            ⏱️ {showPresets ? "HIDE" : "PRESETS"}
          </Button>
        </div>
      </Card>
    </div>
  );
}