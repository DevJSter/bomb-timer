"use client";
import React from "react";
import { Card } from "@/components/ui/card";

interface FooterProps {
  isDarkTheme: boolean;
  isExploded: boolean;
}

export default function Footer({ isDarkTheme, isExploded }: FooterProps) {
  if (isExploded) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-10">
      <div className="max-w-4xl mx-auto">
        <Card className="p-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 rounded-none text-xs font-bold bg-yellow-400 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                SPACE
              </kbd>
              <span className="font-bold">START / GUN SOUND</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 rounded-none text-xs font-bold bg-green-400 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                P
              </kbd>
              <span className="font-bold">PAUSE/RESUME</span>
            </div>
            <div className="flex items-center gap-2">
              <kbd className="px-2 py-1 rounded-none text-xs font-bold bg-red-400 text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                ESC
              </kbd>
              <span className="font-bold">DEFUSE/RESET</span>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold">
              <span>🎯 FOCUS TIMER</span>
              <span>•</span>
              <span>🍅 POMODORO</span>
              <span>•</span>
              <span>⚡ PRODUCTIVITY</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}