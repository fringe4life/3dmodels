import { css } from "@styled-system/css";
import { grid } from "@styled-system/patterns";
import type { Route } from "next";
import { Suspense } from "react";
import { Pagination } from "@/components/pagination/pagination";
import { PaginationPageSlice } from "@/components/pagination/pagination-page-slice";
import { PaginationSkeleton } from "@/components/pagination/pagination-skeleton";
import type { CategorySlug } from "@/db/brands";
import { ModelsGridSkeleton } from "@/features/models/components/models-grid-skeleton";
import { DEFAULT_TITLE } from "@/features/models/constants";
import { getModels } from "@/features/models/dal/get-models";
import { canonicalPathForListing } from "@/features/models/listing/listing-canonical";
import type { ModelWithLikeStatus } from "@/features/models/types";
import type { IsAuthenticated } from "@/lib/auth/types";
import type { PaginatedResult } from "@/lib/pagination/types";
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

type ModelsViewResultProps = Prettify<
  IsAuthenticated & {
    query: string;
    result: PaginatedResult<ModelWithLikeStatus>;
    returnTo: Route;
  }
>;

const ModelsViewResult = ({
  isAuthenticated,
  query,
  result,
  returnTo,
}: ModelsViewResultProps) => {
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
        <PaginationPageSlice>
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
            <Pagination items={result.items} metadata={result.metadata} />
          </div>
        </PaginationPageSlice>
      );
    default:
      throw new Error("Should not happen") as never;
  }
};

const ModelsViewInner = async ({ searchParams, category }: ModelsViewProps) => {
  const listingPathname = (
    category ? `/3d-models/categories/${category}` : "/3d-models"
  ) satisfies Route;

  const [{ isAuthenticated, query, result }, returnTo] = await Promise.all([
    getModels(searchParams, category),
    canonicalPathForListing(listingPathname, searchParams),
  ]);

  return (
    <ModelsViewResult
      isAuthenticated={isAuthenticated}
      query={query}
      result={result}
      returnTo={returnTo}
    />
  );
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

export { ModelsView, ModelsViewResult };
