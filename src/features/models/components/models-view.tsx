import { css } from "@styled-system/css";
import { grid } from "@styled-system/patterns";
import { Suspense } from "react";
import { ModelsGridSkeleton } from "@/features/models/components/models-grid-skeleton";
import { DEFAULT_TITLE } from "@/features/models/constants";
import { getModels } from "@/features/models/dal/get-models";
import { Pagination } from "@/features/pagination/components/pagination";
import { PaginationOffsetTransition } from "@/features/pagination/components/pagination-offset-transition";
import { PaginationSkeleton } from "@/features/pagination/components/pagination-skeleton";
import type { SearchParamsProps } from "@/types";
import { ModelsGrid } from "./models-grid";
import { ModelsNotFound } from "./models-not-found";

interface ModelsViewProps extends SearchParamsProps {
  category?: string;
  categoryDisplayName?: string;
}

const ModelsViewInner = async ({
  searchParams,
  category,
  categoryDisplayName,
}: ModelsViewProps) => {
  const { isAuthenticated, result } = await getModels(searchParams, category);
  // DO AUTH CHECKS HERE AND MAKE SLUG LIST HERE
  // WE COULD EVEN PASS THE LIST FROM THIS SERVER COMPONENT TO
  const displayTitle = categoryDisplayName ?? DEFAULT_TITLE;

  switch (result.type) {
    case "error":
      throw new Error(result.message);
    case "empty":
      return (
        <>
          <ModelsNotFound />
          <p
            className={css({
              paddingInlineEnd: "1",
              textAlign: "right",
              color: "text.muted",
              fontStyle: "italic",
              fontSize: "sm",
            })}
          >
            No models found
          </p>
        </>
      );
    case "success":
      return (
        <PaginationOffsetTransition metadata={result.metadata}>
          <div
            className={grid({
              gridAutoRows: "min",
              alignContent: "space-between",
              rowGap: 4,
            })}
          >
            <ModelsGrid
              isAuthenticated={isAuthenticated}
              models={result.items}
              title={displayTitle}
            />
            <Pagination metadata={result.metadata} />
          </div>
        </PaginationOffsetTransition>
      );
    default:
      throw new Error("Should not happen") as never;
  }
};

const ModelsView = (props: ModelsViewProps) => (
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
);

export { ModelsView };
