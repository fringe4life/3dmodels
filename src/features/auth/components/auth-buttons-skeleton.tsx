import { css } from "@styled-system/css";
import { hstack } from "@styled-system/patterns";
import { Skeleton } from "@/components/skeleton";

const AuthButtonsSkeleton = () => (
  <div aria-hidden="true" className={hstack({ gap: 2 })}>
    <Skeleton
      className={css({
        backgroundColor: "bg.muted",
        blockSize: 8,
        inlineSize: 10,
        rounded: "sm",
      })}
    />
    <Skeleton
      className={css({
        backgroundColor: "bg.muted",
        blockSize: 8,
        inlineSize: 10,
        rounded: "sm",
      })}
    />
  </div>
);

export { AuthButtonsSkeleton };
