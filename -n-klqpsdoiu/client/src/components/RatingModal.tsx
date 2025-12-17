import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Sparkles, Send, Gem, Laugh, Heart, Brain } from "lucide-react";
import type { Person, InsertRating } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { SpecialEffects } from "./SpecialEffects";
import confetti from "canvas-confetti";

interface RatingModalProps {
  person: Person | null;
  onClose: () => void;
  onSubmit: (rating: Omit<InsertRating, "personId">) => void;
  isSubmitting?: boolean;
}

const CRITERIA = [
  { key: "beauty", label: "Beaute", Icon: Gem },
  { key: "funny", label: "Drole ou pas", Icon: Laugh },
  { key: "personality", label: "Personnalite", Icon: Heart },
  { key: "intelligence", label: "Intelligence", Icon: Brain },
] as const;

export function RatingModal({ person, onClose, onSubmit, isSubmitting }: RatingModalProps) {
  const [ratings, setRatings] = useState({
    beauty: 5,
    funny: 5,
    personality: 5,
    intelligence: 5,
  });
  const [comment, setComment] = useState("");
  const [displayAverage, setDisplayAverage] = useState(5);

  const average = (ratings.beauty + ratings.funny + ratings.personality + ratings.intelligence) / 4;

  useEffect(() => {
    const duration = 300;
    const start = displayAverage;
    const end = average;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayAverage(start + (end - start) * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [average]);

  const handleSubmit = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f97316", "#ec4899", "#3b82f6", "#fbbf24"],
    });

    onSubmit({
      ...ratings,
      comment: comment.trim() || null,
    });
  };

  if (!person) return null;

  const specialEffect = person.specialEffect as "theo" | "magata" | "fanny" | "gregoire" | null;
  const initials = person.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const getAvatarColor = () => {
    switch (specialEffect) {
      case "theo":
        return "bg-gradient-to-br from-yellow-300 to-yellow-500";
      case "magata":
        return "bg-gradient-to-br from-pink-300 to-purple-400";
      case "fanny":
        return "bg-gradient-to-br from-purple-700 to-purple-900";
      case "gregoire":
        return "bg-gradient-to-br from-primary to-secondary";
      default:
        return "bg-gradient-to-br from-muted to-muted-foreground/20";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          className="relative bg-card rounded-3xl p-6 sm:p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto border border-card-border shadow-2xl"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          data-testid="modal-rating"
        >
          <SpecialEffects effect={specialEffect} />

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 z-20"
            onClick={onClose}
            data-testid="button-close-modal"
          >
            <X className="w-5 h-5" />
          </Button>

          <div className="relative z-10">
            <div className="flex flex-col items-center mb-6">
              <motion.div
                className={`w-20 h-20 rounded-full ${getAvatarColor()} flex items-center justify-center border-4 border-background shadow-lg`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.1 }}
              >
                <span className="text-2xl font-bold text-white">{initials}</span>
              </motion.div>
              <motion.h2
                className="mt-4 text-2xl font-bold text-foreground text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {person.name}
              </motion.h2>
              <motion.div
                className="w-16 h-1 bg-primary rounded-full mt-2"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.2 }}
              />
            </div>

            <div className="space-y-6">
              {CRITERIA.map((criterion, index) => (
                <motion.div
                  key={criterion.key}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <criterion.Icon className="w-4 h-4 text-primary" />
                      {criterion.label}
                    </label>
                    <motion.span
                      className="text-lg font-bold text-primary"
                      key={ratings[criterion.key]}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                    >
                      {ratings[criterion.key]}/10
                    </motion.span>
                  </div>
                  <Slider
                    value={[ratings[criterion.key]]}
                    onValueChange={([value]) =>
                      setRatings((prev) => ({ ...prev, [criterion.key]: value }))
                    }
                    min={1}
                    max={10}
                    step={1}
                    className="py-2"
                    data-testid={`slider-${criterion.key}`}
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 p-6 bg-muted/50 rounded-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center justify-center gap-2 mb-2">
                <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                <span className="text-sm font-medium text-muted-foreground">
                  Note moyenne
                </span>
              </div>
              <motion.div
                className="text-5xl font-bold text-foreground"
                key={Math.round(displayAverage * 10)}
              >
                {displayAverage.toFixed(1)}
              </motion.div>
            </motion.div>

            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="block text-sm font-medium text-foreground mb-2">
                Commentaire (optionnel)
              </label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Un petit mot sympa..."
                className="resize-none rounded-2xl"
                rows={3}
                maxLength={200}
                data-testid="textarea-comment"
              />
              <p className="text-xs text-muted-foreground text-right mt-1">
                {comment.length}/200
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full mt-6 h-14 text-lg rounded-2xl"
                data-testid="button-submit-rating"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Envoyer ma note
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
