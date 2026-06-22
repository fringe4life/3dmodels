import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { likes } from "@/db/schema/likes";
import { models } from "@/db/schema/models";
import type { HasLiked, LikesCount } from "../types";

export interface ToggleLikeResult extends LikesCount, HasLiked {}

export const toggleLikeForModel = async (
  userId: string,
  slug: string,
): Promise<ToggleLikeResult> =>
  db.transaction(async (tx) => {
    const [removed] = await tx
      .delete(likes)
      .where(and(eq(likes.userId, userId), eq(likes.modelSlug, slug)))
      .returning({ id: likes.id });

    const hasLiked = !removed;

    if (hasLiked) {
      await tx.insert(likes).values({
        userId,
        modelSlug: slug,
      });
    }

    const delta = hasLiked ? 1 : -1;

    const [updated] = await tx
      .update(models)
      .set({ likes: sql`likes + ${delta}` })
      .where(eq(models.slug, slug))
      .returning({ likes: models.likes });

    return {
      likesCount: updated?.likes ?? 0,
      hasLiked,
    };
  });
