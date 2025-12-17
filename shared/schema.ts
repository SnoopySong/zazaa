import { pgTable, text, varchar, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const persons = pgTable("persons", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: text("name").notNull(),
  role: text("role").notNull(),
  specialEffect: text("special_effect"),
});

export const ratings = pgTable("ratings", {
  id: varchar("id", { length: 50 }).primaryKey(),
  personId: varchar("person_id", { length: 50 }).notNull(),
  beauty: integer("beauty").notNull(),
  funny: integer("funny").notNull(),
  personality: integer("personality").notNull(),
  intelligence: integer("intelligence").notNull(),
  average: real("average").notNull(),
  comment: text("comment"),
});

export const insertPersonSchema = createInsertSchema(persons).omit({ id: true });
export const insertRatingSchema = createInsertSchema(ratings).omit({ id: true, average: true });

export type InsertPerson = z.infer<typeof insertPersonSchema>;
export type Person = typeof persons.$inferSelect;
export type InsertRating = z.infer<typeof insertRatingSchema>;
export type Rating = typeof ratings.$inferSelect;

export type SpecialEffect = "theo" | "magata" | "fanny" | "gregoire" | null;
