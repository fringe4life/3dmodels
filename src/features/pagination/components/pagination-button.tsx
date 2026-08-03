import { cx } from "@styled-system/css";
import { Button } from "@/components/button";

type PaginationButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const PaginationButton = ({
  children,
  className,
  ...props
}: PaginationButtonProps) => (
  <Button
    {...props}
    className={cx("group", className)}
    size="icon"
    type="button"
    variant="ghost"
  >
    {children}
  </Button>
);

export { PaginationButton };
