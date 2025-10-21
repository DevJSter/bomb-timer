import localFont from "next/font/local";
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "💣 Bomb Timer - Ultimate Focus Timer & Pomodoro App",
  description: "The best focus timer app with bomb countdown, pomodoro technique, and productivity features. Perfect for study sessions, work focus, and time management with sound alerts and keyboard shortcuts.",
  keywords: [
    "focus timer", "pomodoro timer", "productivity timer", "study timer", "work timer",
    "bomb timer", "countdown timer", "time management", "focus app", "concentration timer",
    "break timer", "coding timer", "task timer", "session timer", "deep work timer",
    "meditation timer", "workout timer", "productivity app", "time tracking", "focus session"
  ],
  authors: [{ name: "DevJSter", url: "https://github.com/DevJSter" }],
  creator: "DevJSter",
  publisher: "DevJSter",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "💣 Bomb Timer - Ultimate Focus Timer & Pomodoro App",
    description: "The best focus timer app with bomb countdown, pomodoro technique, and productivity features. Perfect for study sessions, work focus, and time management.",
    siteName: 'Bomb Timer',
    images: [
      {
        url: '/assets/bomb.png',
        width: 384,
        height: 384,
        alt: 'Bomb Timer - Focus Timer App',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "💣 Bomb Timer - Ultimate Focus Timer & Pomodoro App",
    description: "The best focus timer app with bomb countdown, pomodoro technique, and productivity features.",
    images: ['/assets/bomb.png'],
    creator: '@DevJSter',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Ensure proper mobile scaling
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}