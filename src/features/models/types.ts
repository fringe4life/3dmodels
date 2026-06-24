import type { Model } from "@/db/schema/models";
import type { IsAuthenticated } from "@/features/auth/types";
import type { HasLiked, Likes } from "@/features/models/likes/types";
import type { List, Maybe } from "@/types";
import type { getModelBySlug } from "./queries/get-model-by-slug";

export interface ModelWithLikeStatus extends Model, HasLiked {}

export interface ModelsGridProps extends IsAuthenticated {
  models: ModelWithLikeStatus[];
  title: string;
}
export interface ModelCardProps extends IsAuthenticated {
  model: ModelWithLikeStatus;
}

export type ModelDetail = Maybe<Omit<Model, "hasLiked" | "userId">>;

export type ModelDetailProps = NonNullable<
  Awaited<ReturnType<typeof getModelBySlug>>
> &
  Likes & {
    children?: React.ReactNode;
  };

export type ModelSlugs = List<Pick<Model, "slug">>;

export interface SearchPattern {
  searchPattern: Exclude<Maybe<string>, null>;
}

export interface Category {
  category: Exclude<Maybe<string>, null>;
}
