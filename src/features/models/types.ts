import type { Model } from "@/db/schema/models";
import type { List, Maybe, SearchParamsProps } from "@/types";
import type { PaginatedResult } from "../pagination/types";
import type { toggleLike } from "./actions/likes";
import type { ModelWithLikeStatus } from "./dal/get-models";
import type { getModelBySlug } from "./queries/get-model-by-slug";

export interface HasLiked {
  hasLiked: boolean;
}

export interface ModelsGridProps {
  title: string;
  models: ModelWithLikeStatus[];
}
export interface ModelCardProps {
  model: ModelWithLikeStatus;
}

export type ModelDetail = Maybe<Omit<Model, "hasLiked" | "userId">>;

export type HeartButtonContentProps =
  | ({ hasLiked: boolean } & { hasLikedPromise?: never })
  | ({ hasLikedPromise: Promise<HasLiked> } & { hasLiked?: never });

export interface HeartButtonAdditionalProps {
  slug: string;
  likes: number;
  toggleAction: typeof toggleLike;
}

export type ModelsViewProps = SearchParamsProps & {
  category?: string;
  categoryDisplayName?: string;
  title?: string;
};

export interface ModelsContentProps {
  modelsPromise: Promise<PaginatedResult<ModelWithLikeStatus>>;
  displayTitle: string;
}

export type ModelDetailProps = NonNullable<
  Awaited<ReturnType<typeof getModelBySlug>>
> & {
  likes: number;
  children?: React.ReactNode;
};

export type ModelSlugs = List<Pick<Model, "slug">>;

export interface HasLikedPromise {
  hasLikedPromise: Promise<HasLiked>;
}
