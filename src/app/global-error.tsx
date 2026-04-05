"use client";

import type { ErrorInfo } from "next/error";
import "./globals.css";

const GlobalError = ({ error, unstable_retry }: ErrorInfo) => {
  const digest =
    "digest" in error && typeof error.digest === "string"
      ? error.digest
      : undefined;

  return (
    <html lang="en">
      <head>
        <title>Something went wrong | PrintForge</title>
      </head>
      <body className="min-block-dvh bg-white font-sans text-neutral-900 antialiased">
        <div className="min-block-dvh grid place-content-center gap-6 px-6 py-12">
          <div className="max-inline-md text-center">
            <h1 className="font-semibold text-2xl text-neutral-900">
              Something went wrong
            </h1>
            <p className="mbs-3 text-gray-600 text-sm">
              We couldn&apos;t load PrintForge. You can try again or return to
              the home page.
            </p>
            {process.env.NODE_ENV === "development" && digest ? (
              <p className="mbs-4 break-all font-mono text-neutral-500 text-xs">
                {digest}
              </p>
            ) : null}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              className="rounded-md bg-orange-accent px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-orange-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={() => unstable_retry()}
              type="button"
            >
              Try again
            </button>
            {/* Full document navigation (not next/link): after a global error we want a hard refresh so client state and the broken tree are fully cleared. */}
            <a
              className="text-gray-600 text-sm underline decoration-neutral-300 underline-offset-4 transition-colors hover:text-neutral-900"
              href="/"
            >
              Return home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
};

export default GlobalError;
