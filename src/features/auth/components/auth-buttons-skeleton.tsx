import { css } from "@styled-system/css";
import { hstack } from "@styled-system/patterns";
import { Skeleton } from "@/components/skeleton";

const AuthButtonsSkeleton = () => (
  <div aria-hidden="true" className={hstack({ gap: 2 })}>
    <Skeleton
      className={css({
        blockSize: 8,
        inlineSize: 10,
        rounded: "sm",
        backgroundColor: "bg.muted",
      })}
    />
    <Skeleton
      className={css({
        blockSize: 8,
        inlineSize: 10,
        rounded: "sm",
        backgroundColor: "bg.muted",
      })}
    />
  </div>
);

export { AuthButtonsSkeleton };
