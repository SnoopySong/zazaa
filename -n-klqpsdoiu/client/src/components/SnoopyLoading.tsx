import { motion } from "framer-motion";

export function SnoopyLoading() {
  return (
    <div 
      className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50"
      data-testid="loading-screen"
    >
      <motion.div
        className="relative"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          className="text-foreground"
          aria-label="Snoopy silhouette"
        >
          <ellipse cx="60" cy="95" rx="35" ry="8" className="fill-muted opacity-50" />
          <ellipse cx="60" cy="55" rx="25" ry="30" className="fill-current" />
          <ellipse cx="60" cy="28" rx="18" ry="15" className="fill-current" />
          <ellipse cx="68" cy="22" rx="12" ry="8" className="fill-current" />
          <circle cx="72" cy="22" r="3" className="fill-background" />
          <ellipse cx="30" cy="65" rx="8" ry="20" className="fill-current" />
          <ellipse cx="90" cy="65" rx="8" ry="20" className="fill-current" />
          <ellipse cx="45" cy="85" rx="6" ry="12" className="fill-current" />
          <ellipse cx="75" cy="85" rx="6" ry="12" className="fill-current" />
          <path d="M 55 90 Q 60 100 65 90" className="stroke-current fill-none" strokeWidth="2" />
        </svg>
        
        <motion.div
          className="absolute -top-2 -right-2"
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-6 h-6 text-primary">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.p
        className="mt-8 text-xl font-bold text-foreground tracking-wide"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Chargement...
      </motion.p>
      
      <div className="flex gap-2 mt-4">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-primary"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>
    </div>
  );
}
