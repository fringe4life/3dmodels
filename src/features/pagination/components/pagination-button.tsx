import { Button } from "@/components/button";

interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const PaginationButton = ({
  children,
  disabled,
  onClick,
}: PaginationButtonProps) => (
  <Button
    disabled={disabled}
    onClick={onClick}
    size="icon"
    type="button"
    variant="ghost"
  >
    {children}
  </Button>
);

export { PaginationButton };
