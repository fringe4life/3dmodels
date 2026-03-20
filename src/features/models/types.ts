import type { Model } from "@/db/schema/models";
import type { IsAuthenticated } from "@/features/auth/types";
import type { List, Maybe, SearchParamsProps } from "@/types";
import type { PaginatedResult } from "../pagination/types";
import type { toggleLike } from "./actions/likes";
import type { getModelBySlug } from "./queries/get-model-by-slug";

export interface HasLiked {
  hasLiked: boolean;
}

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

export interface HeartButtonAdditionalProps {
  likes: number;
  slug: string;
  toggleAction: typeof toggleLike;
}

export type HeartButtonClientProps = HeartButtonAdditionalProps &
  HasLiked & {
    isAuthenticated: IsAuthenticated;
  };

export type ModelsViewProps = SearchParamsProps & {
  category?: string;
  categoryDisplayName?: string;
};

/** Same shape as `getModels` resolution (`GetModelsReturn`), defined here to avoid circular imports. */
export interface ModelsContentProps {
  displayTitle: string;
  modelsPromise: Promise<{
    isAuthenticated: IsAuthenticated;
    result: PaginatedResult<ModelWithLikeStatus>;
  }>;
}

export type ModelDetailProps = NonNullable<
  Awaited<ReturnType<typeof getModelBySlug>>
> & {
  likes: number;
  children?: React.ReactNode;
};

export type ModelSlugs = List<Pick<Model, "slug">>;
