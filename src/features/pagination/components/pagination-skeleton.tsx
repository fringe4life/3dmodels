import { css } from "@styled-system/css";
import { between, hstack } from "@styled-system/patterns";
import { Skeleton } from "@/components/skeleton";

const PaginationSkeleton = () => (
  <div aria-hidden="true" className={between()}>
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
