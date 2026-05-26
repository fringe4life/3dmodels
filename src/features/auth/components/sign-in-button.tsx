"use client";

import { css, cx } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import { type MouseEventHandler, useTransition, ViewTransition } from "react";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@/components/button";
import { authClient } from "@/lib/auth-client";
import { tryCatch } from "@/utils/try-catch";

const SignInButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleGithubLogin: MouseEventHandler<HTMLButtonElement> = () => {
    startTransition(async () => {
      await tryCatch(() =>
        authClient.signIn.social({
          provider: "github",
        }),
      );
    });
  };

  return (
    <div className={css({ spaceY: 4 })}>
      <ViewTransition>
        <Button
          className={cx(
            css({
              inlineSize: "full",
              fontWeight: "semibold",
              _disabled: { cursor: "progress", opacity: "0.75" },
              gap: 1,
            }),
          )}
          disabled={isPending}
          onClick={handleGithubLogin}
          type="button"
          variant="outline"
        >
          <FaGithub className={square({ size: 5 })} />
          {isPending ? "Signing in..." : "Sign in with GitHub"}
        </Button>
      </ViewTransition>
      <div className={css({ textAlign: "center" })}>
        <p className={css({ color: "text.muted", fontSize: "sm" })}>
          By signing in, you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
};

export { SignInButton };
