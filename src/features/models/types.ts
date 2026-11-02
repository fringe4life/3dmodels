import type { CategorySlug, ModelId } from "@/db/brands";
import type { Model } from "@/db/schema/models";
import type { HasLiked } from "@/features/models/likes/types";
import type { DirectionState, Limit } from "@/lib/pagination/types";
import type { Prettify } from "@/types";

/**
 * Model row plus the joined `categories.display_name`. Both the listing and the
 * ranked row join it, so no surface maps a slug to a label by hand.
 */
export type ModelWithCategory = Prettify<
  Model & { categoryDisplayName: string }
>;

export type ModelWithLikeStatus = Prettify<ModelWithCategory & HasLiked>;

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
