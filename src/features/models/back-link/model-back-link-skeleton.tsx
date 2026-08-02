import { hstack } from "@styled-system/patterns";
import { token } from "@styled-system/tokens";
import { Skeleton } from "@/components/skeleton";

const ModelBackLinkSkeleton = () => (
  <Skeleton
    className={hstack({
      blockSize: 8,
      inlineSize: 20,
      rounded: "md",
    })}
    color={token("colors.bg.muted")}
  />
);

export { ModelBackLinkSkeleton };
