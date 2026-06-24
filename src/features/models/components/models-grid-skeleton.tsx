import { css } from "@styled-system/css";
import { Skeleton } from "@/components/skeleton";
import { modelsGrid } from "../../../app/styles";
import { ModelCardSkeleton } from "./model-card-skeleton";

const ModelsGridSkeleton = () => (
  <div
    aria-hidden="true"
    className={css({ marginInline: "auto", paddingBlock: 8 })}
  >
    <Skeleton
      className={css({
        marginBlockEnd: 8,
        inlineSize: "2/3",
        maxInlineSize: 40,
        rounded: "sm",
        backgroundColor: "bg.muted",
        blockSize: 11,
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
