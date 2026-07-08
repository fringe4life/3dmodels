import { Button } from "@/components/button";

type PaginationButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const PaginationButton = ({ children, ...props }: PaginationButtonProps) => (
  <Button {...props} size="icon" type="button" variant="ghost">
    {children}
  </Button>
);

export { PaginationButton };
