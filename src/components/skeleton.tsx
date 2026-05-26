import { css, cx } from "@styled-system/css";
import { skeletonEnter } from "@/app/styles";

interface SkeletonProps {
  children?: React.ReactNode;
  className?: string;
}

const Skeleton = ({ className, children }: SkeletonProps) => (
  <div
    aria-hidden="true"
    className={cx(css({ animation: "pulse" }), className, skeletonEnter)}
  >
    {children}
  </div>
);

export { Skeleton };
