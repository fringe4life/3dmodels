import { css } from "@styled-system/css";
import { grid, gridItem } from "@styled-system/patterns";
import { SearchInput } from "@/components/search-input/search-input";
import { SearchInputSkeleton } from "@/components/search-input/search-input-skeleton";
import { Suspend } from "@/components/suspend";
import { ModelsGridTitle } from "./models-grid-title";
import { ModelsGridTitleSkeleton } from "./models-grid-title-skeleton";
import { ModelsSortControls } from "./models-sort-controls";
import { ModelsSortControlsSkeleton } from "./models-sort-controls-skeleton";

interface ModelsGridHeaderProps {
  fallbackTitle: string;
}

const ModelsGridHeader = ({ fallbackTitle }: ModelsGridHeaderProps) => (
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
      <Suspend fallback={<SearchInputSkeleton />} name="models-search-input">
        <SearchInput />
      </Suspend>
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
      <Suspend fallback={<ModelsGridTitleSkeleton />} name="models-grid-title">
        <ModelsGridTitle fallbackTitle={fallbackTitle} />
      </Suspend>
      <Suspend
        fallback={<ModelsSortControlsSkeleton />}
        name="models-sort-controls"
      >
        <ModelsSortControls />
      </Suspend>
    </div>
  </div>
);

export { ModelsGridHeader };
