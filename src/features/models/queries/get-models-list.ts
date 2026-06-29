import { asc } from "drizzle-orm";
import { db } from "@/db";
import { type Model, models } from "@/db/schema/models";
import type { PaginationType } from "@/features/pagination/types";
import type { List } from "@/types";
import type { CategoryFilter, SearchPattern } from "../types";
import { buildModelsWhere } from "./build-models-where";

interface GetModelsListParams extends SearchPattern, CategoryFilter {
  pagination: PaginationType;
}

const getModelsList = ({
  searchPattern,
  category,
  pagination: { limit, page },
}: GetModelsListParams): Promise<List<Model>> =>
  db
    .select()
    .from(models)
    .where(buildModelsWhere(searchPattern, category))
    .orderBy(asc(models.name))
    .limit(limit)
    .offset(page * limit);

export { getModelsList };
