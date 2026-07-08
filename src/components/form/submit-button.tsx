import { css, cx } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import { FaSpinner } from "react-icons/fa";
import { skeletonEnter } from "@/app/styles";
import { Button } from "@/components/button";
import type { ButtonVariantProps } from "@/components/button-recipe";

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isPending: boolean;
  variant?: ButtonVariantProps["variant"];
};

const SubmitButton = ({
  onClick,
  children,
  isPending,
  className,
  variant,
}: SubmitButtonProps) => (
  <Button
    className={cx("group", css({ inlineSize: "full" }), className)}
    disabled={isPending}
    onClick={onClick}
    type="submit"
    variant={variant ?? "primary"}
  >
    <FaSpinner
      className={cx(
        skeletonEnter,
        square({
          animation: "spin",
          display: { _groupDisabled: "block", base: "none" },
          size: 5,
        }),
      )}
    />
    {children}
  </Button>
);

export { SubmitButton };
