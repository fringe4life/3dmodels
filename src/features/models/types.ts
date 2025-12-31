import type { Model } from "@/db/schema/models";
import type { SearchParamsProps } from "@/types";
import type toggleLike from "./actions/likes";
import type { getModelBySlug } from "./queries/get-model-by-slug";

export interface HasLiked {
  slug: string;
  hasLiked: boolean;
}

export interface ModelsGridProps {
  title: string;
  models: Model[];
}
export interface ModelCardProps {
  model: Model;
}

export interface HeartButtonClientProps extends HasLiked {
  likesCount: number;
  isAuthenticated: boolean;
  toggleAction: typeof toggleLike;
}

export type HeartButtonAdditionalProps = Pick<
  HeartButtonClientProps,
  "slug" | "toggleAction"
>;

export type ModelsViewProps = SearchParamsProps & {
  category?: string;
  categoryDisplayName?: string;
  title?: string;
};

export type ModelDetailProps = NonNullable<
  Awaited<ReturnType<typeof getModelBySlug>>
>;
