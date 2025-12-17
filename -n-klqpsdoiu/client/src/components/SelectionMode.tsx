import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, GraduationCap, Users } from "lucide-react";
import type { Person } from "@shared/schema";
import { PersonCard } from "./PersonCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SelectionModeProps {
  persons: Person[];
  onSelect: (person: Person) => void;
}

type FilterType = "all" | "student" | "teacher";

export function SelectionMode({ persons, onSelect }: SelectionModeProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredPersons = useMemo(() => {
    return persons.filter((person) => {
      const matchesSearch = person.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesFilter =
        filter === "all" ||
        (filter === "student" && person.role === "student") ||
        (filter === "teacher" && person.role === "teacher");
      return matchesSearch && matchesFilter;
    });
  }, [persons, search, filter]);

  const students = persons.filter((p) => p.role === "student");
  const teachers = persons.filter((p) => p.role === "teacher");

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <motion.div
        className="flex flex-col sm:flex-row gap-4 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher une personne..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-12 rounded-full"
            data-testid="input-search"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
            className="rounded-full"
            data-testid="button-filter-all"
          >
            <Filter className="w-4 h-4 mr-2" />
            Tous ({persons.length})
          </Button>
          <Button
            variant={filter === "student" ? "default" : "outline"}
            onClick={() => setFilter("student")}
            className="rounded-full"
            data-testid="button-filter-students"
          >
            <GraduationCap className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Eleves</span>
            <span className="sm:hidden">{students.length}</span>
            <span className="hidden sm:inline ml-1">({students.length})</span>
          </Button>
          <Button
            variant={filter === "teacher" ? "default" : "outline"}
            onClick={() => setFilter("teacher")}
            className="rounded-full"
            data-testid="button-filter-teachers"
          >
            <Users className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Profs</span>
            <span className="sm:hidden">{teachers.length}</span>
            <span className="hidden sm:inline ml-1">({teachers.length})</span>
          </Button>
        </div>
      </motion.div>

      <AnimatePresence mode="popLayout">
        {filteredPersons.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-foreground">
              Aucun resultat
            </h3>
            <p className="text-muted-foreground mt-2">
              Essaie avec un autre nom
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            layout
          >
            {filteredPersons.map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                layout
              >
                <PersonCard
                  person={person}
                  size="small"
                  onClick={() => onSelect(person)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
