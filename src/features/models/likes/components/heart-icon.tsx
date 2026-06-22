import { css, cx } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import { FaHeart } from "react-icons/fa6";
import type { HeartVisualState } from "../types";

interface HeartIconProps extends HeartVisualState {}

const HeartIcon = ({ isLiked, isNotLiked, isPending }: HeartIconProps) => (
  <FaHeart
    aria-hidden="true"
    className={cx(
      square({ size: 6 }),
      css({
        transitionProperty: "color",
        transitionDuration: "normal",
        transitionTimingFunction: {
          base: "ease-in-out",
          _supportsLinear: "ease-smooth-in-out",
        },
      }),
      isLiked && css({ color: { base: "like", _hover: "like.hover" } }),
      isPending && css({ cursor: "progress", color: "like.pending" }),
      isNotLiked &&
        css({
          color: {
            base: "text.placeholder",
            _groupHover: "like.hover",
            _groupDisabled: "text.placeholder",
          },
        }),
    )}
  />
);

export { HeartIcon };
