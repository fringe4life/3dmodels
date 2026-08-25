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
  group: {
    animationDuration: "slow",
    animationTimingFunction: "glide",
  },
  new: {
    "--slide-distance-y": "-20px",
    animationName: "fade-in, slide-in-y",
  },
  old: {
    "--slide-distance-y": "20px",
    animationName: "fade-out, slide-out-y",
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
