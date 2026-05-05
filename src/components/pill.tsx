import { css, cx } from "../../styled-system/css";

const Pill = ({ children, className = "" }: React.ComponentProps<"span">) => (
  <span
    className={cx(
      css({
        display: "inline-block",
        rounded: "full",
        borderColor: "gray.400",
        borderWidth: 1,
        backgroundColor: "transparent",
        paddingInline: 3,
        paddingBlock: 1,
        color: "gray.800",
        fontSize: "sm",
      }),
      className,
    )}
  >
    {children}
  </span>
);

export { Pill };
// className={`nline-block self-center rounded-full border border-gray-400 bg-transparent px-3 py-1 text-gray-800 text-sm ${className}`}
