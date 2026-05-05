import { css } from "../../styled-system/css";
import { grid } from "../../styled-system/patterns";

export const skeletonEnter = css({
  transitionProperty: "filter",
  transitionDuration: "normal",
  transitionBehavior: "discrete",
  filter: "auto",
  _starting: {
    blur: "2xs",
  },
});

export const modelsGrid = grid({
  gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,250px),1fr))",
  gap: 6,
});
