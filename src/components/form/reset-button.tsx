import { Button } from "@/components/button";

interface ResetButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const ResetButton = ({ onClick, ...props }: ResetButtonProps) => (
  <Button onClick={onClick} type="button" {...props}>
    Try again
  </Button>
);

export { ResetButton };
