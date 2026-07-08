import { css, cx } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import { FaHeart } from "react-icons/fa6";
import type { HeartVisualState } from "../types";

type HeartIconProps = HeartVisualState;

const HeartIcon = ({ isLiked, isNotLiked, isPending }: HeartIconProps) => (
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
      isLiked && css({ color: { _hover: "like.hover", base: "like" } }),
      isPending && css({ color: "like.pending", cursor: "progress" }),
      isNotLiked &&
        css({
          color: {
            _groupDisabled: "text.placeholder",
            _groupHover: "like.hover",
            base: "text.placeholder",
          },
        }),
    )}
  />
);

export { HeartIcon };
