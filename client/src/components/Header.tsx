import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { ModeToggle } from "./ModeToggle";
import { Trophy, ArrowLeft, Sparkles } from "lucide-react";
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
      className="sticky top-0 z-40 w-full backdrop-blur-xl bg-background/70 border-b border-border/50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {showBackButton ? (
          <Button variant="ghost" size="icon" onClick={onBack} className="hover:bg-primary/10">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        ) : null}
        
        <motion.div 
          className="flex items-center gap-3 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          onClick={() => setLocation("/")}
        >
          <motion.div
            className="avatar-ring"
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src="/images/logo.png"
              alt="SnoopyRank"
              className="w-10 h-10 rounded-full object-cover bg-card"
            />
          </motion.div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl font-bold neon-text tracking-tight">
                SnoopyRank
              </h1>
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            </div>
            <span className="text-xs text-muted-foreground hidden sm:block font-medium">
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
              size="sm"
              onClick={() => setLocation("/classement")}
              className="gap-2 btn-gradient text-white border-0 font-semibold"
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
