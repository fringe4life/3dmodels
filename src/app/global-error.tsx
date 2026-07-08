"use client";

import { css } from "@styled-system/css";
import { center, grid } from "@styled-system/patterns";
import type { ErrorInfo } from "next/error";
import { ResetButton } from "@/components/form/reset-button";

const GlobalError = ({ retry }: ErrorInfo) => (
  <html lang="en">
    <head>
      <title>Something went wrong | PrintForge</title>
    </head>
    <body
      className={css({
        backgroundColor: "white",
        color: "neutral.900",
        fontFamily: "var(--font-albert-sans)",
        minBlockSize: "100dvh",
      })}
    >
      <div
        className={grid({
          gap: 6,
          minBlockSize: "100dvh",
          paddingBlock: 12,
          paddingInline: 6,
          placeContent: "center",
        })}
      >
        <div className={css({ maxInlineSize: "md", textAlign: "center" })}>
          <h1
            className={css({
              color: "neutral.900",
              fontSize: "2xl",
              fontWeight: "semibold",
            })}
          >
            Something went wrong
          </h1>
          <p
            className={css({
              color: "gray.600",
              fontSize: "sm",
              marginBlockStart: 3,
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
          <ResetButton onClick={retry} />
          {/* Full document navigation (not next/link): after a global error we want a hard refresh so client state and the broken tree are fully cleared. */}
          {/* react-doctor-disable-next-line */}
          <a
            className={css({
              _hover: { color: "neutral.900" },
              color: "gray.600",
              fontSize: "sm",
              textDecoration: "underline",
              textDecorationColor: "neutral.300",
              textUnderlineOffset: "4",
              transitionProperty: "colors",
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
