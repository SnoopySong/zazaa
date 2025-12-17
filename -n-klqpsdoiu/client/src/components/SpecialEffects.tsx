import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import type { SpecialEffect } from "@shared/schema";

interface SpecialEffectsProps {
  effect: SpecialEffect;
  isActive?: boolean;
}

export function SpecialEffects({ effect, isActive = true }: SpecialEffectsProps) {
  if (!effect || !isActive) return null;

  switch (effect) {
    case "theo":
      return <TheoEffect />;
    case "magata":
      return <MagataEffect />;
    case "fanny":
      return <FannyEffect />;
    case "gregoire":
      return <GregoireEffect />;
    default:
      return null;
  }
}

function TheoEffect() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
      <div className="absolute inset-0 golden-glow opacity-30" />
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-2 h-2"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            scale: [0, 1, 0],
            rotate: [0, 180, 360],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-400 fill-current">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        </motion.div>
      ))}
      <motion.div
        className="absolute inset-0 border-4 border-yellow-400/50 rounded-3xl"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}

function MagataEffect() {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: 10 + Math.random() * 80,
      delay: Math.random() * 3,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
      <div className="absolute inset-0 pink-glow opacity-20" />
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            className="absolute bottom-0 text-pink-400"
            style={{ left: `${h.x}%` }}
            initial={{ y: 0, opacity: 1, scale: 1 }}
            animate={{ y: -150, opacity: 0, scale: 0.5 }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: h.delay,
              ease: "easeOut",
            }}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </motion.div>
        ))}
      </AnimatePresence>
      <motion.div
        className="absolute inset-0 border-4 border-pink-400/40 rounded-3xl"
        style={{
          background: "linear-gradient(135deg, rgba(236,72,153,0.1) 0%, rgba(168,85,247,0.1) 100%)",
        }}
      />
    </div>
  );
}

function FannyEffect() {
  const [flames, setFlames] = useState<Array<{ id: number; x: number; delay: number }>>([]);

  useEffect(() => {
    const newFlames = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: 5 + Math.random() * 90,
      delay: Math.random() * 2,
    }));
    setFlames(newFlames);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center bottom, rgba(220,38,38,0.4) 0%, rgba(0,0,0,0.2) 70%)",
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
      {flames.map((f) => (
        <motion.div
          key={f.id}
          className="absolute bottom-0"
          style={{ left: `${f.x}%` }}
          animate={{
            y: [0, -30, -50, -30, 0],
            scale: [1, 1.3, 1.5, 1.3, 1],
            opacity: [0.8, 1, 0.6, 1, 0.8],
          }}
          transition={{
            duration: 1 + Math.random(),
            repeat: Infinity,
            delay: f.delay,
          }}
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 text-red-500 fill-current">
            <path d="M12 23c-3.9 0-7-3.1-7-7 0-2.8 1.7-5.4 4.3-6.5.3-.1.6 0 .8.2.2.2.3.5.2.8-.3.8-.5 1.7-.5 2.5 0 2.2 1.8 4 4 4s4-1.8 4-4c0-.8-.2-1.7-.5-2.5-.1-.3 0-.6.2-.8.2-.2.5-.3.8-.2C20.3 10.6 22 13.2 22 16c0 3.9-3.1 7-7 7h-3z"/>
            <path d="M12 17c-1.1 0-2-.9-2-2 0-.8.5-1.6 1.2-1.9.3-.1.6 0 .8.2.2.2.3.5.2.8-.1.2-.2.5-.2.9 0 .6.4 1 1 1s1-.4 1-1c0-.4-.1-.7-.2-.9-.1-.3 0-.6.2-.8.2-.2.5-.3.8-.2.7.3 1.2 1.1 1.2 1.9 0 1.1-.9 2-2 2h-2z"/>
          </svg>
        </motion.div>
      ))}
      <motion.div
        className="absolute top-2 left-1/2 -translate-x-1/2 text-2xl"
        animate={{ 
          rotate: [-5, 5, -5],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        😈
      </motion.div>
      <motion.div
        className="absolute inset-0 border-4 border-red-600/60 rounded-3xl"
        animate={{ 
          boxShadow: [
            "0 0 10px rgba(220,38,38,0.5)",
            "0 0 30px rgba(220,38,38,0.8)",
            "0 0 10px rgba(220,38,38,0.5)",
          ]
        }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  );
}

function GregoireEffect() {
  const emojis = ["(ﾟヮﾟ)", "(づ ᴗ _ᴗ)づ", "(ノ°▽°)ノ", "\\(^ヮ^)/"];
  const [displayEmoji, setDisplayEmoji] = useState(emojis[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayEmoji(emojis[Math.floor(Math.random() * emojis.length)]);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
      <motion.div
        className="absolute top-2 right-2 text-lg font-bold text-primary"
        animate={{ 
          x: [-2, 2, -2, 2, 0],
          y: [0, -2, 2, -2, 0],
        }}
        transition={{ duration: 0.3, repeat: Infinity }}
      >
        {displayEmoji}
      </motion.div>
      <motion.div
        className="absolute inset-0 border-2 border-primary/30 rounded-3xl"
        animate={{
          borderColor: ["rgba(249,115,22,0.3)", "rgba(236,72,153,0.3)", "rgba(59,130,246,0.3)", "rgba(249,115,22,0.3)"],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1, repeat: Infinity }}
      />
    </div>
  );
}

export function getSpecialEffectClass(effect: SpecialEffect): string {
  switch (effect) {
    case "theo":
      return "ring-4 ring-yellow-400/50";
    case "magata":
      return "ring-4 ring-pink-400/50";
    case "fanny":
      return "ring-4 ring-red-600/60";
    case "gregoire":
      return "ring-2 ring-primary/50";
    default:
      return "";
  }
}
