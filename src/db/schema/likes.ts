import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { user } from "./auth";
import { models } from "./models";

export const likes = sqliteTable(
  "likes",
  {
    createdAt: integer("created_at", { mode: "timestamp_ms" })
      .notNull()
      .$defaultFn(() => new Date()),
    id: integer("id").primaryKey({ autoIncrement: true }),
    modelSlug: text("model_slug")
      .notNull()
      .references(() => models.slug, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [unique("unique_user_model").on(table.userId, table.modelSlug)],
);

export type NewLike = typeof likes.$inferInsert;
