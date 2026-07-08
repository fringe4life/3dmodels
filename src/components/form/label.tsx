import { css, cx } from "@styled-system/css";

const Label = ({
  children,
  htmlFor,
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cx(
      css({
        color: "text.secondary",
        display: "block",
        fontSize: "sm",
        fontWeight: "medium",
      }),
      className,
    )}
    htmlFor={htmlFor}
    {...props}
  >
    {children}
  </label>
);

export { Label };
