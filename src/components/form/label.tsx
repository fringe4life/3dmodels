import { css, cx } from "../../../styled-system/css";

const Label = ({
  children,
  htmlFor,
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) => (
  <label
    className={cx(
      css({
        display: "block",
        fontWeight: "medium",
        color: "gray.700",
        fontSize: "sm",
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
