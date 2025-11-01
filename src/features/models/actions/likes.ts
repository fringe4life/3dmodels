"use server";

import { and, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { likes } from "@/db/schema/likes";
import { models } from "@/db/schema/models";
import { invalidateModel } from "@/features/models/utils/cache-invalidation";
import { auth } from "@/lib/auth";

export async function toggleLike(_prevState: unknown, formData: FormData) {
  const modelSlug = String(formData.get("modelSlug"));
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Authentication required");
  }

  const userId = session.user.id;

  try {
    // Check if user already liked this model
    const existingLike = await db
      .select()
      .from(likes)
      .where(and(eq(likes.userId, userId), eq(likes.modelSlug, modelSlug)))
      .limit(1);

    if (existingLike.length > 0) {
      // Unlike: remove the like record
      await db
        .delete(likes)
        .where(and(eq(likes.userId, userId), eq(likes.modelSlug, modelSlug)));

      // Decrement likes count
      await db
        .update(models)
        .set({ likes: sql`likes - 1` })
        .where(eq(models.slug, modelSlug));
    } else {
      // Like: add the like record
      await db.insert(likes).values({
        userId,
        modelSlug,
      });

      // Increment likes count
      await db
        .update(models)
        .set({ likes: sql`likes + 1` })
        .where(eq(models.slug, modelSlug));
    }

    // Invalidate the specific model's cache since likes count changed
    invalidateModel(modelSlug);

    return { success: true };
  } catch {
    throw new Error("Failed to toggle like");
  }
}

export async function checkIfLiked(modelSlug: string, userId: string) {
  try {
    const existingLike = await db
      .select()
      .from(likes)
      .where(and(eq(likes.userId, userId), eq(likes.modelSlug, modelSlug)))
      .limit(1);

    return existingLike.length > 0;
  } catch {
    throw new Error("Failed to check if liked");
  }
}
