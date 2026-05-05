import { css } from "../../../../styled-system/css";
import { flex } from "../../../../styled-system/patterns";

const AuthButtonsSkeleton = () => (
  <div className={flex({ align: "center", gap: 2 })}>
    <div
      className={css({
        blockSize: 8,
        inlineSize: 10,
        rounded: "sm",
        backgroundColor: "gray.200",
        animation: "pulse",
      })}
    />
    <div
      className={css({
        blockSize: 8,
        inlineSize: 10,
        rounded: "sm",
        backgroundColor: "gray.200",
        animation: "pulse",
      })}
    />
  </div>
);

export { AuthButtonsSkeleton };
