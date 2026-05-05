"use client";

import { type MouseEventHandler, useTransition, ViewTransition } from "react";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@/components/button";
import { authClient } from "@/lib/auth-client";
import { tryCatch } from "@/utils/try-catch";
import { css, cx } from "../../../../styled-system/css";
import { square } from "../../../../styled-system/patterns";

const SignInButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleClick: MouseEventHandler<HTMLButtonElement> = () => {
    startTransition(async () => {
      await tryCatch(() =>
        authClient.signIn.social({
          provider: "github",
        }),
      );
    });
  };

  return (
    <div className={css({ spaceY: "4" })}>
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
          onClick={handleClick}
          type="button"
          variant="outline"
        >
          <FaGithub className={square({ size: 5 })} />
          {isPending ? "Signing in..." : "Sign in with GitHub"}
        </Button>
      </ViewTransition>
      <div className={css({ textAlign: "center" })}>
        <p className={css({ color: "gray.500", fontSize: "sm" })}>
          By signing in, you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
};

export { SignInButton };
