import { skeletonEnter } from "@/app/styles";
import { css, cx } from "../../../../../styled-system/css";
import { flex } from "../../../../../styled-system/patterns";

const HeartButtonSkeleton = () => (
  <div className={cx(skeletonEnter, flex({ align: "center" }))}>
    <div
      className={css({
        blockSize: 6,
        inlineSize: 12,
        marginInlineEnd: 1,
        animation: "pulse",
        rounded: "sm",
        backgroundColor: "gray.200",
      })}
    />
  </div>
);

export { HeartButtonSkeleton };
