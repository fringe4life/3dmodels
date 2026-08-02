import { css } from "@styled-system/css";
import { token } from "@styled-system/tokens";
import { Skeleton } from "@/components/skeleton";

const ModelsSortControlsSkeleton = () => (
  <div
    aria-hidden="true"
    className={css({
      display: "flex",
      flexWrap: "wrap",
      gap: 2,
    })}
  >
    <Skeleton
      className={css({
        blockSize: 7,
        inlineSize: 12,
        rounded: "full",
      })}
      color={token("colors.bg.muted")}
    />
    <Skeleton
      className={css({
        blockSize: 7,
        inlineSize: 20,
        rounded: "full",
      })}
      color={token("colors.bg.muted")}
    />
    <Skeleton
      className={css({
        blockSize: 7,
        inlineSize: 16,
        rounded: "full",
      })}
      color={token("colors.bg.muted")}
    />
  </div>
);

export { ModelsSortControlsSkeleton };
