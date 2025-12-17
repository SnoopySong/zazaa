import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { ModeToggle } from "./ModeToggle";
import { Trophy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

interface HeaderProps {
  mode?: "tinder" | "selection";
  onModeChange?: (mode: "tinder" | "selection") => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function Header({ mode, onModeChange, showBackButton, onBack }: HeaderProps) {
  const [, setLocation] = useLocation();

  return (
    <motion.header
      className="sticky top-0 z-40 w-full backdrop-blur-md bg-background/80 border-b border-border"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {showBackButton ? (
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
        ) : null}
        
        <motion.div 
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <motion.img
            src="/images/logo.png"
            alt="SnoopyRank"
            className="w-10 h-10 rounded-full object-cover glow-orange"
            animate={{ rotate: [-3, 3, -3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-primary tracking-tight neon-text">
              SnoopyRank
            </h1>
            <span className="text-xs text-muted-foreground hidden sm:block">
              Notez votre classe !
            </span>
          </div>
        </motion.div>
        
        {mode && onModeChange ? (
          <ModeToggle mode={mode} onModeChange={onModeChange} />
        ) : null}

        <div className="flex items-center gap-2">
          {!showBackButton && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setLocation("/classement")}
              className="gap-2"
            >
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Classement</span>
            </Button>
          )}
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
