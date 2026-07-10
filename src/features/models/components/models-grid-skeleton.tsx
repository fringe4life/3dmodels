import { css } from "@styled-system/css";
import { Skeleton } from "@/components/skeleton";
import { ModelsSortControlsSkeleton } from "@/features/models/components/models-sort-controls-skeleton";
import { modelsGrid } from "../../../app/styles";
import { ModelCardSkeleton } from "./model-card-skeleton";

const ModelsGridSkeleton = () => (
  <div aria-hidden="true" className={css({ paddingBlock: 8 })}>
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
      <Skeleton
        className={css({
          backgroundColor: "bg.muted",
          blockSize: 11,
          inlineSize: "2/3",
          maxInlineSize: 40,
          rounded: "sm",
        })}
      />
      <ModelsSortControlsSkeleton />
    </div>
    <div className={modelsGrid}>
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
      <ModelCardSkeleton />
    </div>
  </div>
);

export { ModelsGridSkeleton };
