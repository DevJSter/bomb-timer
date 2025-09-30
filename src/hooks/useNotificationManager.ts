"use client";
import { useEffect } from "react";

interface NotificationManagerProps {
  isRunning: boolean;
  hours: number;
  minutes: number;
  seconds: number;
  isExploded: boolean;
  formatTime: (h: number, m: number, s: number) => string;
}

export function useNotificationManager({
  isRunning,
  hours,
  minutes,
  seconds,
  isExploded,
  formatTime
}: NotificationManagerProps) {
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
  }, [isRunning, hours, minutes, seconds, isExploded, formatTime]);

  // Add structured data for SEO
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": "Bomb Timer - Focus Timer App",
      "description": "The ultimate focus timer and pomodoro app for productivity, study sessions, and time management with bomb countdown theme.",
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
        "Focus tracking"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  const showNotification = () => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("💣 Bomb Timer Exploded!", {
        body: "Time's up! Your coding session has ended.",
        icon: "/assets/bomb.png"
      });
    }
  };

  return { showNotification };
}