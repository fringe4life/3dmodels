import { css } from "@styled-system/css";
import type { ReactNode } from "react";
import type { Children, Prettify } from "@/types";

type AuthCardProps = Prettify<
  Children & {
    footer?: ReactNode;
    title: string;
  }
>;

const AuthCard = ({ title, footer, children }: AuthCardProps) => (
  <div
    className={css({
      backgroundColor: "bg.surface",
      padding: 6,
      rounded: "md",
      shadow: "md",
    })}
  >
    <h2
      className={css({
        color: "text.primary",
        fontSize: { base: "xl", sm: "3xl" },
        fontWeight: "bold",
        lineHeight: "tight",
        marginBlock: 6,
        textAlign: "center",
      })}
    >
      {title}
    </h2>
    {children}
    {footer}
  </div>
);

export { AuthCard };
