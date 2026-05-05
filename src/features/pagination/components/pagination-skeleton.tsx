import { skeletonEnter } from "@/app/styles";
import { css, cx } from "../../../../styled-system/css";
import { flex } from "../../../../styled-system/patterns";

const PaginationSkeleton = () => (
  <div
    className={cx(
      skeletonEnter,
      flex({ align: "center", justify: "space-between" }),
    )}
  >
    <div
      className={css({
        blockSize: 6,
        inlineSize: 24,
        animation: "pulse",
        rounded: "sm",
        backgroundColor: "gray.200",
      })}
    />
    <div className={flex({ align: "center", columnGap: 2 })}>
      <div
        className={css({
          blockSize: 8,
          inlineSize: 10,
          animation: "pulse",
          rounded: "sm",
          backgroundColor: "gray.200",
        })}
      />
      <div
        className={css({
          blockSize: 8,
          inlineSize: 6,
          animation: "pulse",
          rounded: "sm",
          backgroundColor: "gray.200",
        })}
      />
      <div
        className={css({
          blockSize: 8,
          inlineSize: 6,
          animation: "pulse",
          rounded: "sm",
          backgroundColor: "gray.200",
        })}
      />
    </div>
  </div>
);

export { PaginationSkeleton };
