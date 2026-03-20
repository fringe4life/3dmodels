import { Suspense } from "react";
import { ModelsGridSkeleton } from "@/features/models/components/models-grid-skeleton";
import { DEFAULT_TITLE } from "@/features/models/constants";
import { getModels } from "@/features/models/dal/get-models";
import type { ModelsViewProps } from "@/features/models/types";
import { Pagination } from "@/features/pagination/components/pagination";
import { PaginationOffsetTransition } from "@/features/pagination/components/pagination-offset-transition";
import { PaginationSkeleton } from "@/features/pagination/components/pagination-skeleton";
import { ModelsGrid } from "./models-grid";
import { ModelsNotFound } from "./models-not-found";

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
          <p className="pe-1 text-right text-gray-500 text-italic text-sm">
            No models found
          </p>
        </>
      );
    case "success":
      return (
        <PaginationOffsetTransition metadata={result.metadata}>
          <div className="grid auto-rows-min grid-rows-1 content-between gap-y-4">
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
