import { viewTransition } from "@styled-system/css";
import { ViewTransition } from "react";
import type { Children, Prettify } from "@/types";
import type { Likes } from "../types";

type LikesCountTransitionProps = Prettify<Children & Likes>;

const likesUpdateIncrease = viewTransition({
  group: { animationDuration: "normal" },
  new: {
    "--slide-distance-y": "-10px",
    animationName: "fade-out, slide-out-y",
    animationTimingFunction: "inDramatic",
  },
  old: {
    "--slide-distance-y": "8px",
    animationName: "slide-out-y, fade-out",
    animationTimingFunction: "outDramatic",
  },
});

const likesUpdateDecrease = viewTransition({
  group: { animationDuration: "normal" },
  new: {
    "--slide-distance-y": "10px",
    animationName: "fade-in, slide-in-y",
    animationTimingFunction: "inDramatic",
  },
  old: {
    "--slide-distance-y": "-8px",
    animationName: "slide-out-y, fade-out",
    animationTimingFunction: "outDramatic",
  },
});

const LikesCountTransition = ({
  likes,
  children,
}: LikesCountTransitionProps) => (
  <ViewTransition
    key={`likes-${likes}`}
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
