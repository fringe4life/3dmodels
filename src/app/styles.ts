import { css, cx } from "@styled-system/css";
import { cq, grid } from "@styled-system/patterns";

export const skeletonEnter = css({
  _starting: {
    blur: "sm",
    filter: "auto",
  },
  transitionBehavior: "allow-discrete",
  transitionDuration: "normal",
  transitionProperty: "filter",
});

export const modelsGrid = cx(
  cq({ name: "models-grid" }),
  grid({
    columnGap: 6,
    gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,20rem),1fr))",
    rowGap: 0,
  }),
);
