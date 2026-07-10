import { db } from "@/db";
import { type Model, models } from "@/db/schema/models";
import type { Sort } from "@/features/models/sort/brands";
import type { PaginationType } from "@/features/pagination/types";
import type { List, Prettify } from "@/types";
import { orderByForSort } from "../sort/order-for-sort";
import type { CategoryFilter, SearchPattern } from "../types";
import { buildModelsWhere } from "./build-models-where";

type GetModelsListParams = Prettify<
  SearchPattern &
    CategoryFilter & {
      pagination: PaginationType;
      sort: Sort;
    }
>;

const getModelsList = ({
  searchPattern,
  category,
  pagination: { limit, page },
  sort,
}: GetModelsListParams): Promise<List<Model>> =>
  db
    .select()
    .from(models)
    .where(buildModelsWhere(searchPattern, category))
    .orderBy(...orderByForSort(sort))
    .limit(limit)
    .offset(page * limit);

export { getModelsList };
