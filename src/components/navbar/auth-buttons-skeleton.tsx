import { css } from "@styled-system/css";
import { circle, hstack } from "@styled-system/patterns";
import { token } from "@styled-system/tokens";
import { Skeleton } from "@/components/skeleton";

const AuthButtonsSkeleton = () => (
  <div aria-hidden="true" className={hstack({ gap: 2 })}>
    <Skeleton
      className={circle({
        size: 8,
      })}
      color={token("colors.bg.muted")}
    />
    <Skeleton
      className={css({
        blockSize: 8,
        inlineSize: "52px",
        rounded: "sm",
      })}
      color={token("colors.bg.muted")}
    />
  </div>
);

export { AuthButtonsSkeleton };
