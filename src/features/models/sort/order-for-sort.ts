/** biome-ignore-all lint/suspicious/noUnnecessaryConditions: false positive — biome cannot resolve Valibot branded Sort through switch cases (tsc validates) */
import { asc, desc } from "drizzle-orm";

import { models } from "@/db/schema/models";
import type { Sort } from "./brands";

const orderByForSort = (sort: Sort) => {
  switch (sort) {
    case "popular":
      return [desc(models.likes), asc(models.name)] as const;
    case "recent":
      return [desc(models.dateAdded), asc(models.name)] as const;
    default:
      return [asc(models.name)] as const;
  }
};

export { orderByForSort };
