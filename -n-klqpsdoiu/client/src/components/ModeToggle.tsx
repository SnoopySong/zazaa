import { motion } from "framer-motion";
import { Shuffle, List } from "lucide-react";

interface ModeToggleProps {
  mode: "tinder" | "selection";
  onModeChange: (mode: "tinder" | "selection") => void;
}

export function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="relative bg-muted rounded-full p-1 flex" data-testid="mode-toggle">
      <motion.div
        className="absolute top-1 bottom-1 bg-primary rounded-full"
        initial={false}
        animate={{
          left: mode === "tinder" ? "4px" : "50%",
          width: "calc(50% - 4px)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      />
      
      <button
        onClick={() => onModeChange("tinder")}
        className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          mode === "tinder" ? "text-primary-foreground" : "text-muted-foreground"
        }`}
        data-testid="button-mode-tinder"
      >
        <Shuffle className="w-4 h-4" />
        <span className="hidden sm:inline">Tinder</span>
      </button>
      
      <button
        onClick={() => onModeChange("selection")}
        className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          mode === "selection" ? "text-primary-foreground" : "text-muted-foreground"
        }`}
        data-testid="button-mode-selection"
      >
        <List className="w-4 h-4" />
        <span className="hidden sm:inline">Liste</span>
      </button>
    </div>
  );
}
