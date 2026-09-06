import { css } from "@styled-system/css";
import { flex } from "@styled-system/patterns";
import { ResetButton } from "@/components/form/reset-button";

interface InlineErrorFallbackProps {
  message: string;
  retry: () => void;
}

const InlineErrorFallback = ({ message, retry }: InlineErrorFallbackProps) => (
  <div
    className={flex({
      align: { base: "center", md: "start" },
      direction: { md: "column" },
      gap: 4,
      padding: 4,
    })}
  >
    <p className={css({ color: "gray.600", fontSize: "sm" })}>{message}</p>
    <ResetButton onClick={retry} />
  </div>
);

export { InlineErrorFallback };
