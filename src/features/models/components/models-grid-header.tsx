import { css } from "@styled-system/css";
import { grid, gridItem } from "@styled-system/patterns";
import { SearchInput } from "@/components/search-input/search-input";
import { ModelsGridTitle } from "./models-grid-title";
import { ModelsSortControls } from "./models-sort-controls";

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
      <SearchInput />
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
      <ModelsGridTitle fallbackTitle={fallbackTitle} />
      <ModelsSortControls />
    </div>
  </div>
);

export { ModelsGridHeader };
