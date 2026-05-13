import { skeletonEnter } from "@/app/styles";
import { Skeleton } from "@/components/skeleton";
import { css, cx } from "../../../../styled-system/css";
import { between, hstack } from "../../../../styled-system/patterns";

const PaginationSkeleton = () => (
  <div className={cx(skeletonEnter, between())}>
    <Skeleton
      className={css({
        blockSize: 6,
        inlineSize: 24,
        rounded: "sm",
        backgroundColor: "bg.muted",
      })}
    />
    <div className={hstack({ columnGap: 2 })}>
      <Skeleton
        className={css({
          blockSize: 8,
          inlineSize: 10,
          rounded: "sm",
          backgroundColor: "bg.muted",
        })}
      />
      <Skeleton
        className={css({
          blockSize: 8,
          inlineSize: 6,
          rounded: "sm",
          backgroundColor: "bg.muted",
        })}
      />
      <Skeleton
        className={css({
          blockSize: 8,
          inlineSize: 6,
          rounded: "sm",
          backgroundColor: "bg.muted",
        })}
      />
    </div>
  </div>
);

export { PaginationSkeleton };
