import { Skeleton } from "@/components/skeleton";
import { css } from "../../../../styled-system/css";
import { hstack } from "../../../../styled-system/patterns";

const AuthButtonsSkeleton = () => (
  <div className={hstack({ gap: 2 })}>
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
