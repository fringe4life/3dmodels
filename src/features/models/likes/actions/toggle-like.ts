"use server";

import { maxLength, minLength, object, pipe, string } from "valibot";
import { toggleLikeForModel } from "@/features/models/likes/dal/toggle-like";
import { authActionClient, formDataInput } from "@/lib/safe-action";
import { invalidateAllModels } from "@/utils/cache-invalidation";

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
const toggleLike = authActionClient
  .inputSchema(formDataInput(likeSchema))
  .stateAction(async ({ ctx: { user }, parsedInput: { slug } }) => {
    const result = await toggleLikeForModel(user.id, slug);
    invalidateAllModels();
    return result;
  });

export { toggleLike };
