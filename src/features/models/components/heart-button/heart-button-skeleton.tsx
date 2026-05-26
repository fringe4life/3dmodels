import { hstack } from "@styled-system/patterns";
import { Skeleton } from "@/components/skeleton";

const HeartButtonSkeleton = () => (
  <Skeleton
    className={hstack({
      blockSize: 6,
      inlineSize: 12,
      marginInlineEnd: 1,
      rounded: "sm",
      backgroundColor: "bg.muted",
    })}
  />
);

export { HeartButtonSkeleton };
