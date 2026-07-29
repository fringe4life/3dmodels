import { css } from "@styled-system/css";
import { grid, gridItem } from "@styled-system/patterns";
import { SearchInputSkeleton } from "@/components/search-input/search-input-skeleton";
import { ModelsGridTitleSkeleton } from "@/features/models/components/models-grid-title-skeleton";
import { ModelsSortControlsSkeleton } from "@/features/models/components/models-sort-controls-skeleton";

const ModelsGridHeaderSkeleton = () => (
  <div aria-hidden="true" className={css({ paddingBlockStart: 8 })}>
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
        <SearchInputSkeleton />
      </div>
      <div
        className={css({
          alignItems: { base: "flex-start", lg: "center" },
          display: "flex",
          flexDirection: { base: "column", lg: "row" },
          gap: 4,
          justifyContent: "space-between",
          marginBlockEnd: 8,
        })}
      >
        <ModelsGridTitleSkeleton />
        <ModelsSortControlsSkeleton />
      </div>
    </div>
  </div>
);

export { ModelsGridHeaderSkeleton };
