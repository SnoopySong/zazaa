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
      whileHover={onClick ? { y: -6, scale: 1.02 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
    >
      <div
        className={`relative glass-card rounded-3xl overflow-visible cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 ${
          isLarge ? "p-8" : "p-4"
        } ${effectClass} neon-border`}
        onClick={onClick}
        data-testid={`card-person-${person.id}`}
      >
        <SpecialEffects effect={specialEffect} />
        
        <div className="relative z-10 flex flex-col items-center">
          <motion.div
            className="avatar-ring"
            whileHover={{ scale: 1.08, rotate: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className={`${isLarge ? "w-32 h-32" : "w-16 h-16"} rounded-full overflow-hidden bg-card`}>
              <img 
                src={avatarSrc}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <h3 className={`mt-5 font-bold text-foreground text-center ${isLarge ? "text-2xl" : "text-base"}`}>
            {person.name}
          </h3>

          <Badge 
            className={`mt-3 ${isLarge ? "text-sm px-4 py-1" : "text-xs"} bg-primary/10 text-primary border-primary/20 font-medium`}
          >
            {person.role === "student" ? (
              <>
                <GraduationCap className="w-3.5 h-3.5 mr-1.5" />
                Eleve
              </>
            ) : (
              <>
                <Users className="w-3.5 h-3.5 mr-1.5" />
                Prof
              </>
            )}
          </Badge>

          {averageRating !== undefined && (
            <motion.div
              className="mt-4 flex items-center gap-1.5 bg-yellow-500/10 px-3 py-1.5 rounded-full"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
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
