export interface HeartLikeOptimisticState {
  liked: boolean;
  likesCount: number;
}

export interface HeartLikeOptimisticAction {
  type: "toggle";
}

/**
 * Builds the `useOptimistic` passthrough state (server-aligned snapshot).
 * Cheap to construct; {@link HeartButtonClient} wraps it in `useMemo` because
 * while idle, `useOptimistic` returns the passthrough object itself—so a new
 * object each render would change `optimistic`'s reference every time even when
 * `hasLiked` / count are unchanged. React does not skip passthrough updates by
 * reference; stable identity is for consumers (deps, memo), not hook correctness.
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
