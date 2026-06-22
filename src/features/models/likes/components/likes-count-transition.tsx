import { ViewTransition } from "react";

interface LikesCountTransitionProps {
  children: React.ReactNode;
  count: number;
}

const LikesCountTransition = ({
  count,
  children,
}: LikesCountTransitionProps) => (
  <ViewTransition
    key={`likes-count-${count}`}
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
