import type { Likes } from "../types";
import { heartCountClassName } from "./heart-button-recipe";
import { LikesCountTransition } from "./likes-count-transition";

const HeartButtonCount = ({ likes }: Likes) => (
  <LikesCountTransition likes={likes}>
    <span className={heartCountClassName}>{likes}</span>
  </LikesCountTransition>
);

export { HeartButtonCount };
