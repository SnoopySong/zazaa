import type { Person, Rating, InsertRating } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getPersons(): Promise<Person[]>;
  getPerson(id: string): Promise<Person | undefined>;
  getRatings(): Promise<Rating[]>;
  getRatingsByPerson(personId: string): Promise<Rating[]>;
  createRating(rating: InsertRating): Promise<Rating>;
}

const INITIAL_PERSONS: Person[] = [
  { id: "1", name: "ARFEUX Médérik", role: "student", specialEffect: null },
  { id: "2", name: "𝕋𝕙𝕖𝕠 (le plus fort du monde entiers)", role: "student", specialEffect: "theo" },
  { id: "3", name: "BLEIN PUAUD Maël", role: "student", specialEffect: null },
  { id: "4", name: "BOUTEILLE Manon", role: "student", specialEffect: null },
  { id: "5", name: "CABY Maëwen", role: "student", specialEffect: null },
  { id: "6", name: "CAILLON Séléna", role: "student", specialEffect: null },
  { id: "7", name: "COUSSEMENT Jean-Noël", role: "student", specialEffect: null },
  { id: "8", name: "COUTURIER Zoé", role: "student", specialEffect: null },
  { id: "9", name: "DO RIO Maxence", role: "student", specialEffect: null },
  { id: "10", name: "DOS SANTOS Luis", role: "student", specialEffect: null },
  { id: "11", name: "DUCATEZ Maelle", role: "student", specialEffect: null },
  { id: "12", name: "FERRAZ Dylan", role: "student", specialEffect: null },
  { id: "13", name: "FUMEY Pablo", role: "student", specialEffect: null },
  { id: "14", name: "GOMEZ Tom", role: "student", specialEffect: null },
  { id: "15", name: "HERVO Gladys", role: "student", specialEffect: null },
  { id: "16", name: "JARDE Léa", role: "student", specialEffect: null },
  { id: "17", name: "LEQUEUX-PEZARD Lyloo", role: "student", specialEffect: null },
  { id: "18", name: "MAIGROT Zoïa", role: "student", specialEffect: null },
  { id: "19", name: "MAITRET Elisa", role: "student", specialEffect: null },
  { id: "20", name: "MARCHAL Jules", role: "student", specialEffect: null },
  { id: "21", name: "Magata (la plus belle)", role: "student", specialEffect: "magata" },
  { id: "22", name: "MOUCHY Lilie", role: "student", specialEffect: null },
  { id: "23", name: "MULLOT Marie", role: "student", specialEffect: null },
  { id: "24", name: "NORMAND Eva", role: "student", specialEffect: null },
  { id: "25", name: "PATIENT Kymia", role: "student", specialEffect: null },
  { id: "26", name: "PAUTRAT Clarysse", role: "student", specialEffect: null },
  { id: "27", name: "REYNIER Solène", role: "student", specialEffect: null },
  { id: "28", name: "RIGNIER Valentin", role: "student", specialEffect: null },
  { id: "29", name: "TRAVIER Axel", role: "student", specialEffect: null },
  { id: "30", name: "VENARD Aurore", role: "student", specialEffect: null },
  { id: "31", name: "ANTHONY-GERROLDT LAURE-HELENE", role: "teacher", specialEffect: null },
  { id: "32", name: "BARRE SOPHIE", role: "teacher", specialEffect: null },
  { id: "33", name: "BOUILLOUX CAROLINE", role: "teacher", specialEffect: null },
  { id: "34", name: "CETRE KARINE", role: "teacher", specialEffect: null },
  { id: "35", name: "GREGOIREEEEEEE", role: "teacher", specialEffect: "gregoire" },
  { id: "36", name: "GENTY THIBAULT", role: "teacher", specialEffect: null },
  { id: "37", name: "GRESSIEN LAURENCE", role: "teacher", specialEffect: null },
  { id: "38", name: "REB SEBASTIEN", role: "teacher", specialEffect: null },
  { id: "39", name: "FANNYYYY", role: "teacher", specialEffect: "fanny" },
];

export class MemStorage implements IStorage {
  private persons: Map<string, Person>;
  private ratings: Map<string, Rating>;

  constructor() {
    this.persons = new Map();
    this.ratings = new Map();
    
    INITIAL_PERSONS.forEach((person) => {
      this.persons.set(person.id, person);
    });
  }

  async getPersons(): Promise<Person[]> {
    return Array.from(this.persons.values());
  }

  async getPerson(id: string): Promise<Person | undefined> {
    return this.persons.get(id);
  }

  async getRatings(): Promise<Rating[]> {
    return Array.from(this.ratings.values());
  }

  async getRatingsByPerson(personId: string): Promise<Rating[]> {
    return Array.from(this.ratings.values()).filter(
      (rating) => rating.personId === personId
    );
  }

  async createRating(insertRating: InsertRating): Promise<Rating> {
    const id = randomUUID();
    const average = (insertRating.beauty + insertRating.funny + insertRating.personality + insertRating.intelligence) / 4;
    const rating: Rating = { 
      ...insertRating, 
      id, 
      average,
      comment: insertRating.comment ?? null 
    };
    this.ratings.set(id, rating);
    return rating;
  }
}

export const storage = new MemStorage();
