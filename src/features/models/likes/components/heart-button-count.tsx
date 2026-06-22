import type { LikesCount } from "../types";
import { LikesCountTransition } from "./likes-count-transition";

const HeartButtonCount = ({ likesCount }: LikesCount) => (
  <LikesCountTransition count={likesCount}>
    <span>{likesCount}</span>
  </LikesCountTransition>
);

export { HeartButtonCount };
