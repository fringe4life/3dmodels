import { relations } from "drizzle-orm";
import { users } from "./auth";
import { likes } from "./likes";
import { categories, models } from "./models";

// Define relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  models: many(models),
}));

export const modelsRelations = relations(models, ({ one, many }) => ({
  category: one(categories, {
    fields: [models.categorySlug],
    references: [categories.slug],
  }),
  likes: many(likes),
}));

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, {
    fields: [likes.userId],
    references: [users.id],
  }),
  model: one(models, {
    fields: [likes.modelSlug],
    references: [models.slug],
  }),
}));
