import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { CATEGORIES, type Category } from "../categories";
import { user } from "./auth";

const categorySlugValues = CATEGORIES.map((category) => category.slug) as [
  Category["slug"],
  ...Category["slug"][],
];

export const categories = sqliteTable("categories", {
  displayName: text("display_name").notNull(),
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug", { enum: categorySlugValues }).notNull().unique(),
});

export const models = sqliteTable("models", {
  categorySlug: text("category_slug", { enum: categorySlugValues })
    .notNull()
    .references(() => categories.slug),
  dateAdded: integer("date_added", { mode: "timestamp_ms" })
    .notNull()
    .$defaultFn(() => new Date()),
  description: text("description").notNull(),
  image: text("image").notNull(),
  likes: integer("likes").notNull().default(0),
  name: text("name").notNull().unique(),
  slug: text("slug").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export type DbCategory = typeof categories.$inferSelect;
export type Model = typeof models.$inferSelect;
