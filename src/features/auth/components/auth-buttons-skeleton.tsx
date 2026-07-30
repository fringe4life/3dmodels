import { css } from "@styled-system/css";
import { circle, hstack } from "@styled-system/patterns";
import { Skeleton } from "@/components/skeleton";

const AuthButtonsSkeleton = () => (
  <div aria-hidden="true" className={hstack({ gap: 2 })}>
    <Skeleton
      className={circle({
        backgroundColor: "bg.muted",
        size: 8,
      })}
    />
    <Skeleton
      className={css({
        backgroundColor: "bg.muted",
        blockSize: 8,
        inlineSize: "52px",
        rounded: "sm",
      })}
    />
  </div>
);

export { AuthButtonsSkeleton };
