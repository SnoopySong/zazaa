import { motion } from "framer-motion";
import { useMemo } from "react";

export function SnoopyBackground() {
  const snoopies = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.25 + Math.random() * 0.35,
      rotation: Math.random() * 30 - 15,
      delay: Math.random() * 5,
    }));
  }, []);

  const orbs = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 150 + Math.random() * 200,
      color: i % 3 === 0 ? 'purple' : i % 3 === 1 ? 'pink' : 'cyan',
      delay: Math.random() * 3,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {orbs.map((orb) => (
        <motion.div
          key={`orb-${orb.id}`}
          className={`absolute rounded-full blur-3xl ${
            orb.color === 'purple' ? 'bg-primary/5' :
            orb.color === 'pink' ? 'bg-secondary/5' : 'bg-accent/5'
          }`}
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -20, 30, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: orb.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {snoopies.map((s) => (
        <motion.div
          key={`snoopy-${s.id}`}
          className="absolute opacity-[0.04] dark:opacity-[0.06]"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            transform: `scale(${s.scale}) rotate(${s.rotation}deg)`,
          }}
          animate={{
            y: [0, -15, 0],
            rotate: [s.rotation - 3, s.rotation + 3, s.rotation - 3],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        >
          <SnoopySilhouette />
        </motion.div>
      ))}
    </div>
  );
}

function SnoopySilhouette() {
  return (
    <svg
      width="80"
      height="100"
      viewBox="0 0 80 100"
      className="fill-current text-primary"
    >
      <ellipse cx="40" cy="65" rx="18" ry="25" />
      <ellipse cx="40" cy="35" rx="15" ry="12" />
      <ellipse cx="55" cy="28" rx="14" ry="10" />
      <circle cx="62" cy="24" r="3" className="fill-background" />
      <ellipse cx="52" cy="35" rx="4" ry="6" />
      <ellipse cx="25" cy="70" rx="6" ry="15" />
      <ellipse cx="55" cy="70" rx="6" ry="15" />
      <ellipse cx="35" cy="90" rx="5" ry="8" />
      <ellipse cx="50" cy="90" rx="5" ry="8" />
      <ellipse cx="40" cy="42" rx="2" ry="1" />
    </svg>
  );
}
