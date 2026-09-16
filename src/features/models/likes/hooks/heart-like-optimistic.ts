import type { Prettify } from "@/types";
import type { HasLiked, Likes } from "../types";

export type HeartLikeOptimisticState = Prettify<Likes & HasLiked>;

interface HeartLikeOptimisticAction {
  type: "toggle";
}

export const reduceHeartLikeOptimistic = (
  state: HeartLikeOptimisticState,
  _action: HeartLikeOptimisticAction,
): HeartLikeOptimisticState => {
  const newHasLiked = !state.hasLiked;
  return {
    hasLiked: newHasLiked,
    likes: newHasLiked ? state.likes + 1 : state.likes - 1,
  };
};
