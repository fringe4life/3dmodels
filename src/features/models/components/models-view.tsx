/** biome-ignore-all lint/suspicious/noUnnecessaryConditions: false positive — biome type inference cannot resolve the PaginatedResult discriminated union across the awaited getModels() call, so it wrongly reports these cases unreachable (tsc validates the switch) */
import { css } from "@styled-system/css";
import { grid } from "@styled-system/patterns";
import type { Route } from "next";
import { Suspense } from "react";
import type { CategorySlug } from "@/db/brands";
import { ModelsGridSkeleton } from "@/features/models/components/models-grid-skeleton";
import { DEFAULT_TITLE } from "@/features/models/constants";
import { getModels } from "@/features/models/dal/get-models";
import { Pagination } from "@/features/pagination/components/pagination";
import { PaginationOffsetTransition } from "@/features/pagination/components/pagination-offset-transition";
import { PaginationSkeleton } from "@/features/pagination/components/pagination-skeleton";
import { canonicalPathForListing } from "@/features/pagination/listing-canonical";
import type { Prettify, SearchParamsProps } from "@/types";
import { ModelsGrid } from "./models-grid";
import { ModelsGridHeader } from "./models-grid-header";
import { ModelsNotFound } from "./models-not-found";

type ModelsViewProps = Prettify<
  SearchParamsProps & {
    category?: CategorySlug;
    categoryDisplayName?: string;
  }
>;

const ModelsViewInner = async ({ searchParams, category }: ModelsViewProps) => {
  const listingPathname = (
    category ? `/3d-models/categories/${category}` : "/3d-models"
  ) satisfies Route;

  const [{ isAuthenticated, query, result }, returnTo] = await Promise.all([
    getModels(searchParams, category),
    canonicalPathForListing(listingPathname, searchParams),
  ]);
  // DO AUTH CHECKS HERE AND MAKE SLUG LIST HERE
  // WE COULD EVEN PASS THE LIST FROM THIS SERVER COMPONENT TO

  switch (result.type) {
    case "error":
      throw new Error(result.message);
    case "empty":
      if (query) {
        return <ModelsNotFound query={query} />;
      }
      return (
        <p
          className={css({
            color: "text.muted",
            fontSize: "sm",
            fontStyle: "italic",
            paddingInlineEnd: "1",
            textAlign: "right",
          })}
        >
          No models found
        </p>
      );
    case "success":
      return (
        <PaginationOffsetTransition metadata={result.metadata}>
          <div
            className={grid({
              alignContent: "space-between",
              gridAutoRows: "min",
              rowGap: 4,
            })}
          >
            <ModelsGrid
              isAuthenticated={isAuthenticated}
              models={result.items}
              returnTo={returnTo}
            />
            <Pagination metadata={result.metadata} />
          </div>
        </PaginationOffsetTransition>
      );
    default:
      throw new Error("Should not happen") as never;
  }
};

const ModelsView = ({ categoryDisplayName, ...props }: ModelsViewProps) => (
  <div
    className={grid({
      gridAutoRows: "min",
    })}
  >
    <ModelsGridHeader fallbackTitle={categoryDisplayName ?? DEFAULT_TITLE} />
    <Suspense
      fallback={
        <>
          <ModelsGridSkeleton />
          <PaginationSkeleton />
        </>
      }
    >
      <ModelsViewInner {...props} />
    </Suspense>
  </div>
);

export { ModelsView };
