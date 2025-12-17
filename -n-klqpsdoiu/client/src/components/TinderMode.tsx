import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Person } from "@shared/schema";
import { PersonCard } from "./PersonCard";
import { Star, ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TinderModeProps {
  persons: Person[];
  onRate: (person: Person) => void;
  onPersonChange?: (person: Person | null) => void;
}

export function TinderMode({ persons, onRate, onPersonChange }: TinderModeProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const currentPerson = persons[currentIndex];
  const isFinished = currentIndex >= persons.length;

  const handleNext = () => {
    setDirection(1);
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    onPersonChange?.(persons[newIndex] || null);
  };

  const handleRestart = () => {
    setDirection(-1);
    setCurrentIndex(0);
    onPersonChange?.(persons[0] || null);
  };

  const handleRate = () => {
    if (currentPerson) {
      onRate(currentPerson);
    }
  };

  if (persons.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <p className="text-muted-foreground">Aucune personne disponible</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <div className="relative w-full max-w-sm h-[420px]">
        <AnimatePresence mode="wait">
          {!isFinished ? (
            <motion.div
              key={currentPerson.id}
              initial={{ opacity: 0, x: direction * 100, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -direction * 100, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <PersonCard person={currentPerson} size="large" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-foreground">C'est fini !</h3>
              <p className="text-muted-foreground mt-2">Tu as vu tout le monde</p>
              <Button
                variant="default"
                onClick={handleRestart}
                className="mt-6 gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Recommencer
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isFinished && (
        <motion.div 
          className="flex flex-col items-center gap-4 mt-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleRate}
                size="lg"
                className="gap-2 px-8"
              >
                <Star className="w-5 h-5" />
                Noter
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleNext}
                variant="outline"
                size="lg"
                className="gap-2"
              >
                Suivant
                <ArrowRight className="w-5 h-5" />
              </Button>
            </motion.div>
          </div>

          <p className="text-sm text-muted-foreground">
            {currentIndex + 1} / {persons.length}
          </p>
        </motion.div>
      )}
    </div>
  );
}
