import { css, cx } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import { FaHeart } from "react-icons/fa6";
import type { HeartVisualState } from "../types";

interface HeartIconProps {
  visualState: HeartVisualState;
}

const heartColorByState = {
  liked: css({ color: { _hover: "like.hover", base: "like" } }),
  pending: css({ color: "like.pending", cursor: "progress" }),
  unliked: css({
    color: {
      _groupDisabled: "text.placeholder",
      _groupHover: "like.hover",
      base: "text.placeholder",
    },
  }),
} as const satisfies Record<HeartVisualState, string>;

const HeartIcon = ({ visualState }: HeartIconProps) => (
  <FaHeart
    aria-hidden="true"
    className={cx(
      square({ size: 6 }),
      css({
        transitionDuration: "normal",
        transitionProperty: "color",
        transitionTimingFunction: {
          _supportsLinear: "ease-smooth-in-out",
          base: "ease-in-out",
        },
      }),
      heartColorByState[visualState],
    )}
  />
);

export { HeartIcon };
