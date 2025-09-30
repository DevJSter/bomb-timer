"use client";
import React from "react";
import { Button } from "@/components/ui/button";

interface ThemeToggleProps {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

export default function ThemeToggle({ isDarkTheme, toggleTheme }: ThemeToggleProps) {
  return (
    <Button
      onClick={toggleTheme}
      variant={isDarkTheme ? "secondary" : "outline"}
      size="icon"
      className={`absolute top-4 right-4 text-lg font-black ${
        isDarkTheme 
          ? "bg-yellow-400 text-black border-black hover:bg-yellow-500" 
          : "bg-white text-black border-black hover:bg-gray-100"
      }`}
      title={isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
    >
      {isDarkTheme ? "☀️" : "🌙"}
    </Button>
  );
}