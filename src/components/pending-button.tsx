import { css, cx } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import { ViewTransition } from "react";
import { FaSpinner } from "react-icons/fa";
import { Button } from "@/components/button";
import type { ButtonVariantProps } from "@/components/button-recipe";
import { skeletonEnter } from "@/components/skeleton-enter";

type PendingButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isPending: boolean;
  transitionName?: string;
  variant?: ButtonVariantProps["variant"];
};

const PendingButton = ({
  onClick,
  children,
  isPending,
  className,
  variant,
  type = "submit",
  transitionName,
  ...props
}: PendingButtonProps) => (
  <ViewTransition name={transitionName}>
    <Button
      className={cx("group", css({ inlineSize: "full" }), className)}
      onClick={onClick}
      type={type}
      variant={variant ?? "primary"}
      {...props}
      aria-busy={isPending}
      disabled={isPending}
    >
      <FaSpinner
        aria-hidden="true"
        className={cx(
          skeletonEnter,
          square({
            animationDuration: "slow",
            animationIterationCount: "infinite",
            animationName: "spin",
            display: { _groupDisabled: "block", base: "none" },
            size: 5,
          }),
        )}
      />
      <span className={css({ srOnly: isPending })}>{children}</span>
    </Button>
  </ViewTransition>
);

export { PendingButton };
