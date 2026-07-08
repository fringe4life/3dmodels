import { hstack } from "@styled-system/patterns";
import { Skeleton } from "@/components/skeleton";

const HeartButtonSkeleton = () => (
  <Skeleton
    className={hstack({
      backgroundColor: "bg.muted",
      blockSize: 6,
      inlineSize: 12,
      marginInlineEnd: 1,
      rounded: "sm",
    })}
  />
);

export { HeartButtonSkeleton };
