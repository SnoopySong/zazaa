import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Person, InsertRating, SpecialEffect } from "@shared/schema";
import { Header } from "@/components/Header";
import { TinderMode } from "@/components/TinderMode";
import { SelectionMode } from "@/components/SelectionMode";
import { RatingModal } from "@/components/RatingModal";
import { SnoopyBackground } from "@/components/SnoopyBackground";
import { SnoopyLoading } from "@/components/SnoopyLoading";
import { GlobalEffects } from "@/components/GlobalEffects";
import { shuffleArray } from "@/lib/persons";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

type Mode = "tinder" | "selection";

export default function Home() {
  const [mode, setMode] = useState<Mode>("tinder");
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [currentVisiblePerson, setCurrentVisiblePerson] = useState<Person | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: persons = [], isLoading, isError } = useQuery<Person[]>({
    queryKey: ["/api/persons"],
  });

  const shuffledPersons = useMemo(() => {
    const shuffled = shuffleArray(persons);
    if (shuffled.length > 0 && !currentVisiblePerson) {
      setCurrentVisiblePerson(shuffled[0]);
    }
    return shuffled;
  }, [persons]);

  const submitRating = useMutation({
    mutationFn: async (data: { personId: string; rating: Omit<InsertRating, "personId"> }) => {
      const res = await apiRequest("POST", "/api/ratings", {
        personId: data.personId,
        ...data.rating,
      });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Note envoyee !",
        description: "Merci pour ta participation",
      });
      setSelectedPerson(null);
      queryClient.invalidateQueries({ queryKey: ["/api/ratings"] });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Impossible d'envoyer la note",
        variant: "destructive",
      });
    },
  });

  const handleRate = (person: Person) => {
    setSelectedPerson(person);
  };

  const handleSubmitRating = (rating: Omit<InsertRating, "personId">) => {
    if (selectedPerson) {
      submitRating.mutate({ personId: selectedPerson.id, rating });
    }
  };

  const handlePersonChange = (person: Person | null) => {
    setCurrentVisiblePerson(person);
  };

  if (isLoading) {
    return <SnoopyLoading />;
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-2xl font-bold text-foreground">Erreur de chargement</h2>
          <p className="text-muted-foreground mt-2">Impossible de charger les personnes</p>
        </div>
      </div>
    );
  }

  const currentEffect = currentVisiblePerson?.specialEffect as SpecialEffect;

  return (
    <div className="min-h-screen bg-background gradient-bg relative">
      <SnoopyBackground />
      
      <AnimatePresence>
        {currentEffect && mode === "tinder" && (
          <GlobalEffects effect={currentEffect} />
        )}
      </AnimatePresence>
      
      <Header mode={mode} onModeChange={setMode} />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          {mode === "tinder" ? (
            <motion.div
              key="tinder"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <TinderMode 
                persons={shuffledPersons} 
                onRate={handleRate} 
                onPersonChange={handlePersonChange}
              />
            </motion.div>
          ) : (
            <motion.div
              key="selection"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <SelectionMode persons={persons} onSelect={handleRate} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <AnimatePresence>
        {selectedPerson && (
          <RatingModal
            person={selectedPerson}
            onClose={() => setSelectedPerson(null)}
            onSubmit={handleSubmitRating}
            isSubmitting={submitRating.isPending}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
