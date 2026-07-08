import { cva, type RecipeVariantProps } from "@styled-system/css";

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
export const buttonRecipe = cva({
  base: {
    alignItems: "center",
    cursor: { _disabled: "not-allowed", base: "pointer" },
    display: "inline-flex",
    fontWeight: "medium",
    gap: 2,
    justifyContent: "center",
    opacity: { _disabled: "0.5" },
    transitionDuration: "normal",
    transitionProperty: "colors,scale,opacity",
    transitionTimingFunction: "ease-in-out",
  },
  defaultVariants: {
    size: "md",
    variant: "primary",
  },
  variants: {
    size: {
      /** Content-sized — no padding or fixed dimensions. Use when the button
       *  sizes itself from its children (e.g. icon + count pairs). */
      bare: {
        padding: 0,
      },
      icon: {
        blockSize: 8,
        inlineSize: 8,
        rounded: "md",
      },
      lg: {
        fontSize: "base",
        paddingBlock: 3,
        paddingInline: 6,
        rounded: "md",
      },
      md: {
        fontSize: "sm",
        paddingBlock: 2,
        paddingInline: "4",
        rounded: "md",
      },
      sm: {
        fontSize: "xs",
        paddingBlock: 1,
        paddingInline: 2,
        rounded: "md",
      },
    },
    variant: {
      ghost: {
        _active: { scale: "0.95" },
        _disabled: {
          _active: { scale: "1" },
          _hover: { color: "text.muted", scale: "1" },
        },
        _hover: { color: "text.secondary", scale: "1.05" },
        color: "text.muted",
      },
      outline: {
        _disabled: { _hover: { backgroundColor: "bg.surface" } },
        _focus: { outline: "none", ringOffset: "0" },
        _hover: { backgroundColor: "bg.subtle" },
        backgroundColor: "bg.surface",
        borderColor: "border.strong",
        borderWidth: 1,
        color: "text.primary",
        ring: 1,
        ringColor: "border",
        ringOffset: "inset",
        shadow: "sm",
      },
      primary: {
        _focus: {
          outline: "none",
          ring: 2,
          ringColor: "brand.ring",
          ringOffset: 2,
        },
        _hover: { backgroundColor: "brand.hover" },
        backgroundColor: "brand",
        color: "text.inverse",
        shadow: "sm",
      },
    },
  },
});

export type ButtonVariantProps = NonNullable<
  RecipeVariantProps<typeof buttonRecipe>
>;
