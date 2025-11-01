import { pgTable, serial, text, timestamp, unique } from "drizzle-orm/pg-core";
import { users } from "./auth";
import { models } from "./models";

export const likes = pgTable(
  "likes",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    modelSlug: text("model_slug")
      .notNull()
      .references(() => models.slug, { onDelete: "cascade" }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [unique("unique_user_model").on(table.userId, table.modelSlug)],
);
