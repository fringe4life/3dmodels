import type { IsAuthenticated } from "@/features/auth/types";
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

export interface HeartButtonAdditionalProps extends Likes {
  slug: string;
  toggleAction: typeof toggleLike;
}

export type HeartButtonClientProps = HeartButtonAdditionalProps &
  HasLiked &
  IsAuthenticated;

export interface HeartVisualState {
  isLiked: boolean;
  isNotLiked: boolean;
  isPending: boolean;
}
