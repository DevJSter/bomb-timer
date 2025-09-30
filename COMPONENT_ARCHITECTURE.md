# 💣 Bomb Timer - Component Architecture

A modular, well-structured focus timer application built with Next.js, TypeScript, and Tailwind CSS.

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main page component (orchestrates all other components)
│   ├── layout.tsx            # Root layout with SEO metadata
│   └── globals.css           # Global styles
├── components/               # Reusable UI components
│   ├── BombDisplay.tsx       # Bomb image and timer display
│   ├── ThemeToggle.tsx       # Dark/light theme switcher
│   ├── SoundControls.tsx     # Volume and mute controls
│   ├── PresetButtons.tsx     # Quick timer presets (5m, 15m, 25m, 1h)
│   ├── TimerControls.tsx     # Timer input and control buttons
│   ├── Footer.tsx            # Keyboard shortcuts guide
│   └── ExplosionView.tsx     # Explosion animation
├── hooks/                    # Custom React hooks
│   ├── useAudioManager.ts    # Audio playback logic
│   └── useNotificationManager.ts  # Browser notifications & SEO
└── utils/
    └── timeUtils.ts          # Time formatting utilities
```

## 🔧 Component Breakdown

### Core Components

#### `BombDisplay.tsx`
- **Purpose**: Renders the bomb image and timer display
- **Props**: `isChristmas`, `hours`, `minutes`, `seconds`, `isRunning`, `isDarkTheme`, `formatTime`, `showTimer`
- **Features**: Animations, theme-aware styling, responsive design

#### `TimerControls.tsx`
- **Purpose**: Handles timer input and control buttons (ARM, PAUSE, DEFUSE)
- **Props**: `isRunning`, `isPaused`, `isDarkTheme`, `inputTime`, event handlers
- **Features**: Input validation, glassmorphic design, keyboard shortcuts

#### `SoundControls.tsx`
- **Purpose**: Volume control and preset toggle
- **Props**: `isDarkTheme`, `isMuted`, `volume`, `showPresets`, event handlers
- **Features**: Volume slider, mute button, preset visibility toggle

#### `PresetButtons.tsx`
- **Purpose**: Quick timer presets (Break, Focus, Pomodoro, Deep Work)
- **Props**: `showPresets`, `isDarkTheme`, `setPresetTimer`
- **Features**: Animated show/hide, gradient buttons, emoji icons

### Utility Components

#### `ThemeToggle.tsx`
- **Purpose**: Light/dark theme switcher
- **Props**: `isDarkTheme`, `toggleTheme`
- **Features**: Smooth transitions, context-aware icons

#### `Footer.tsx`
- **Purpose**: Keyboard shortcuts guide
- **Props**: `isDarkTheme`, `isExploded`
- **Features**: Responsive layout, conditional rendering

#### `ExplosionView.tsx`
- **Purpose**: Fullscreen explosion animation
- **Features**: GIF overlay, immersive experience

### Custom Hooks

#### `useAudioManager.ts`
- **Purpose**: Centralizes audio playback logic
- **Features**: Volume control, mute functionality, error handling
- **Returns**: `{ playAudio }`

#### `useNotificationManager.ts`
- **Purpose**: Manages browser notifications and SEO
- **Features**: Permission handling, document title updates, structured data
- **Returns**: `{ showNotification }`

## 🎯 Key Features

### Timer Functionality
- **Default Timer**: Press SPACE with no input → 1-minute timer
- **Custom Timer**: Set hours, minutes, seconds
- **Presets**: 5m Break, 15m Focus, 25m Pomodoro, 1h Deep Work

### Keyboard Shortcuts
- `SPACE`: Start timer / Gun sound during countdown
- `P`: Pause/Resume
- `ESC`: Defuse/Reset

### Audio System
- Volume control (0-100%)
- Mute toggle
- Multiple sound effects (arm, beep, explosion, gun)

### Visual Design
- Dark/Light theme toggle
- Glassmorphic UI elements
- Responsive viewport units (vh/vw)
- Smooth animations and transitions

## 🐛 Debugging Guide

### Component Hierarchy
```
Page (Main State Management)
├── BombDisplay (Visual Display)
├── ThemeToggle (Theme State)
├── SoundControls (Audio State)
├── PresetButtons (Timer Presets)
├── TimerControls (Timer Logic)
├── Footer (Static UI)
└── ExplosionView (Conditional)
```

### State Flow
1. **Timer State**: `hours`, `minutes`, `seconds`, `isRunning`, `isPaused`
2. **UI State**: `isDarkTheme`, `showPresets`, `showTimer`, `isExploded`
3. **Audio State**: `volume`, `isMuted`
4. **Input State**: `inputTime` (hours, minutes, seconds as strings)

### Common Debug Points
- **Timer Logic**: Check `useEffect` with timer interval in `page.tsx`
- **Audio Issues**: Verify `useAudioManager` hook and file paths
- **Theme Problems**: Check `isDarkTheme` prop passing
- **Layout Issues**: Inspect viewport units and positioning classes
- **State Updates**: Use React DevTools to track state changes

### Performance Optimization
- Components use `useCallback` for event handlers
- Memoized functions prevent unnecessary re-renders
- Lazy loading for heavy components (explosion GIF)

## 🚀 Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production  
npm run build

# Type check
npm run type-check
```

## 📱 Responsive Design

- **Mobile**: Optimized touch targets, compact layouts
- **Desktop**: Hover effects, keyboard shortcuts
- **Tablet**: Adaptive sizing with viewport units

This modular architecture makes debugging easier by isolating concerns and providing clear component boundaries with well-defined props interfaces.