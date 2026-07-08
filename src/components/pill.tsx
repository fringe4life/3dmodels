import { css, cx } from "@styled-system/css";

const Pill = ({ children, className = "" }: React.ComponentProps<"span">) => (
  <span
    className={cx(
      css({
        backgroundColor: "transparent",
        borderColor: "gray.400",
        borderWidth: 1,
        color: "gray.800",
        display: "inline-block",
        fontSize: "sm",
        paddingBlock: 1,
        paddingInline: 3,
        rounded: "full",
      }),
      className,
    )}
  >
    {children}
  </span>
);

export { Pill };
