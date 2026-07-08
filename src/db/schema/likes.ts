import { pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";
import { user } from "./auth";
import { models } from "./models";

export const likes = pgTable(
  "likes",
  {
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
    id: serial("id").primaryKey(),
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
