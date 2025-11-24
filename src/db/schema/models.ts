import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  displayName: text("display_name").notNull(),
  slug: text("slug").notNull().unique(),
});

export const models = pgTable("models", {
  slug: text("slug").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  likes: integer("likes").notNull().default(0),
  image: text("image").notNull(),
  categorySlug: text("category_slug")
    .notNull()
    .references(() => categories.slug),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  dateAdded: timestamp("date_added", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;
export type Model = typeof models.$inferSelect;
export type NewModel = typeof models.$inferInsert;
