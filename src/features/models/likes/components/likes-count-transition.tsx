import { ViewTransition } from "react";
import type { Children } from "@/types";
import type { LikesCount } from "../types";

interface LikesCountTransitionProps extends Children, LikesCount {}

const LikesCountTransition = ({
  likesCount,
  children,
}: LikesCountTransitionProps) => (
  <ViewTransition
    key={`likes-count-${likesCount}`}
    update={{
      increase: "likes-update-increase",
      decrease: "likes-update-decrease",
      default: "auto",
    }}
  >
    {children}
  </ViewTransition>
);

export { LikesCountTransition };
