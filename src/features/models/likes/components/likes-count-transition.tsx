import { viewTransition } from "@styled-system/css";
import { ViewTransition } from "react";
import type { Children, Prettify } from "@/types";
import type { LikesCount } from "../types";

type LikesCountTransitionProps = Prettify<Children & LikesCount>;

const likesUpdateIncrease = viewTransition({
  new: {
    "--slide-distance-y": "-10px",
    animationDuration: "200ms",
    animationName: "fade-out, slide-out-y",
    animationTimingFunction: "inDramatic",
  },
  old: {
    "--slide-distance-y": "8px",
    animationDuration: "200ms",
    animationName: "slide-out-y, fade-out",
    animationTimingFunction: "outDramatic",
  },
});

const likesUpdateDecrease = viewTransition({
  new: {
    "--slide-distance-y": "10px",
    animationDuration: "200ms",
    animationName: "fade-in, slide-in-y",
    animationTimingFunction: "inDramatic",
  },
  old: {
    "--slide-distance-y": "-8px",
    animationDuration: "200ms",
    animationName: "slide-out-y, fade-out",
    animationTimingFunction: "outDramatic",
  },
});

const LikesCountTransition = ({
  likesCount,
  children,
}: LikesCountTransitionProps) => (
  <ViewTransition
    key={`likes-count-${likesCount}`}
    update={{
      decrease: likesUpdateDecrease,
      default: "auto",
      increase: likesUpdateIncrease,
    }}
  >
    {children}
  </ViewTransition>
);

export { LikesCountTransition };
