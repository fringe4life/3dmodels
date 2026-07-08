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
  displayName: text("display_name").notNull(),
  id: serial("id").primaryKey(),
  slug: categorySlugEnum("slug").notNull().unique(),
});

export const models = pgTable("models", {
  categorySlug: categorySlugEnum("category_slug")
    .notNull()
    .references(() => categories.slug),
  dateAdded: timestamp("date_added", { withTimezone: true })
    .notNull()
    .defaultNow(),
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
