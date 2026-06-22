import type { IsAuthenticated } from "@/features/auth/types";
import type { toggleLike } from "./actions/toggle-like";

export interface HasLiked {
  hasLiked: boolean;
}

export interface LikesCount {
  likesCount: number;
}

export interface HeartButtonAdditionalProps {
  likes: number;
  slug: string;
  toggleAction: typeof toggleLike;
}

export type HeartButtonClientProps = HeartButtonAdditionalProps &
  HasLiked & {
    isAuthenticated: IsAuthenticated;
  };

export interface HeartVisualState {
  isLiked: boolean;
  isNotLiked: boolean;
  isPending: boolean;
}
