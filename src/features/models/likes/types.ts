import type { Prettify } from "@/types";
import type { toggleLike } from "./actions/toggle-like";

export interface HasLiked {
  hasLiked: boolean;
}

export interface LikesCount {
  likesCount: number;
}

export interface Likes {
  likes: number;
}

export type HeartButtonAdditionalProps = Prettify<
  Likes & {
    disableTransition?: boolean;
    slug: string;
    toggleAction: typeof toggleLike;
  }
>;

export type HeartVisualState = "liked" | "unliked" | "pending";
