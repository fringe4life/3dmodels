"use server";

import { maxLength, minLength, object, parse, pipe, string } from "valibot";
import { getUser } from "@/features/auth/queries/get-user";
import { toggleLikeForModel } from "@/features/models/likes/dal/toggle-like";
import type { Maybe } from "@/types";
import { invalidateModel } from "@/utils/cache-invalidation";
import {
  type ActionState,
  fromErrorToActionState,
  toActionState,
} from "@/utils/to-action-state";
import { tryCatch } from "@/utils/try-catch";
import type { LikesCount } from "../types";

const likeSchema = object({
  slug: pipe(
    string(),
    minLength(1, "Model slug is required"),
    maxLength(255, "Model slug is too long"),
  ),
});

const toggleLike = async (
  slugToValidate: string,
  _prevState: Maybe<ActionState>,
  _formData: FormData,
): Promise<ActionState<LikesCount>> => {
  try {
    const user = await getUser();
    if (!user?.id) {
      throw new Error("Authentication required");
    }
    const { slug } = parse(likeSchema, { slug: slugToValidate });

    const userId = user.id;

    const { data, error } = await tryCatch(async () => {
      const { likesCount } = await toggleLikeForModel(userId, slug);

      return toActionState("Like toggled successfully", "SUCCESS", undefined, {
        likesCount,
      });
    });

    if (error || !data) {
      return fromErrorToActionState(
        error || new Error("Failed to toggle like"),
      );
    }

    invalidateModel(slug);

    return data;
  } catch (error) {
    return fromErrorToActionState(error);
  }
};

export { toggleLike };
