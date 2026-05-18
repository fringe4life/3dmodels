export interface HeartLikeOptimisticState {
  liked: boolean;
  likesCount: number;
}

export interface HeartLikeOptimisticAction {
  type: "toggle";
}

/**
 * Builds the `useOptimistic` passthrough state (server-aligned snapshot).
 */
export const createHeartLikePassthrough = (
  hasLiked: boolean,
  likesCount: number,
): HeartLikeOptimisticState => ({ liked: hasLiked, likesCount });

export const reduceHeartLikeOptimistic = (
  state: HeartLikeOptimisticState,
  _action: HeartLikeOptimisticAction,
): HeartLikeOptimisticState => {
  const newLiked = !state.liked;
  return {
    liked: newLiked,
    likesCount: newLiked ? state.likesCount + 1 : state.likesCount - 1,
  };
};
