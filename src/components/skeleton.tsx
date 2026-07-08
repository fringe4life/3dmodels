import { css, cx } from "@styled-system/css";
import { skeletonEnter } from "@/app/styles";
import type { Children, Prettify } from "@/types";

type SkeletonProps = Prettify<
  Partial<Children> & {
    className?: string;
  }
>;

const Skeleton = ({ className, children }: SkeletonProps) => (
  <div
    aria-hidden="true"
    className={cx(css({ animation: "pulse" }), className, skeletonEnter)}
  >
    {children}
  </div>
);

export { Skeleton };
