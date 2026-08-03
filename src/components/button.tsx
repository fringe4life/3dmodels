import { cx } from "@styled-system/css";
import type { Ref } from "react";
import { type ButtonVariantProps, buttonRecipe } from "./button-recipe";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps & {
    ref?: Ref<HTMLButtonElement>;
  };

const Button = ({
  density,
  variant,
  size,
  className,
  children,
  ref,
  type = "button",
  ...props
}: ButtonProps) => (
  <button
    className={cx(buttonRecipe({ density, size, variant }), className)}
    ref={ref}
    type={type}
    {...props}
  >
    {children}
  </button>
);

export { Button };
