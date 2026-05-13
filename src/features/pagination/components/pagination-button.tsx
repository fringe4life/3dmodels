import { Button } from "@/components/button";

interface PaginationButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const PaginationButton = ({ children, ...props }: PaginationButtonProps) => (
  <Button {...props} size="icon" type="button" variant="ghost">
    {children}
  </Button>
);

export { PaginationButton };
