/** biome-ignore-all lint/suspicious/noUnnecessaryConditions: false positive — biome cannot resolve Valibot branded Sort through switch cases (tsc validates) */
import { asc, desc } from "drizzle-orm";

import { models } from "@/db/schema/models";
import type { Direction, SortDirection } from "@/lib/pagination/types";
import type { Sort } from "./brands";

const isReversed = (direction: Direction): boolean => direction === "backward";

const orderByForSort = (sort: Sort, direction: Direction = "forward") => {
  const reverse = isReversed(direction);

  switch (sort) {
    case "popular":
      return reverse
        ? ([asc(models.likes), asc(models.id)] as const)
        : ([desc(models.likes), desc(models.id)] as const);
    case "recent":
      return reverse
        ? ([asc(models.dateAdded), asc(models.id)] as const)
        : ([desc(models.dateAdded), desc(models.id)] as const);
    default:
      return reverse
        ? ([desc(models.name), desc(models.id)] as const)
        : ([asc(models.name), asc(models.id)] as const);
  }
};

const sortColumnForSort = (sort: Sort) => {
  switch (sort) {
    case "popular":
      return models.likes;
    case "recent":
      return models.dateAdded;
    default:
      return models.name;
  }
};

const sortDirectionForSort = (
  sort: Sort,
  direction: Direction = "forward",
): SortDirection => {
  const reverse = isReversed(direction);

  switch (sort) {
    case "popular":
    case "recent":
      return reverse ? "asc" : "desc";
    default:
      return reverse ? "desc" : "asc";
  }
};

export { orderByForSort, sortColumnForSort, sortDirectionForSort };
