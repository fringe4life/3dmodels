import { css } from "@styled-system/css";
import type { ReactNode } from "react";
import type { Children } from "@/types";

interface AuthCardProps extends Children {
  footer?: ReactNode;
  title: string;
}

const AuthCard = ({ title, footer, children }: AuthCardProps) => (
  <div
    className={css({
      rounded: "md",
      backgroundColor: "bg.surface",
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
        color: "text.primary",
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
