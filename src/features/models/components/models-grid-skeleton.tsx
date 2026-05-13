import { Skeleton } from "@/components/skeleton";
import { css, cx } from "../../../../styled-system/css";
import { modelsGrid, skeletonEnter } from "../../../app/styles";
import { ModelCardSkeleton } from "./model-card-skeleton";

// "skeleton-enter container mx-auto py-8"
const ModelsGridSkeleton = () => (
  <div
    className={cx(
      skeletonEnter,
      css({ marginInline: "auto", paddingBlock: 8 }),
    )}
  >
    <Skeleton>
      <div
        className={css({
          marginBlockEnd: 8,
          inlineSize: "2/3",
          maxInlineSize: 40,
          rounded: "sm",
          backgroundColor: "bg.muted",
        })}
      />
    </Skeleton>
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
