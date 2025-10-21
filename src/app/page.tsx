"use client";
import React, { useState, useEffect, useCallback } from "react";
import BombDisplay from "@/components/BombDisplay";
import ThemeToggle from "@/components/ThemeToggle";
import SoundControls from "@/components/SoundControls";
import PresetButtons from "@/components/PresetButtons";
import TimerControls from "@/components/TimerControls";
import Footer from "@/components/Footer";
import ExplosionView from "@/components/ExplosionView";
import { useAudioManager } from "@/hooks/useAudioManager";
import { useNotificationManager } from "@/hooks/useNotificationManager";
import { formatTime } from "@/utils/timeUtils";

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
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(() => {
    // Initialize from localStorage or default to true
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('isDarkTheme');
      return saved ? JSON.parse(saved) : true;
    }
    return true;
  });
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

    // Add additional SEO meta tags
    const metaTags = [
      { name: 'theme-color', content: isDarkTheme ? '#18181b' : '#3b82f6' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'Bomb Timer' },
      { property: 'og:image:alt', content: 'Bomb Timer - Ultimate Focus Timer App' },
    ];

    metaTags.forEach(tag => {
      const meta = document.createElement('meta');
      if (tag.name) meta.name = tag.name;
      if (tag.property) meta.setAttribute('property', tag.property);
      meta.content = tag.content;
      document.head.appendChild(meta);
    });

    return () => {
      document.head.removeChild(style);
      metaTags.forEach(() => {
        const metas = document.head.querySelectorAll('meta[name], meta[property]');
        metas.forEach(meta => {
          if (metaTags.some(tag => 
            (tag.name && meta.getAttribute('name') === tag.name) ||
            (tag.property && meta.getAttribute('property') === tag.property)
          )) {
            document.head.removeChild(meta);
          }
        });
      });
    };
  }, [isDarkTheme]);

  const { playAudio } = useAudioManager({ volume, isMuted });
  
  const { showNotification } = useNotificationManager({
    isRunning,
    hours,
    minutes,
    seconds,
    isExploded,
    formatTime
  });

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

  const startTimer = useCallback((): void => {
    const totalSeconds = (parseInt(inputTime.hours) || 0) * 3600 + 
                        (parseInt(inputTime.minutes) || 0) * 60 + 
                        (parseInt(inputTime.seconds) || 0);
    
    if (isRunning) return;
    
    // If no time is set, default to 1 minute
    if (totalSeconds === 0) {
      setInputTime({ hours: "0", minutes: "1", seconds: "0" });
      setHours(0);
      setMinutes(1);
      setSeconds(0);
    } else {
      setHours(parseInt(inputTime.hours) || 0);
      setMinutes(parseInt(inputTime.minutes) || 0);
      setSeconds(parseInt(inputTime.seconds) || 0);
    }
    
    setIsRunning(true);
    setIsExploded(false);
    setIsPaused(false);
    playAudio("armbomb.wav");
  }, [inputTime, isRunning, playAudio]);

  const togglePause = useCallback((): void => {
    setIsPaused(!isPaused);
    playAudio("beep.wav");
  }, [isPaused, playAudio]);

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
                showNotification();
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
  }, [isRunning, hours, minutes, isPaused, playAudio, resetTimer, startTimer, togglePause, showNotification]);

  const handleInputChange = (field: keyof TimeInput) => (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputTime((prev: TimeInput) => ({ ...prev, [field]: value }));
  };

  // formatTime is now imported from utils

  const toggleTheme = (): void => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('isDarkTheme', JSON.stringify(newTheme));
    }
  };

  // Apply dark class to document element for Neobrutalism styling
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

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
      document.title = `💣 ${formatTime(hours, minutes, seconds)} - Bomb Timer - Focus Timer App`;
    } else {
      document.title = "💣 Bomb Timer - Ultimate Focus Timer & Pomodoro App";
    }
  }, [isRunning, hours, minutes, seconds, isExploded]);

  // Add structured data for SEO
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Bomb Timer - Focus Timer App",
      "description": "The ultimate focus timer and pomodoro app for productivity, study sessions, and time management with bomb countdown theme.",
      "url": "https://bomb-timer.vercel.app",
      "applicationCategory": "ProductivityApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Person",
        "name": "DevJSter",
        "url": "https://github.com/DevJSter"
      },
      "keywords": "focus timer, pomodoro timer, productivity timer, study timer, bomb timer, countdown timer, time management, concentration timer",
      "featureList": [
        "Customizable timer with hours, minutes, seconds",
        "Pomodoro technique presets (5m, 15m, 25m, 1h)",
        "Keyboard shortcuts (Space, P, Escape)",
        "Sound alerts and volume control",
        "Dark and light theme",
        "Browser notifications",
        "Progress tracking"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className={`flex items-center justify-center min-h-screen pb-24 md:pb-0 transition-colors duration-500 ${
      isDarkTheme 
        ? "bg-black dark" 
        : "bg-white"
    }`}>
      {!isExploded ? (
       <div className="relative py-10 md:py-16 flex flex-col items-center gap-6 md:gap-8">
  <BombDisplay
    isChristmas={isChristmas}
    hours={hours}
    minutes={minutes}
    seconds={seconds}
    isRunning={isRunning}
    isDarkTheme={isDarkTheme}
    formatTime={formatTime}
    showTimer={showTimer}
  />
  
  <ThemeToggle
    isDarkTheme={isDarkTheme}
    toggleTheme={toggleTheme}
  />
  
  <SoundControls
    isDarkTheme={isDarkTheme}
    isMuted={isMuted}
    volume={volume}
    showPresets={showPresets}
    toggleMute={toggleMute}
    setVolume={setVolume}
    setShowPresets={setShowPresets}
  />
  
  {showPresets && (
    <PresetButtons
      className="w-[90vw] max-w-md"
      showPresets={showPresets}
      isDarkTheme={isDarkTheme}
      setPresetTimer={setPresetTimer}
    />
  )}
  
  <TimerControls
    isRunning={isRunning}
    isPaused={isPaused}
    isDarkTheme={isDarkTheme}
    inputTime={inputTime}
    handleInputChange={handleInputChange}
    startTimer={startTimer}
    togglePause={togglePause}
    resetTimer={resetTimer}
  />
</div>
      ) : (
        <ExplosionView />
      )}
      
      <Footer isDarkTheme={isDarkTheme} isExploded={isExploded} />
    </div>
  );
}