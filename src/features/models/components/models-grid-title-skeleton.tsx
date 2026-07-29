import { css } from "@styled-system/css";
import { Skeleton } from "@/components/skeleton";

const ModelsGridTitleSkeleton = () => (
  <Skeleton
    className={css({
      backgroundColor: "bg.muted",
      blockSize: 11,
      inlineSize: "2/3",
      maxInlineSize: 40,
      rounded: "sm",
    })}
  />
);

export { ModelsGridTitleSkeleton };
