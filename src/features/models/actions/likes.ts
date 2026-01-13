"use server";

import { and, eq, sql } from "drizzle-orm";
import { maxLength, minLength, object, parse, pipe, string } from "valibot";
import { db } from "@/db";
import { likes } from "@/db/schema/likes";
import { models } from "@/db/schema/models";
import { getUser } from "@/features/auth/queries/get-user";
import type { Maybe } from "@/types";
import { invalidateModel } from "@/utils/cache-invalidation";
import {
  type ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/utils/to-action-state";
import { tryCatch } from "@/utils/try-catch";

const likeSchema = object({
  slug: pipe(
    string(),
    minLength(1, "Model slug is required"),
    maxLength(255, "Model slug is too long"),
  ),
});

const toggleLike = async (
  _prevState: Maybe<ActionState>,
  formData: FormData,
): Promise<ActionState<{ likesCount: number }>> => {
  try {
    const { slug } = parse(likeSchema, Object.fromEntries(formData.entries()));
    const user = await getUser();

    if (!user?.id) {
      throw new Error("Authentication required");
    }

    const userId = user.id;

    const { data, error } = await tryCatch(() => {
      return db.transaction(async (tx) => {
        // Check if user already liked this model using RQBv2
        const existingLike = await tx.query.likes.findFirst({
          where: {
            userId,
            modelSlug: slug,
          },
        });

        if (existingLike) {
          // Unlike: remove the like record
          await tx
            .delete(likes)
            .where(and(eq(likes.userId, userId), eq(likes.modelSlug, slug)));

          // Decrement likes count
          await tx
            .update(models)
            .set({ likes: sql`likes - 1` })
            .where(eq(models.slug, slug));
        } else {
          // Like: add the like record
          await tx.insert(likes).values({
            userId,
            modelSlug: slug,
          });

          // Increment likes count
          await tx
            .update(models)
            .set({ likes: sql`likes + 1` })
            .where(eq(models.slug, slug));
        }

        // Fetch the updated likes count
        const updatedModel = await tx.query.models.findFirst({
          where: { slug },
          columns: { likes: true },
        });

        const newLikesCount = updatedModel?.likes ?? 0;

        return toActionState(
          "Like toggled successfully",
          "SUCCESS",
          undefined,
          {
            likesCount: newLikesCount,
          },
        );
      });
    });

    if (error || !data) {
      return fromErrorToActionState(
        error || new Error("Failed to toggle like"),
      );
    }

    // Invalidate the specific model's cache since likes count changed
    invalidateModel(slug);

    return data;
  } catch (error) {
    return fromErrorToActionState(error);
  }
};

export { toggleLike };
