import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { ModelId } from "../brands";
import { CATEGORIES, type Category } from "../categories";
import { createId, UUID_V7_LENGTH } from "../create-id";
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

export const models = sqliteTable(
  "models",
  {
    categorySlug: text("category_slug", { enum: categorySlugValues })
      .notNull()
      .references(() => categories.slug),
    dateAdded: integer("date_added", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
    description: text("description").notNull(),
    id: text("id", { length: UUID_V7_LENGTH })
      .$type<ModelId>()
      .primaryKey()
      .$defaultFn(() => createId()),
    image: text("image").notNull(),
    likes: integer("likes").notNull().default(0),
    name: text("name").notNull().unique(),
    slug: text("slug").notNull().unique(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [
    index("models_date_added_id_idx").on(table.dateAdded, table.id),
    index("models_likes_id_idx").on(table.likes, table.id),
    index("models_name_id_idx").on(table.name, table.id),
  ],
);

export type DbCategory = typeof categories.$inferSelect;
export type Model = typeof models.$inferSelect;
