import type { CategorySlug } from "@/db/brands";
import type { Model } from "@/db/schema/models";
import type { HasLiked } from "@/features/models/likes/types";
import type { Prettify } from "@/types";

export type ModelWithLikeStatus = Prettify<Model & HasLiked>;

export interface SearchPattern {
  searchPattern: string | undefined;
}

export interface CategoryFilter {
  category: CategorySlug | undefined;
}
