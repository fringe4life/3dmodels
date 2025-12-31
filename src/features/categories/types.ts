import type { Category } from "@/db/schema/models";
import type { Maybe } from "@/types";

export interface CategoriesNavProps {
  categories: Category[];
}

export type CategoryDetail = Maybe<Pick<Category, "displayName">>;

export interface CategoryName {
  categoryName: string;
}
