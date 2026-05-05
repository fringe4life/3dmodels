import { FaSpinner } from "react-icons/fa";
import { skeletonEnter } from "@/app/styles";
import { Button, type ButtonVariantProps } from "@/components/button";
import { css, cx } from "../../../styled-system/css";
import { square } from "../../../styled-system/patterns";

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isPending: boolean;
  variant?: ButtonVariantProps["variant"];
}

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
          size: 5,
          display: { base: "none", _groupDisabled: "block" },
        }),
      )}
    />
    {children}
  </Button>
);

export { SubmitButton };
