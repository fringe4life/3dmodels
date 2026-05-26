"use client";

import { css } from "@styled-system/css";
import { center, grid } from "@styled-system/patterns";
import type { ErrorInfo } from "next/error";
import { ResetButton } from "@/components/form/reset-button";

const GlobalError = ({ unstable_retry }: ErrorInfo) => (
  <html lang="en">
    <head>
      <title>Something went wrong | PrintForge</title>
    </head>
    <body
      className={css({
        minBlockSize: "100dvh",
        backgroundColor: "white",
        fontFamily: "var(--font-albert-sans)",
        color: "neutral.900",
      })}
    >
      <div
        className={grid({
          minBlockSize: "100dvh",
          placeContent: "center",
          gap: 6,
          paddingInline: 6,
          paddingBlock: 12,
        })}
      >
        <div className={css({ maxInlineSize: "md", textAlign: "center" })}>
          <h1
            className={css({
              fontWeight: "semibold",
              fontSize: "2xl",
              color: "neutral.900",
            })}
          >
            Something went wrong
          </h1>
          <p
            className={css({
              marginBlockStart: 3,
              color: "gray.600",
              fontSize: "sm",
            })}
          >
            We couldn&apos;t load PrintForge. You can try again or return to the
            home page.
          </p>
        </div>
        <div
          className={center({
            flexWrap: "wrap",
            gap: 4,
          })}
        >
          <ResetButton onClick={unstable_retry} />
          {/* Full document navigation (not next/link): after a global error we want a hard refresh so client state and the broken tree are fully cleared. */}
          <a
            className={css({
              color: "gray.600",
              fontSize: "sm",
              textDecoration: "underline",
              textDecorationColor: "neutral.300",
              textUnderlineOffset: "4",
              transitionProperty: "colors",
              _hover: { color: "neutral.900" },
            })}
            href="/"
          >
            Return home
          </a>
        </div>
      </div>
    </body>
  </html>
);

export default GlobalError;
