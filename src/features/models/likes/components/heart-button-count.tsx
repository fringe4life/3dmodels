import type { Likes } from "../types";
import { LikesCountTransition } from "./likes-count-transition";

const HeartButtonCount = ({ likes }: Likes) => (
  <LikesCountTransition likes={likes}>
    <span>{likes}</span>
  </LikesCountTransition>
);

export { HeartButtonCount };
