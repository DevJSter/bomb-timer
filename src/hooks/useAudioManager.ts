"use client";
import { useCallback } from "react";

interface AudioManagerProps {
  volume: number;
  isMuted: boolean;
}

export function useAudioManager({ volume, isMuted }: AudioManagerProps) {
  const playAudio = useCallback((filename: string): void => {
    if (isMuted) return;
    try {
      const audio = new Audio(`/assets/${filename}`);
      audio.volume = volume / 100;
      audio.play();
    } catch (error) {
      console.warn(`Could not play audio: ${filename}`, error);
    }
  }, [volume, isMuted]);

  return { playAudio };
}