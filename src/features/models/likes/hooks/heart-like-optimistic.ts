import type { HasLiked, LikesCount } from "../types";

export interface HeartLikeOptimisticState extends LikesCount, HasLiked {}

interface HeartLikeOptimisticAction {
  type: "toggle";
}

/**
 * Builds the `useOptimistic` passthrough state (server-aligned snapshot).
 */
export const createHeartLikePassthrough = (
  hasLiked: boolean,
  likesCount: number,
): HeartLikeOptimisticState => ({ hasLiked, likesCount });

export const reduceHeartLikeOptimistic = (
  state: HeartLikeOptimisticState,
  _action: HeartLikeOptimisticAction,
): HeartLikeOptimisticState => {
  const newHasLiked = !state.hasLiked;
  return {
    hasLiked: newHasLiked,
    likesCount: newHasLiked ? state.likesCount + 1 : state.likesCount - 1,
  };
};
