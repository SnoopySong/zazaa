import { motion } from "framer-motion";
import { useMemo } from "react";

export function SnoopyBackground() {
  const snoopies = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.3 + Math.random() * 0.4,
      rotation: Math.random() * 30 - 15,
      delay: Math.random() * 5,
    }));
  }, []);

  const bones = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.2 + Math.random() * 0.3,
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {snoopies.map((s) => (
        <motion.div
          key={`snoopy-${s.id}`}
          className="absolute opacity-[0.03] dark:opacity-[0.05]"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            transform: `scale(${s.scale}) rotate(${s.rotation}deg)`,
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: s.delay,
            ease: "easeInOut",
          }}
        >
          <SnoopySilhouette />
        </motion.div>
      ))}

      {bones.map((b) => (
        <div
          key={`bone-${b.id}`}
          className="absolute opacity-[0.02] dark:opacity-[0.04]"
          style={{
            left: `${b.x}%`,
            top: `${b.y}%`,
            transform: `scale(${b.scale}) rotate(${b.rotation}deg)`,
          }}
        >
          <BoneSilhouette />
        </div>
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
      className="fill-current text-foreground"
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

function BoneSilhouette() {
  return (
    <svg
      width="60"
      height="24"
      viewBox="0 0 60 24"
      className="fill-current text-foreground"
    >
      <ellipse cx="8" cy="6" rx="6" ry="5" />
      <ellipse cx="8" cy="18" rx="6" ry="5" />
      <ellipse cx="52" cy="6" rx="6" ry="5" />
      <ellipse cx="52" cy="18" rx="6" ry="5" />
      <rect x="8" y="8" width="44" height="8" rx="3" />
    </svg>
  );
}
