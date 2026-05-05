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
        borderColor: "gray.300",
        borderWidth: 1,
        paddingInline: 3,
        paddingBlock: 2,
        shadow: "sm",
        transitionProperty: "colors",
        transitionDuration: "normal",
        _focusWithin: { borderColor: "orangeAccent" },
        _focus: { outline: "none", ring: "orangeAccent" },
        _focusVisible: { ring: "orangeAccent" },
        sm: { fontSize: "sm" },
      }),
      className,
    )}
    {...props}
  />
);

export { Input };
