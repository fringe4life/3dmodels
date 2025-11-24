import { relations } from "drizzle-orm";
import { account, session, user } from "./auth";
import { likes } from "./likes";
import { categories, models } from "./models";

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

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
  user: one(user, {
    fields: [likes.userId],
    references: [user.id],
  }),
  model: one(models, {
    fields: [likes.modelSlug],
    references: [models.slug],
  }),
}));
