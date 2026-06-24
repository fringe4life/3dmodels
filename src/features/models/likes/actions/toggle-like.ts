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
  const auth = await getUser();
  if (!auth.isAuthenticated) {
    return fromErrorToActionState(new Error("Authentication required"));
  }

  try {
    const { slug } = parse(likeSchema, { slug: slugToValidate });

    const { likesCount } = await toggleLikeForModel(auth.user.id, slug);

    invalidateModel(slug);
    return toActionState("Like toggled successfully", "SUCCESS", undefined, {
      likesCount,
    });
  } catch (error) {
    return fromErrorToActionState(error);
  }
};

export { toggleLike };
