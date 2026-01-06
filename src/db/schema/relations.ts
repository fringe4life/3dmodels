import { defineRelations } from "drizzle-orm";
import { schema } from ".";

export const relations = defineRelations(schema, (r) => ({
  user: {
    sessions: r.many.session(),
    accounts: r.many.account(),
    models: r.many.models(),
  },
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
    }),
  },
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },
  categories: {
    models: r.many.models(),
  },
  models: {
    category: r.one.categories({
      from: r.models.categorySlug,
      to: r.categories.slug,
    }),
    user: r.one.user({
      from: r.models.userId,
      to: r.user.id,
    }),
    modelLikes: r.many.likes(),
  },
  likes: {
    user: r.one.user({
      from: r.likes.userId,
      to: r.user.id,
    }),
    model: r.one.models({
      from: r.likes.modelSlug,
      to: r.models.slug,
    }),
  },
}));
