import { css, cx } from "../../../styled-system/css";

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
        borderColor: "border",
        borderWidth: 1,
        paddingInline: 3,
        paddingBlock: 2,
        shadow: "sm",
        transitionProperty: "colors",
        transitionDuration: "normal",
        _focusWithin: { borderColor: "brand" },
        _focus: { outline: "none", ring: "brand" },
        _focusVisible: { ring: "brand" },
        sm: { fontSize: "sm" },
      }),
      className,
    )}
    {...props}
  />
);

export { Input };
