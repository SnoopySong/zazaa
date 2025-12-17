import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { SpecialEffect } from "@shared/schema";

interface GlobalEffectsProps {
  effect: SpecialEffect;
}

export function GlobalEffects({ effect }: GlobalEffectsProps) {
  if (!effect) return null;

  switch (effect) {
    case "theo":
      return <GlobalTheoEffect />;
    case "magata":
      return <GlobalMagataEffect />;
    case "fanny":
      return <GlobalFannyEffect />;
    case "gregoire":
      return <GlobalGregoireEffect />;
    default:
      return null;
  }
}

function GlobalTheoEffect() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; size: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      size: 8 + Math.random() * 16,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-orange-400/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-400 fill-current drop-shadow-lg">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </motion.div>
      ))}
      <motion.div 
        className="absolute top-4 left-1/2 -translate-x-1/2 text-2xl font-bold text-yellow-500 bg-yellow-100/80 dark:bg-yellow-900/50 px-6 py-2 rounded-full shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        LE PLUS FORT DU MONDE
      </motion.div>
    </div>
  );
}

function GlobalMagataEffect() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number; size: number }>>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 4,
      size: 16 + Math.random() * 24,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-pink-400/15 to-purple-400/15"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="absolute bottom-0 text-pink-400"
            style={{ left: `${h.x}%`, width: h.size, height: h.size }}
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{ y: "-100vh", opacity: 0, scale: 0.3 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: h.delay,
              ease: "easeOut",
            }}
          >
            <svg viewBox="0 0 24 24" className="w-full h-full fill-current drop-shadow-lg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
      <motion.div 
        className="absolute top-4 left-1/2 -translate-x-1/2 text-2xl font-bold text-pink-500 bg-pink-100/80 dark:bg-pink-900/50 px-6 py-2 rounded-full shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        LA PLUS BELLE
      </motion.div>
    </div>
  );
}

function GlobalFannyEffect() {
  const [flames, setFlames] = useState<Array<{ id: number; x: number; delay: number; size: number }>>([]);

  useEffect(() => {
    const newFlames = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2,
      size: 20 + Math.random() * 40,
    }));
    setFlames(newFlames);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-red-900/40 via-orange-600/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      {flames.map((f) => (
        <motion.div
          key={f.id}
          className="absolute bottom-0"
          style={{ 
            left: `${f.x}%`, 
            width: f.size, 
            height: f.size * 2,
          }}
          animate={{
            y: [0, -100, -200],
            scale: [1, 1.5, 0.5],
            opacity: [0.9, 1, 0],
          }}
          transition={{
            duration: 2 + Math.random(),
            repeat: Infinity,
            delay: f.delay,
          }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full text-orange-500 fill-current drop-shadow-lg">
            <path d="M12 23c-3.9 0-7-3.1-7-7 0-2.8 1.7-5.4 4.3-6.5.3-.1.6 0 .8.2.2.2.3.5.2.8-.3.8-.5 1.7-.5 2.5 0 2.2 1.8 4 4 4s4-1.8 4-4c0-.8-.2-1.7-.5-2.5-.1-.3 0-.6.2-.8.2-.2.5-.3.8-.2C20.3 10.6 22 13.2 22 16c0 3.9-3.1 7-7 7h-3z"/>
          </svg>
        </motion.div>
      ))}
      <motion.div 
        className="absolute top-4 left-1/2 -translate-x-1/2 text-3xl font-bold text-red-500 bg-black/80 px-6 py-2 rounded-full shadow-lg flex items-center gap-2"
        initial={{ y: -50, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          textShadow: [
            "0 0 10px rgba(239,68,68,0.8)",
            "0 0 30px rgba(239,68,68,1)",
            "0 0 10px rgba(239,68,68,0.8)",
          ]
        }}
        transition={{ 
          y: { type: "spring", stiffness: 200 },
          textShadow: { duration: 0.5, repeat: Infinity }
        }}
      >
        <span className="text-4xl">😈</span> DIABOLIQUE <span className="text-4xl">🔥</span>
      </motion.div>
    </div>
  );
}

function GlobalGregoireEffect() {
  const emojis = ["(ﾟヮﾟ)", "(づ ᴗ _ᴗ)づ", "(ノ°▽°)ノ", "\\(^ヮ^)/", "ヽ(>∀<☆)☆", "(๑˃ᴗ˂)ﻭ"];
  const [floatingEmojis, setFloatingEmojis] = useState<Array<{ id: number; x: number; delay: number; emoji: string }>>([]);

  useEffect(() => {
    const newEmojis = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
    }));
    setFloatingEmojis(newEmojis);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <motion.div 
        className="absolute inset-0"
        animate={{ 
          background: [
            "linear-gradient(135deg, rgba(249,115,22,0.1) 0%, rgba(236,72,153,0.1) 100%)",
            "linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(59,130,246,0.1) 100%)",
            "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(249,115,22,0.1) 100%)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {floatingEmojis.map((e) => (
        <motion.div
          key={e.id}
          className="absolute text-2xl font-bold"
          style={{ left: `${e.x}%`, bottom: 0 }}
          animate={{
            y: [0, "-100vh"],
            rotate: [-20, 20, -20],
            opacity: [1, 0.5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: e.delay,
          }}
        >
          {e.emoji}
        </motion.div>
      ))}
      <motion.div 
        className="absolute top-4 left-1/2 -translate-x-1/2 text-2xl font-bold bg-gradient-to-r from-orange-500 via-pink-500 to-blue-500 text-transparent bg-clip-text px-6 py-2 rounded-full"
        initial={{ y: -50, opacity: 0 }}
        animate={{ 
          y: 0, 
          opacity: 1,
          x: [-5, 5, -5],
        }}
        transition={{ 
          y: { type: "spring", stiffness: 200 },
          x: { duration: 0.3, repeat: Infinity },
        }}
      >
        GREGOIREEEEEE
      </motion.div>
    </div>
  );
}
