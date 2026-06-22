import type { Model } from "@/db/schema/models";
import type { IsAuthenticated } from "@/features/auth/types";
import type { HasLiked } from "@/features/models/likes/types";
import type { List, Maybe, SearchParamsProps } from "@/types";
import type { getModelBySlug } from "./queries/get-model-by-slug";

export interface ModelWithLikeStatus extends Model, HasLiked {}

export interface ModelsGridProps {
  isAuthenticated: IsAuthenticated;
  models: ModelWithLikeStatus[];
  title: string;
}
export interface ModelCardProps {
  isAuthenticated: IsAuthenticated;
  model: ModelWithLikeStatus;
}

export type ModelDetail = Maybe<Omit<Model, "hasLiked" | "userId">>;

export type ModelsViewProps = SearchParamsProps & {
  category?: string;
  categoryDisplayName?: string;
};

export type ModelDetailProps = NonNullable<
  Awaited<ReturnType<typeof getModelBySlug>>
> & {
  likes: number;
  children?: React.ReactNode;
};

export type ModelSlugs = List<Pick<Model, "slug">>;
