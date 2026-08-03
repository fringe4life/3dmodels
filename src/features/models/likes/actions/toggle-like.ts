"use server";
import { maxLength, minLength, object, parse, pipe, string } from "valibot";
import { getUser } from "@/features/auth/queries/get-user";
import { toggleLikeForModel } from "@/features/models/likes/dal/toggle-like";
import type { Maybe } from "@/types";
import { invalidateAllModels } from "@/utils/cache-invalidation";
import {
  fromErrorToActionState,
  toActionState,
} from "@/utils/to-action-state/to-action-state";
import type { ActionState } from "@/utils/to-action-state/types";
import type { LikesCount } from "../types";

const likeSchema = object({
  slug: pipe(
    string(),
    minLength(1, "Model slug is required"),
    maxLength(255, "Model slug is too long"),
  ),
});

/**
 * Toggle like for a model, then expire the shared `"models"` cache tag.
 *
 * @see docs/MODEL_CACHE_SPLIT.md — Why all models invalidate today; plan to split long-lived content vs likes (sorting)
 */
const toggleLike = async (
  slugToValidate: string,
  _prevState: Maybe<ActionState>,
  _formData: FormData,
): Promise<ActionState<LikesCount>> => {
  const auth = await getUser();
  if (!auth.isAuthenticated) {
    return fromErrorToActionState(new Error("Authentication required"));
  }

  try {
    const { slug } = parse(likeSchema, { slug: slugToValidate });

    const { likesCount } = await toggleLikeForModel(auth.user.id, slug);

    invalidateAllModels();
    return toActionState("Like toggled successfully", "SUCCESS", undefined, {
      likesCount,
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }
};

export { toggleLike };
