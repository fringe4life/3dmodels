import type { CategorySlug, ModelId } from "@/db/brands";
import type { Model } from "@/db/schema/models";
import type { HasLiked } from "@/features/models/likes/types";
import type { DirectionState, Limit } from "@/lib/pagination/types";
import type { Prettify } from "@/types";

export type ModelWithLikeStatus = Prettify<Model & HasLiked>;

export type QueryPagination = Prettify<
  Limit &
    DirectionState & {
      cursor: ModelId | undefined;
    }
>;

export interface SearchPattern {
  searchPattern: string | undefined;
}

export interface CategoryFilter {
  category: CategorySlug | undefined;
}
