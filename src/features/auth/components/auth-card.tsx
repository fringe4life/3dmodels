import type { ReactNode } from "react";
import { css } from "../../../../styled-system/css";

interface AuthCardProps {
  children: ReactNode;
  footer?: ReactNode;
  title: string;
}

const AuthCard = ({ title, footer, children }: AuthCardProps) => (
  <div
    className={css({
      rounded: "md",
      backgroundColor: "white",
      padding: 6,
      shadow: "md",
    })}
  >
    <h2
      className={css({
        marginBlock: 6,
        textAlign: "center",
        fontWeight: "bold",
        fontSize: { base: "xl", sm: "3xl" },
        color: "gray.900",
        lineHeight: "tight",
      })}
    >
      {title}
    </h2>
    {children}
    {footer}
  </div>
);

export { AuthCard };
