"use server";

import { and, eq, sql } from "drizzle-orm";
import { maxLength, minLength, object, parse, pipe, string } from "valibot";
import { db } from "@/db";
import { likes } from "@/db/schema/likes";
import { models } from "@/db/schema/models";
import getUser from "@/features/auth/queries/get-session";
import type { Maybe } from "@/types";
import { invalidateModel } from "@/utils/cache-invalidation";
import {
  type ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/utils/to-action-state";
import { tryCatch } from "@/utils/try-catch";

const likeSchema = object({
  modelSlug: pipe(
    string(),
    minLength(1, "Model slug is required"),
    maxLength(255, "Model slug is too long"),
  ),
});

const toggleLike = async (
  _prevState: Maybe<ActionState>,
  formData: FormData,
) => {
  try {
    const { modelSlug } = parse(
      likeSchema,
      Object.fromEntries(formData.entries()),
    );

    const user = await getUser();

    if (!user?.id) {
      throw new Error("Authentication required");
    }

    const userId = user.id;

    const { data, error } = await tryCatch(() => {
      return db.transaction(async (tx) => {
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
            .where(
              and(eq(likes.userId, userId), eq(likes.modelSlug, modelSlug)),
            );

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

        return toActionState("Like toggled successfully", "SUCCESS");
      });
    });

    if (error) {
      return fromErrorToActionState(error);
    }

    if (!data) {
      return fromErrorToActionState(new Error("Failed to toggle like"));
    }

    // Invalidate the specific model's cache since likes count changed
    invalidateModel(modelSlug);

    return data;
  } catch (error) {
    return fromErrorToActionState(error);
  }
};

export default toggleLike;
