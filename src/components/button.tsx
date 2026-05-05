import type { Ref } from "react";
import { cva, cx, type RecipeVariantProps } from "../../styled-system/css";

/**
 * PandaCSS CVA recipe for button variants.
 *
 * Variants:
 *   - `primary`  — orangeAccent fill, white text (reset, submit forms)
 *   - `outline`  — white bg, gray border + ring (sign-in)
 *   - `ghost`    — no bg, scale interactions (pagination, icon actions)
 *
 * Sizes: `sm` | `md` (default) | `lg` | `icon`
 */
const buttonRecipe = cva({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    fontWeight: "medium",
    cursor: "pointer",
    transitionProperty: "colors,scale,opacity",
    transitionDuration: "normal",
    transitionTimingFunction: "ease-in-out",
    _disabled: { cursor: "not-allowed", opacity: "0.5" },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: "orangeAccent",
        color: "white",
        shadow: "sm",
        _hover: { backgroundColor: "orangeAccent/90" },
        _focus: {
          outline: "none",
          ring: "2",
          ringColor: "orangeAccent",
          ringOffset: "2",
        },
      },
      outline: {
        backgroundColor: "white",
        color: "gray.900",
        borderWidth: "1",
        borderColor: "gray.500",
        ring: "1",
        ringColor: "gray.300",
        ringOffset: "inset",
        shadow: "sm",
        _hover: { backgroundColor: "gray.50" },
        _focus: { outline: "none", ringOffset: "0" },
        _disabled: { _hover: { backgroundColor: "white" } },
      },
      ghost: {
        color: "gray.500",
        _hover: { color: "gray.700", scale: "1.05" },
        _active: { scale: "0.95" },
        _disabled: {
          _hover: { color: "gray.500", scale: "1" },
          _active: { scale: "1" },
        },
      },
    },
    size: {
      sm: {
        paddingInline: "2",
        paddingBlock: "1",
        fontSize: "xs",
        rounded: "md",
      },
      md: {
        paddingInline: "4",
        paddingBlock: "2",
        fontSize: "sm",
        rounded: "md",
      },
      lg: {
        paddingInline: "6",
        paddingBlock: "3",
        fontSize: "base",
        rounded: "md",
      },
      icon: {
        inlineSize: "8",
        blockSize: "8",
        rounded: "md",
      },
      /** Content-sized — no padding or fixed dimensions. Use when the button
       *  sizes itself from its children (e.g. icon + count pairs). */
      bare: {
        padding: "0",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});

type ButtonVariantProps = NonNullable<RecipeVariantProps<typeof buttonRecipe>>;

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonVariantProps & {
    ref?: Ref<HTMLButtonElement>;
  };

const Button = ({
  variant,
  size,
  className,
  children,
  ref,
  ...props
}: ButtonProps) => (
  <button
    className={cx(buttonRecipe({ variant, size }), className)}
    ref={ref}
    {...props}
  >
    {children}
  </button>
);

export type { ButtonVariantProps };
export { Button, buttonRecipe };
