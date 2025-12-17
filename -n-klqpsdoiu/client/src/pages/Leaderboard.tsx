import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Person, Rating } from "@shared/schema";
import { Header } from "@/components/Header";
import { SnoopyBackground } from "@/components/SnoopyBackground";
import { SnoopyLoading } from "@/components/SnoopyLoading";
import { getGender } from "@/lib/gender";
import { Star, Trophy, Medal, Award, MessageCircle, X, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLocation } from "wouter";

interface PersonWithStats extends Person {
  averageRating: number;
  totalRatings: number;
  ratings: Rating[];
}

export default function Leaderboard() {
  const [selectedPerson, setSelectedPerson] = useState<PersonWithStats | null>(null);
  const [, setLocation] = useLocation();

  const { data: persons = [], isLoading: loadingPersons } = useQuery<Person[]>({
    queryKey: ["/api/persons"],
  });

  const { data: ratings = [], isLoading: loadingRatings } = useQuery<Rating[]>({
    queryKey: ["/api/ratings"],
  });

  const personsWithStats: PersonWithStats[] = persons.map(person => {
    const personRatings = ratings.filter(r => r.personId === person.id);
    const avgRating = personRatings.length > 0
      ? personRatings.reduce((sum, r) => sum + r.average, 0) / personRatings.length
      : 0;
    return {
      ...person,
      averageRating: avgRating,
      totalRatings: personRatings.length,
      ratings: personRatings,
    };
  }).sort((a, b) => b.averageRating - a.averageRating);

  if (loadingPersons || loadingRatings) {
    return <SnoopyLoading />;
  }

  const getRankIcon = (index: number) => {
    if (index === 0) return <Trophy className="w-6 h-6 text-yellow-500" />;
    if (index === 1) return <Medal className="w-6 h-6 text-gray-400" />;
    if (index === 2) return <Award className="w-6 h-6 text-amber-600" />;
    return <span className="w-6 h-6 flex items-center justify-center font-bold text-muted-foreground">{index + 1}</span>;
  };

  return (
    <div className="min-h-screen bg-background relative">
      <SnoopyBackground />
      
      <Header showBackButton onBack={() => setLocation("/")} />

      <main className="relative z-10 max-w-2xl mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
            <Trophy className="w-7 h-7 text-yellow-500" />
            Classement
          </h2>
          <p className="text-muted-foreground mt-1">Cliquez sur une personne pour voir les details</p>
        </motion.div>

        <div className="space-y-3">
          {personsWithStats.map((person, index) => (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
                onClick={() => setSelectedPerson(person)}
              >
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    {getRankIcon(index)}
                  </div>
                  
                  <div className="flex-shrink-0">
                    <img 
                      src={getGender(person.name) === "female" ? "/images/snoopy-girl.png" : "/images/snoopy-boy.png"}
                      alt={person.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-border"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">{person.name}</h3>
                    <Badge variant="secondary" className="text-xs mt-1">
                      {person.role === "student" ? "Eleve" : "Prof"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-lg">
                      {person.averageRating > 0 ? person.averageRating.toFixed(1) : "-"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({person.totalRatings})
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>

      <AnimatePresence>
        {selectedPerson && (
          <PersonDetailModal 
            person={selectedPerson} 
            onClose={() => setSelectedPerson(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

interface PersonDetailModalProps {
  person: PersonWithStats;
  onClose: () => void;
}

function PersonDetailModal({ person, onClose }: PersonDetailModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card rounded-2xl shadow-xl max-w-lg w-full max-h-[80vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src={getGender(person.name) === "female" ? "/images/snoopy-girl.png" : "/images/snoopy-boy.png"}
                alt={person.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-border"
              />
              <div>
                <h3 className="text-xl font-bold text-foreground">{person.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold">
                    {person.averageRating > 0 ? person.averageRating.toFixed(1) : "-"}
                  </span>
                  <span className="text-muted-foreground">
                    ({person.totalRatings} notes)
                  </span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[50vh] p-6">
          {person.ratings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Aucune note pour le moment</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <StatCard label="Beaute" value={getAverageCategory(person.ratings, "beauty")} />
                <StatCard label="Humour" value={getAverageCategory(person.ratings, "funny")} />
                <StatCard label="Personnalite" value={getAverageCategory(person.ratings, "personality")} />
                <StatCard label="Intelligence" value={getAverageCategory(person.ratings, "intelligence")} />
              </div>

              <h4 className="font-semibold text-foreground flex items-center gap-2 mb-3">
                <MessageCircle className="w-4 h-4" />
                Commentaires ({person.ratings.filter(r => r.comment).length})
              </h4>
              
              {person.ratings.filter(r => r.comment).map((rating, index) => (
                <motion.div
                  key={rating.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-muted/50 rounded-lg p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{rating.average.toFixed(1)}</span>
                  </div>
                  <p className="text-foreground">{rating.comment}</p>
                </motion.div>
              ))}

              {person.ratings.filter(r => r.comment).length === 0 && (
                <p className="text-muted-foreground text-center py-4">Aucun commentaire</p>
              )}
            </div>
          )}
        </ScrollArea>
      </motion.div>
    </motion.div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-muted/50 rounded-lg p-3 text-center">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-xl font-bold text-foreground">{value > 0 ? value.toFixed(1) : "-"}</p>
    </div>
  );
}

function getAverageCategory(ratings: Rating[], category: keyof Pick<Rating, "beauty" | "funny" | "personality" | "intelligence">): number {
  if (ratings.length === 0) return 0;
  return ratings.reduce((sum, r) => sum + r[category], 0) / ratings.length;
}
