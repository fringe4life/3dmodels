import { css, cx } from "@styled-system/css";

const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cx(
      css({
        _focus: { outline: "none", ring: "brand" },
        _focusVisible: { ring: "brand" },
        borderColor: { _focusWithin: "brand", base: "border" },
        borderWidth: 1,
        display: "block",
        fontSize: { sm: "sm" },
        inlineSize: "full",
        marginBlockStart: 1,
        paddingBlock: 2,
        paddingInline: 3,
        rounded: "md",
        shadow: "sm",
        transitionDuration: "normal",
        transitionProperty: "colors",
      }),
      className,
    )}
    {...props}
  />
);

export { Input };
