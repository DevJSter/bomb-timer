"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface TimeInput {
  hours: string;
  minutes: string;
  seconds: string;
}

export default function Page(): React.JSX.Element {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [inputTime, setInputTime] = useState<TimeInput>({
    hours: "",
    minutes: "",
    seconds: ""
  });
  const [showTimer, setShowTimer] = useState<boolean>(true);
  const [isExploded, setIsExploded] = useState<boolean>(false);
  const [isChristmas] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(true);
  const [volume, setVolume] = useState<number>(50);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [streak, setStreak] = useState<number>(0);
  const [showPresets, setShowPresets] = useState<boolean>(false);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

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

  const resetTimer = useCallback((): void => {
    setIsExploded(false);
    setTimeout(() => {
      setIsRunning(false);
      setInputTime({ hours: "", minutes: "", seconds: "" });
      setHours(0);
      setMinutes(0);
      setSeconds(0);
      setIsPaused(false);
      playAudio("doublebeep.wav");
    }, 1000);
  }, [playAudio]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    
    const handleKeyboard = (e: KeyboardEvent): void => {
      if (e.code === "Space" && !isRunning) {
        e.preventDefault();
        startTimer();
      } else if (e.code === "Space" && isRunning) {
        playAudio("AK47_Fire1.wav");
      } else if (e.code === "Escape" && isRunning) {
        e.preventDefault();
        resetTimer();
      } else if (e.code === "KeyP" && isRunning) {
        e.preventDefault();
        togglePause();
      }
    };

    if (isRunning && !isPaused) {
      timer = setInterval(() => {
        setSeconds((prevSeconds: number) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              if (hours === 0) {
                clearInterval(timer);
                setIsExploded(true);
                playAudio("explode.wav");
                // Show browser notification
                if ("Notification" in window && Notification.permission === "granted") {
                  new Notification("💣 Bomb Timer Exploded!", {
                    body: "Time's up! Your coding session has ended.",
                    icon: "/assets/bomb.png"
                  });
                }
                // Streak increment removed
                setTimeout(() => resetTimer(), 2000);
                return 0;
              }
              setHours((h: number) => h - 1);
              setMinutes(59);
              return 59;
            }
            setMinutes((m: number) => m - 1);
            return 59;
          }
          
          // Play beep sounds when under 10 seconds and no hours/minutes left
          if (hours === 0 && minutes === 0 && prevSeconds <= 10 && prevSeconds > 0) {
            playAudio("beep.wav");
          }
          if (hours === 0 && minutes === 0 && prevSeconds === 0) {
            playAudio("doublebeep.wav");
          }
          
          return prevSeconds - 1;
        });
      }, 1000);
    }

    window.addEventListener("keydown", handleKeyboard);
    return () => {
      clearInterval(timer);
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, [isRunning, hours, minutes, isPaused, playAudio, resetTimer]);

  const startTimer = useCallback((): void => {
    const totalSeconds = (parseInt(inputTime.hours) || 0) * 3600 + 
                        (parseInt(inputTime.minutes) || 0) * 60 + 
                        (parseInt(inputTime.seconds) || 0);
    
    if (totalSeconds === 0 || isRunning) return;
    
    setIsRunning(true);
    setIsExploded(false);
    setHours(parseInt(inputTime.hours) || 0);
    setMinutes(parseInt(inputTime.minutes) || 0);
    setSeconds(parseInt(inputTime.seconds) || 0);
    setIsPaused(false);
    playAudio("armbomb.wav");
  }, [inputTime, isRunning, playAudio]);

  const togglePause = useCallback((): void => {
    setIsPaused(!isPaused);
    playAudio("beep.wav");
  }, [isPaused, playAudio]);

  const handleInputChange = (field: keyof TimeInput) => (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputTime((prev: TimeInput) => ({ ...prev, [field]: value }));
  };

  const formatTime = (h: number, m: number, s: number): string => {
    // Ensure no negative values are displayed
    const safeH = Math.max(0, h);
    const safeM = Math.max(0, m);
    const safeS = Math.max(0, s);
    return `${String(safeH).padStart(2, "0")}:${String(safeM).padStart(2, "0")}:${String(safeS).padStart(2, "0")}`;
  };

  const toggleTheme = (): void => {
    setIsDarkTheme(!isDarkTheme);
  };

  const setPresetTimer = (hours: number, minutes: number, seconds: number): void => {
    setInputTime({
      hours: hours.toString(),
      minutes: minutes.toString(),
      seconds: seconds.toString()
    });
    setShowPresets(false);
  };

  const toggleMute = (): void => {
    setIsMuted(!isMuted);
  };

  // Request notification permission on component mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Update document title with remaining time
  useEffect(() => {
    if (isRunning && !isExploded) {
      document.title = `💣 ${formatTime(hours, minutes, seconds)} - Bomb Timer`;
    } else {
      document.title = "💣 Bomb Timer";
    }
  }, [isRunning, hours, minutes, seconds, isExploded]);

  return (
    <div className={`flex items-center justify-center min-h-screen transition-colors duration-300 ${
      isDarkTheme 
        ? "bg-gradient-to-b from-zinc-800 to-zinc-900" 
        : "bg-gradient-to-b from-blue-100 to-blue-200"
    }`}>
      {!isExploded ? (
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
            <div>
              {!isRunning && (
                <span className={`text-lg md:text-xl font-mono font-bold tracking-tighter ${
                  isDarkTheme ? "text-[#330000]" : "text-[#003300]"
                }`}>
                  HH:MM:SS
                </span>
              )}
              <span
                className={`text-red-600 text-lg md:text-xl font-mono font-bold tracking-tighter ${
                  hours === 0 && minutes === 0 && seconds <= 10 && isRunning
                    ? "animate-pulse"
                    : ""
                }`}
                style={{
                  visibility: showTimer ? "visible" : "hidden",
                  textShadow: "0 0 4px red",
                }}
              >
                {isRunning && seconds >= 0 && formatTime(hours, minutes, seconds)}
              </span>
            </div>
          </div>
          
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
              isDarkTheme 
                ? "bg-yellow-400 text-black hover:bg-yellow-300" 
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
            title={isDarkTheme ? "Switch to Light Theme" : "Switch to Dark Theme"}
          >
            {isDarkTheme ? "☀️" : "🌙"}
          </button>

          {/* Enhanced Controls Panel */}
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-lg">
            {/* Sound & Preset Controls */}
            <div className={`flex items-center justify-between p-3 rounded-lg mb-4 ${
              isDarkTheme ? "bg-black/20" : "bg-white/20"
            }`}>
              <div className="flex items-center gap-3">
                <button
                  onClick={toggleMute}
                  className={`p-2 rounded ${
                    isDarkTheme ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-300 hover:bg-gray-200"
                  } transition-colors`}
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? "🔇" : "🔊"}
                </button>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="w-20"
                  title={`Volume: ${volume}%`}
                />
                <span className={`text-sm ${
                  isDarkTheme ? "text-white" : "text-black"
                }`}>{volume}%</span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowPresets(!showPresets)}
                  className={`px-3 py-1 rounded text-sm ${
                    isDarkTheme ? "bg-blue-600 hover:bg-blue-500" : "bg-blue-500 hover:bg-blue-400"
                  } text-white transition-colors`}
                >
                  ⏱️ Presets
                </button>
              </div>
            </div>

            {/* Preset Buttons */}
            {showPresets && (
              <div className={`p-4 rounded-lg mb-4 ${
                isDarkTheme ? "bg-black/30" : "bg-white/30"
              }`}>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPresetTimer(0, 5, 0)}
                    className="px-3 py-2 bg-green-500 hover:bg-green-400 text-white rounded text-sm transition-colors"
                  >
                    ☕ Break (5m)
                  </button>
                  <button
                    onClick={() => setPresetTimer(0, 25, 0)}
                    className="px-3 py-2 bg-red-500 hover:bg-red-400 text-white rounded text-sm transition-colors"
                  >
                    🍅 Pomodoro (25m)
                  </button>
                  <button
                    onClick={() => setPresetTimer(0, 15, 0)}
                    className="px-3 py-2 bg-blue-500 hover:bg-blue-400 text-white rounded text-sm transition-colors"
                  >
                    💪 Focus (15m)
                  </button>
                  <button
                    onClick={() => setPresetTimer(1, 0, 0)}
                    className="px-3 py-2 bg-purple-500 hover:bg-purple-400 text-white rounded text-sm transition-colors"
                  >
                    🧠 Deep Work (1h)
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="absolute -top-24 left-1/2 -translate-x-1/2 flex flex-col gap-4 w-full max-w-sm">
            {!isRunning ? (
              <div className={`flex gap-2 items-center justify-center p-4 rounded-lg backdrop-blur ${
                isDarkTheme ? "bg-black/30" : "bg-white/30"
              }`}>
                <input
                  type="number"
                  value={inputTime.hours}
                  onChange={handleInputChange("hours")}
                  placeholder="HH"
                  className={`w-16 p-2 text-center rounded border focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    isDarkTheme 
                      ? "bg-white/10 border-white/20 text-white placeholder-white/50" 
                      : "bg-black/10 border-black/20 text-black placeholder-black/50"
                  }`}
                  min="0"
                  max="23"
                />
                <span className="text-white text-xl">:</span>
                <input
                  type="number"
                  value={inputTime.minutes}
                  onChange={handleInputChange("minutes")}
                  placeholder="MM"
                  className={`w-16 p-2 text-center rounded border focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    isDarkTheme 
                      ? "bg-white/10 border-white/20 text-white placeholder-white/50" 
                      : "bg-black/10 border-black/20 text-black placeholder-black/50"
                  }`}
                  min="0"
                  max="59"
                />
                <span className={`text-xl ${
                  isDarkTheme ? "text-white" : "text-black"
                }`}>:</span>
                <input
                  type="number"
                  value={inputTime.seconds}
                  onChange={handleInputChange("seconds")}
                  placeholder="SS"
                  className={`w-16 p-2 text-center rounded border focus:outline-none focus:ring-2 focus:ring-red-500 ${
                    isDarkTheme 
                      ? "bg-white/10 border-white/20 text-white placeholder-white/50" 
                      : "bg-black/10 border-black/20 text-black placeholder-black/50"
                  }`}
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
              <div className="flex flex-col gap-2 items-center">
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
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 bg-black">
          <Image
            src="/assets/explosion2.gif"
            alt="explosion"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      )}
    </div>
  );
}