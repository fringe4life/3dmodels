import { ViewTransition } from "react";
import type { Children, Prettify } from "@/types";
import type { LikesCount } from "../types";

type LikesCountTransitionProps = Prettify<Children & LikesCount>;

const LikesCountTransition = ({
  likesCount,
  children,
}: LikesCountTransitionProps) => (
  <ViewTransition
    key={`likes-count-${likesCount}`}
    update={{
      decrease: "likes-update-decrease",
      default: "auto",
      increase: "likes-update-increase",
    }}
  >
    {children}
  </ViewTransition>
);

export { LikesCountTransition };
