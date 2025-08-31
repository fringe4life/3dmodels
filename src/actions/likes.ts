"use server";

import { and, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import type { Model } from "@/db/schema";
import { likes, models } from "@/db/schema";
import { auth } from "@/lib/auth";

export type ModelWithLike = Model & { hasLiked: boolean };

export async function toggleLike(prevState: any, formData: FormData) {
  const modelId = Number(formData.get("modelId"));
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
      .where(and(eq(likes.userId, userId), eq(likes.modelId, modelId)))
      .limit(1);

    if (existingLike.length > 0) {
      // Unlike: remove the like record
      await db
        .delete(likes)
        .where(and(eq(likes.userId, userId), eq(likes.modelId, modelId)));

      // Decrement likes count
      await db
        .update(models)
        .set({ likes: sql`likes - 1` })
        .where(eq(models.id, modelId));
    } else {
      // Like: add the like record
      await db.insert(likes).values({
        userId,
        modelId,
      });

      // Increment likes count
      await db
        .update(models)
        .set({ likes: sql`likes + 1` })
        .where(eq(models.id, modelId));
    }

    revalidatePath("/3d-models");
    revalidatePath(`/3d-models/${modelId}`);

    return { success: true };
  } catch (error) {
    console.error("Error toggling like:", error);
    throw new Error("Failed to toggle like");
  }
}

export async function checkIfLiked(modelId: number, userId: string) {
  try {
    const existingLike = await db
      .select()
      .from(likes)
      .where(and(eq(likes.userId, userId), eq(likes.modelId, modelId)))
      .limit(1);

    return existingLike.length > 0;
  } catch (error) {
    console.error("Error checking like status:", error);
    return false;
  }
}
