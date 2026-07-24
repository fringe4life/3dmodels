import { css, viewTransition } from "@styled-system/css";
import type { ReactNode } from "react";
import { ViewTransition } from "react";
import type { Children, Prettify } from "@/types";

type AuthCardProps = Prettify<
  Children & {
    footer?: ReactNode;
    title: string;
  }
>;

const authFooterVt = viewTransition({
  new: {
    "--slide-distance-y": "-20px",
    animationDuration: "250ms",
    animationName: "fade-in, slide-in-y",
    animationTimingFunction: "glide",
  },
  old: {
    "--slide-distance-y": "20px",
    animationDuration: "250ms",
    animationName: "fade-out, slide-out-y",
    animationTimingFunction: "glide",
  },
});

const AuthCard = ({ title, footer, children }: AuthCardProps) => (
  <ViewTransition name="auth-card">
    <div
      className={css({
        backgroundColor: "bg.surface",
        padding: 6,
        rounded: "md",
        shadow: "md",
      })}
    >
      <ViewTransition name="auth-card-title">
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
      </ViewTransition>
      {children}
      <ViewTransition
        default={authFooterVt}
        name="auth-footer"
        share={authFooterVt}
      >
        <div>{footer}</div>
      </ViewTransition>
    </div>
  </ViewTransition>
);

export { AuthCard };
