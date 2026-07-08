import { css } from "@styled-system/css";
import { between, hstack } from "@styled-system/patterns";
import { Skeleton } from "@/components/skeleton";

const PaginationSkeleton = () => (
  <div aria-hidden="true" className={between()}>
    <Skeleton
      className={css({
        backgroundColor: "bg.muted",
        blockSize: 6,
        inlineSize: 24,
        rounded: "sm",
      })}
    />
    <div className={hstack({ columnGap: 2 })}>
      <Skeleton
        className={css({
          backgroundColor: "bg.muted",
          blockSize: 8,
          inlineSize: 10,
          rounded: "sm",
        })}
      />
      <Skeleton
        className={css({
          backgroundColor: "bg.muted",
          blockSize: 8,
          inlineSize: 6,
          rounded: "sm",
        })}
      />
      <Skeleton
        className={css({
          backgroundColor: "bg.muted",
          blockSize: 8,
          inlineSize: 6,
          rounded: "sm",
        })}
      />
    </div>
  </div>
);

export { PaginationSkeleton };
