import { motion } from "framer-motion";
import type { Person } from "@shared/schema";
import { SpecialEffects, getSpecialEffectClass } from "./SpecialEffects";
import { Star, GraduationCap, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getGender } from "@/lib/gender";

interface PersonCardProps {
  person: Person;
  onClick?: () => void;
  size?: "small" | "large";
  averageRating?: number;
}

export function PersonCard({ person, onClick, size = "large", averageRating }: PersonCardProps) {
  const isLarge = size === "large";
  const gender = getGender(person.name);
  
  const getAvatarSrc = () => {
    if (person.specialEffect === "theo") return "/images/snoopy-theo.png";
    if (person.specialEffect === "magata") return "/images/snoopy-magata.png";
    return gender === "female" ? "/images/snoopy-girl.png" : "/images/snoopy-boy.png";
  };
  const avatarSrc = getAvatarSrc();

  const specialEffect = person.specialEffect as "theo" | "magata" | "fanny" | "gregoire" | null;
  const effectClass = getSpecialEffectClass(specialEffect);

  return (
    <motion.div
      className={`relative ${isLarge ? "w-full max-w-sm" : "w-full"}`}
      whileHover={onClick ? { y: -4 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      <div
        className={`relative bg-card rounded-3xl border border-card-border overflow-visible cursor-pointer card-shine shadow-lg hover:shadow-xl transition-all duration-300 ${
          isLarge ? "p-8" : "p-4"
        } ${effectClass}`}
        onClick={onClick}
        data-testid={`card-person-${person.id}`}
      >
        <SpecialEffects effect={specialEffect} />
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            className={`${isLarge ? "w-32 h-32" : "w-16 h-16"} rounded-full overflow-hidden border-4 border-background shadow-lg bg-muted`}
            whileHover={{ scale: 1.05 }}
          >
            <img 
              src={avatarSrc}
              alt={person.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <h3 className={`mt-4 font-bold text-foreground text-center ${isLarge ? "text-2xl" : "text-base"}`}>
            {person.name}
          </h3>

          <Badge 
            variant="secondary" 
            className={`mt-2 ${isLarge ? "text-sm" : "text-xs"}`}
          >
            {person.role === "student" ? (
              <>
                <GraduationCap className="w-3 h-3 mr-1" />
                Eleve
              </>
            ) : (
              <>
                <Users className="w-3 h-3 mr-1" />
                Prof
              </>
            )}
          </Badge>

          {averageRating !== undefined && (
            <motion.div
              className="mt-3 flex items-center gap-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-lg text-foreground">
                {averageRating.toFixed(1)}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
