import { defineRelations } from "drizzle-orm";
import { schema } from ".";

export const relations = defineRelations(schema, (r) => ({
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },
  categories: {
    models: r.many.models(),
  },
  likes: {
    model: r.one.models({
      from: r.likes.modelSlug,
      to: r.models.slug,
    }),
    user: r.one.user({
      from: r.likes.userId,
      to: r.user.id,
    }),
  },
  models: {
    category: r.one.categories({
      from: r.models.categorySlug,
      to: r.categories.slug,
    }),
    modelLikes: r.many.likes(),
    user: r.one.user({
      from: r.models.userId,
      to: r.user.id,
    }),
  },
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
    }),
  },
  user: {
    accounts: r.many.account(),
    models: r.many.models(),
    sessions: r.many.session(),
  },
}));
