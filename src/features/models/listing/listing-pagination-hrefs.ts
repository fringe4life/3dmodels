import type { Route } from "next";
import type { LimitOption } from "@/components/pagination/pagination-limit-control";
import {
  type ListingSearchValues,
  listingHref,
} from "@/features/models/listing/listing-serialize";
import { LIMITS } from "@/lib/pagination/constants";
import type { Id } from "@/lib/pagination/types";

interface ListingPaginationHrefsParams<T extends Id> {
  base: Route;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  items: T[];
  values: ListingSearchValues;
}

interface ListingPaginationHrefs {
  currentLimit: LimitOption["value"];
  limitOptions: LimitOption[];
  nextHref: Route | null;
  previousHref: Route | null;
}

const listingPaginationHrefs = <T extends Id>({
  base,
  hasNextPage,
  hasPreviousPage,
  items,
  values,
}: ListingPaginationHrefsParams<T>): ListingPaginationHrefs => {
  const firstId = items.at(0)?.id;
  const lastId = items.at(-1)?.id;

  return {
    currentLimit: values.limit,
    limitOptions: LIMITS.map((value) => ({
      href: listingHref(base, { ...values, limit: value }),
      value,
    })),
    nextHref:
      hasNextPage && lastId
        ? listingHref(base, {
            ...values,
            cursor: lastId,
            direction: "forward",
          })
        : null,
    previousHref:
      hasPreviousPage && firstId
        ? listingHref(base, {
            ...values,
            cursor: firstId,
            direction: "backward",
          })
        : null,
  };
};

export type { ListingPaginationHrefs };
export { listingPaginationHrefs };
