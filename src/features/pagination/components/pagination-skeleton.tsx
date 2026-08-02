import { css } from "@styled-system/css";
import { between, hstack } from "@styled-system/patterns";
import { token } from "@styled-system/tokens";
import { Skeleton } from "@/components/skeleton";

const PaginationSkeleton = () => (
  <div aria-hidden="true" className={between()}>
    <Skeleton
      className={css({
        blockSize: 6,
        inlineSize: 24,
        rounded: "sm",
      })}
      color={token("colors.bg.muted")}
    />
    <div className={hstack({ columnGap: 2 })}>
      <Skeleton
        className={css({
          blockSize: 8,
          inlineSize: 10,
          rounded: "sm",
        })}
        color={token("colors.bg.muted")}
      />
      <Skeleton
        className={css({
          blockSize: 8,
          inlineSize: 6,
          rounded: "sm",
        })}
        color={token("colors.bg.muted")}
      />
      <Skeleton
        className={css({
          blockSize: 8,
          inlineSize: 6,
          rounded: "sm",
        })}
        color={token("colors.bg.muted")}
      />
    </div>
  </div>
);

export { PaginationSkeleton };
