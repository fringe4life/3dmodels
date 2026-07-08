import { css } from "@styled-system/css";
import { grid } from "@styled-system/patterns";

export const skeletonEnter = css({
  _starting: {
    blur: "sm",
    filter: "auto",
  },
  transitionBehavior: "allow-discrete",
  transitionDuration: "normal",
  transitionProperty: "filter",
});

export const modelsGrid = grid({
  gap: 6,
  gridTemplateColumns: "repeat(auto-fill,minmax(min(100%,250px),1fr))",
});
