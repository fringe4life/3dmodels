import { css } from "@styled-system/css";
import { Skeleton } from "@/components/skeleton";
import { modelsGrid } from "../../../app/styles";
import { ModelCardSkeleton } from "./model-card-skeleton";

const ModelsGridSkeleton = () => (
  <div aria-hidden="true" className={css({ paddingBlock: 8 })}>
    <Skeleton
      className={css({
        backgroundColor: "bg.muted",
        blockSize: 11,
        inlineSize: "2/3",
        marginBlockEnd: 8,
        maxInlineSize: 40,
        rounded: "sm",
      })}
    />
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
