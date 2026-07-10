import { css } from "@styled-system/css";
import { Skeleton } from "@/components/skeleton";

const ModelsSortControlsSkeleton = () => (
  <div
    aria-hidden="true"
    className={css({
      display: "flex",
      flexWrap: "wrap",
      gap: 2,
    })}
  >
    <Skeleton
      className={css({
        backgroundColor: "bg.muted",
        blockSize: 7,
        inlineSize: 12,
        rounded: "full",
      })}
    />
    <Skeleton
      className={css({
        backgroundColor: "bg.muted",
        blockSize: 7,
        inlineSize: 20,
        rounded: "full",
      })}
    />
    <Skeleton
      className={css({
        backgroundColor: "bg.muted",
        blockSize: 7,
        inlineSize: 16,
        rounded: "full",
      })}
    />
  </div>
);

export { ModelsSortControlsSkeleton };
