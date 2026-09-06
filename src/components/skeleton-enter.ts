import { css } from "@styled-system/css";

export const skeletonEnter = css({
  _starting: {
    blur: "sm",
    filter: "auto",
  },
  transitionBehavior: "allow-discrete",
  transitionDuration: "normal",
  transitionProperty: "filter",
});
