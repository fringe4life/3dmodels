import type { Model } from "@/db/schema/models";
import type { List, Maybe, SearchParamsProps } from "@/types";
import type { PaginatedResult } from "../pagination/types";
import type { toggleLike } from "./actions/likes";
import type { getModelBySlug } from "./queries/get-model-by-slug";

export interface HasLiked {
  hasLiked: boolean;
}
export interface HasLikedPromise {
  hasLikedPromise: Promise<HasLiked>;
}
export interface ModelWithLikeStatus extends Model, HasLikedPromise {}

export interface HeartButtonWrapperProps
  extends HeartButtonAdditionalProps,
    HasLikedPromise {}

export interface ModelsGridProps {
  models: ModelWithLikeStatus[];
  title: string;
}
export interface ModelCardProps {
  model: ModelWithLikeStatus;
}

export type ModelDetail = Maybe<Omit<Model, "hasLiked" | "userId">>;

export type HeartButtonContentProps =
  | { hasLiked: boolean }
  | { hasLikedPromise: Promise<HasLiked> };

export interface HeartButtonAdditionalProps {
  likes: number;
  slug: string;
  toggleAction: typeof toggleLike;
}

export type ModelsViewProps = SearchParamsProps & {
  category?: string;
  categoryDisplayName?: string;
  title?: string;
};

export interface ModelsContentProps {
  displayTitle: string;
  modelsPromise: Promise<PaginatedResult<ModelWithLikeStatus>>;
}

export type ModelDetailProps = NonNullable<
  Awaited<ReturnType<typeof getModelBySlug>>
> & {
  likes: number;
  children?: React.ReactNode;
};

export type ModelSlugs = List<Pick<Model, "slug">>;
