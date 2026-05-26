import { css } from "@styled-system/css";
import { grid } from "@styled-system/patterns";

export const skeletonEnter = css({
  transitionProperty: "filter",
  transitionDuration: "normal",
  transitionBehavior: "allow-discrete",
  _starting: {
    filter: "auto",
    blur: "sm",
  },
});

export const modelsGrid = grid({
  gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,250px),1fr))",
  gap: 6,
});
