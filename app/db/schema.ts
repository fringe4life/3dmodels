import { relations } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  displayName: text("display_name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const models = pgTable("models", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  likes: integer("likes").notNull().default(0),
  image: text("image").notNull(),
  categorySlug: text("category_slug")
    .notNull()
    .references(() => categories.slug),
  dateAdded: timestamp("date_added", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

// Define relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  models: many(models),
}));

export const modelsRelations = relations(models, ({ one }) => ({
  category: one(categories, {
    fields: [models.categorySlug],
    references: [categories.slug],
  }),
}));

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Model = typeof models.$inferSelect;
export type NewModel = typeof models.$inferInsert;
