# Snoopy Rank

## Overview
A fun rating application where users can rate people (students and teachers) on various attributes like beauty, humor, personality, and intelligence. Features a Tinder-like swipe mode and a leaderboard. Styled with authentic Snoopy/Peanuts theme.

## Project Architecture
- **Frontend**: React with TypeScript, Vite, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Storage**: PostgreSQL database with Drizzle ORM
- **Build Tool**: Vite for development and production builds

## Key Directories
- `/client` - React frontend source
  - `/src/components` - UI components including shadcn/ui
  - `/src/pages` - Page components (Home, Leaderboard)
  - `/src/hooks` - Custom React hooks
  - `/src/lib` - Utility functions and configurations
- `/server` - Express backend
- `/shared` - Shared TypeScript types and schemas
- `/script` - Build scripts

## Scripts
- `npm run dev` - Start development server (port 5000)
- `npm run build` - Build for production
- `npm start` - Run production build

## Recent Changes
- December 17, 2025: Added authentic Snoopy images, changed text to "Notez votre classe!", enhanced UI with gradients and animations, fixed build for Render deployment
