import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";
import { Skeleton } from "@/components/skeleton";

const ModelsGridTitleSkeleton = () => (
  <Skeleton
    className={css({
      blockSize: 11,
      inlineSize: "2/3",
      maxInlineSize: 40,
      rounded: "sm",
    })}
    color={token("colors.bg.muted")}
  />
);

export { ModelsGridTitleSkeleton };
