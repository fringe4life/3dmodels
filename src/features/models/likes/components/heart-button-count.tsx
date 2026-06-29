import type { LikesCount } from "../types";
import { LikesCountTransition } from "./likes-count-transition";

const HeartButtonCount = ({ likesCount }: LikesCount) => (
  <LikesCountTransition likesCount={likesCount}>
    <span>{likesCount}</span>
  </LikesCountTransition>
);

export { HeartButtonCount };
