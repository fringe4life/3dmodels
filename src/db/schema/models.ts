import {
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { CATEGORIES, type Category } from "../categories";
import { user } from "./auth";

export const categorySlugEnum = pgEnum(
  "category_slug",
  CATEGORIES.map((category) => category.slug) as [
    Category["slug"],
    ...Category["slug"][],
  ],
);

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  displayName: text("display_name").notNull(),
  slug: categorySlugEnum("slug").notNull().unique(),
});

export const models = pgTable("models", {
  slug: text("slug").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  likes: integer("likes").notNull().default(0),
  image: text("image").notNull(),
  categorySlug: categorySlugEnum("category_slug")
    .notNull()
    .references(() => categories.slug),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  dateAdded: timestamp("date_added", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type DbCategory = typeof categories.$inferSelect;
export type Model = typeof models.$inferSelect;
