import { motion } from "framer-motion";
import { Shuffle, List } from "lucide-react";

interface ModeToggleProps {
  mode: "tinder" | "selection";
  onModeChange: (mode: "tinder" | "selection") => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="relative bg-muted/50 backdrop-blur-sm rounded-full p-1.5 flex border border-border/50" data-testid="mode-toggle">
      <motion.div
        className="absolute top-1.5 bottom-1.5 bg-gradient-to-r from-primary to-secondary rounded-full shadow-lg"
        initial={false}
        animate={{
          left: mode === "tinder" ? "6px" : "50%",
          width: "calc(50% - 6px)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      
      <button
        onClick={() => onModeChange("tinder")}
        className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          mode === "tinder" ? "text-white" : "text-muted-foreground hover:text-foreground"
        }`}
        data-testid="button-mode-tinder"
      >
        <Shuffle className="w-4 h-4" />
        <span className="hidden sm:inline">Tinder</span>
      </button>
      
      <button
        onClick={() => onModeChange("selection")}
        className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          mode === "selection" ? "text-white" : "text-muted-foreground hover:text-foreground"
        }`}
        data-testid="button-mode-selection"
      >
        <List className="w-4 h-4" />
        <span className="hidden sm:inline">Liste</span>
      </button>
    </div>
  );
}
