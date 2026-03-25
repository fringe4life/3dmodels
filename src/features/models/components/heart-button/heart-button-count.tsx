import type { HeartLikeOptimisticState } from "./heart-like-optimistic";
import { LikesCountTransition } from "./likes-count-transition";

const HeartButtonCount = ({
  likesCount,
}: Pick<HeartLikeOptimisticState, "likesCount">) => (
  <LikesCountTransition count={likesCount}>
    <span>{likesCount}</span>
  </LikesCountTransition>
);

export { HeartButtonCount };
