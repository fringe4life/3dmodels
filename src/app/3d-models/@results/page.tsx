import { css } from "@styled-system/css";
import { grid, gridItem } from "@styled-system/patterns";
import { NuqsAdapterBoundary } from "@/components/nuqs/nuqs-adapter-boundary";
import { SearchInput } from "@/components/search-input/search-input";
import { SearchInputSkeleton } from "@/components/search-input/search-input-skeleton";
import { Suspend } from "@/components/suspend";
import { ModelsGridSkeleton } from "@/features/models/components/models-grid-skeleton";
import { ModelsView } from "@/features/models/components/models-view";
import { PaginationSkeleton } from "@/features/pagination/components/pagination-skeleton";

const ListingResultsFallback = () => (
  <>
    <div
      className={css({
        blockSize: 10,
        inlineSize: "full",
        maxInlineSize: { md: "xl" },
        position: "relative",
        paddingInline: 4,
      })}
    >
      <SearchInputSkeleton />
    </div>
    <ModelsGridSkeleton />
    <PaginationSkeleton />
  </>
);

const ResultsPage = ({ searchParams }: PageProps<"/3d-models">) => (
  <NuqsAdapterBoundary fallback={<ListingResultsFallback />}>
    <div
      className={grid({
        gridAutoRows: "min",
        rowGap: 4,
      })}
    >
      <div
        className={gridItem({
          blockSize: 10,
          inlineSize: "full",
          maxInlineSize: { md: "xl" },
          position: "relative",
          paddingInline: 4,
        })}
      >
        <Suspend fallback={<SearchInputSkeleton />}>
          <SearchInput />
        </Suspend>
      </div>
      <ModelsView searchParams={searchParams} />
    </div>
  </NuqsAdapterBoundary>
);

export default ResultsPage;
