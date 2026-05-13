import { skeletonEnter } from "@/app/styles";
import { Skeleton } from "@/components/skeleton";
import { css, cx } from "../../../../../styled-system/css";
import { hstack } from "../../../../../styled-system/patterns";

const HeartButtonSkeleton = () => (
  <div className={cx(skeletonEnter, hstack())}>
    <Skeleton
      className={css({
        blockSize: 6,
        inlineSize: 12,
        marginInlineEnd: 1,
        rounded: "sm",
        backgroundColor: "bg.muted",
      })}
    />
  </div>
);

export { HeartButtonSkeleton };
