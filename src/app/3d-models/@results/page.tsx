import { grid, gridItem } from "@styled-system/patterns";
import { NuqsAdapterBoundary } from "@/components/nuqs/nuqs-adapter-boundary";
import { SearchInput } from "@/components/search-input/search-input";
import { SearchInputSkeleton } from "@/components/search-input/search-input-skeleton";
import { Suspend } from "@/components/suspend";
import { ModelsView } from "@/features/models/components/models-view";

const ResultsPage = ({ searchParams }: PageProps<"/3d-models">) => (
  <NuqsAdapterBoundary>
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
          paddingInline: 4,
          position: "relative",
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
