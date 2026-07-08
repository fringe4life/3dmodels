import { count } from "drizzle-orm";
import { db } from "@/db";
import { models } from "@/db/schema/models";
import type { Prettify } from "@/types";
import type { CategoryFilter, SearchPattern } from "../types";
import { buildModelsWhere } from "./build-models-where";

type GetModelsCountParams = Prettify<SearchPattern & CategoryFilter>;

const getModelsCount = async ({
  searchPattern,
  category,
}: GetModelsCountParams): Promise<number> => {
  const [result] = await db
    .select({ count: count() })
    .from(models)
    .where(buildModelsWhere(searchPattern, category));

  return Number(result?.count ?? 0);
};

export { getModelsCount };
