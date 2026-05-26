import { css, cx } from "@styled-system/css";

const Input = ({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    className={cx(
      css({
        marginBlockStart: 1,
        inlineSize: "full",
        display: "block",
        rounded: "md",
        borderColor: { base: "border", _focusWithin: "brand" },
        borderWidth: 1,
        paddingInline: 3,
        paddingBlock: 2,
        shadow: "sm",
        transitionProperty: "colors",
        transitionDuration: "normal",
        _focus: { outline: "none", ring: "brand" },
        _focusVisible: { ring: "brand" },
        fontSize: { sm: "sm" },
      }),
      className,
    )}
    {...props}
  />
);

export { Input };
