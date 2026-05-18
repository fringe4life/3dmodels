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
    cursor: { base: "pointer", _disabled: "not-allowed" },
    opacity: { _disabled: "0.5" },
    transitionProperty: "colors,scale,opacity",
    transitionDuration: "normal",
    transitionTimingFunction: "ease-in-out",
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: "brand",
        color: "text.inverse",
        shadow: "sm",
        _hover: { backgroundColor: "brand.hover" },
        _focus: {
          outline: "none",
          ring: 2,
          ringColor: "brand.ring",
          ringOffset: 2,
        },
      },
      outline: {
        backgroundColor: "bg.surface",
        color: "text.primary",
        borderWidth: 1,
        borderColor: "border.strong",
        ring: 1,
        ringColor: "border",
        ringOffset: "inset",
        shadow: "sm",
        _hover: { backgroundColor: "bg.subtle" },
        _focus: { outline: "none", ringOffset: "0" },
        _disabled: { _hover: { backgroundColor: "bg.surface" } },
      },
      ghost: {
        color: "text.muted",
        _hover: { color: "text.secondary", scale: "1.05" },
        _active: { scale: "0.95" },
        _disabled: {
          _hover: { color: "text.muted", scale: "1" },
          _active: { scale: "1" },
        },
      },
    },
    size: {
      sm: {
        paddingInline: 2,
        paddingBlock: 1,
        fontSize: "xs",
        rounded: "md",
      },
      md: {
        paddingInline: "4",
        paddingBlock: 2,
        fontSize: "sm",
        rounded: "md",
      },
      lg: {
        paddingInline: 6,
        paddingBlock: 3,
        fontSize: "base",
        rounded: "md",
      },
      icon: {
        inlineSize: 8,
        blockSize: 8,
        rounded: "md",
      },
      /** Content-sized — no padding or fixed dimensions. Use when the button
       *  sizes itself from its children (e.g. icon + count pairs). */
      bare: {
        padding: 0,
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
