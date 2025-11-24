"use server";

import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { likes } from "@/db/schema/likes";
import { models } from "@/db/schema/models";
import { getSession } from "@/features/auth/queries/get-session";
import { invalidateModel } from "@/utils/cache-invalidation";
import { tryCatch } from "@/utils/try-catch";

export async function toggleLike(_prevState: unknown, formData: FormData) {
  const modelSlug = String(formData.get("modelSlug"));
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Authentication required");
  }

  const userId = session.user.id;

  const { data, error } = await tryCatch(async () => {
    return await db.transaction(async (tx) => {
      // Check if user already liked this model
      const existingLike = await tx
        .select()
        .from(likes)
        .where(and(eq(likes.userId, userId), eq(likes.modelSlug, modelSlug)))
        .limit(1);

      if (existingLike.length > 0) {
        // Unlike: remove the like record
        await tx
          .delete(likes)
          .where(and(eq(likes.userId, userId), eq(likes.modelSlug, modelSlug)));

        // Decrement likes count
        await tx
          .update(models)
          .set({ likes: sql`likes - 1` })
          .where(eq(models.slug, modelSlug));
      } else {
        // Like: add the like record
        await tx.insert(likes).values({
          userId,
          modelSlug,
        });

        // Increment likes count
        await tx
          .update(models)
          .set({ likes: sql`likes + 1` })
          .where(eq(models.slug, modelSlug));
      }

      return { success: true };
    });
  });

  if (error || !data) {
    throw new Error("Failed to toggle like");
  }

  // Invalidate the specific model's cache since likes count changed
  invalidateModel(modelSlug);

  return data;
}

export async function checkIfLiked(modelSlug: string, userId: string) {
  const { data, error } = await tryCatch(
    async () =>
      await db
        .select()
        .from(likes)
        .where(and(eq(likes.userId, userId), eq(likes.modelSlug, modelSlug)))
        .limit(1),
  );

  if (error || !data) {
    throw new Error("Failed to check if liked");
  }

  return data.length > 0;
}
