"use client";

import { css, cx } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import { useActionState, ViewTransition } from "react";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@/components/button";
import { FormError } from "@/components/form/form-error";
import { signInGithubAction } from "@/features/auth/actions/sign-in-github-action";

const SignInButton = () => {
  const [actionState, formAction, isPending] = useActionState(
    signInGithubAction,
    null,
  );

  return (
    <div className={css({ spaceY: 4 })}>
      <form action={formAction}>
        <ViewTransition>
          <Button
            className={cx(
              css({
                _disabled: { cursor: "progress", opacity: "0.75" },
                fontWeight: "semibold",
                gap: 1,
                inlineSize: "full",
              }),
            )}
            disabled={isPending}
            type="submit"
            variant="outline"
          >
            <FaGithub aria-hidden className={square({ size: 5 })} />
            {isPending ? "Signing in..." : "Sign in with GitHub"}
          </Button>
        </ViewTransition>
      </form>
      <FormError actionState={actionState} isPending={isPending} />
      <div className={css({ textAlign: "center" })}>
        <p className={css({ color: "text.muted", fontSize: "sm" })}>
          By signing in, you agree to our terms of service and privacy policy.
        </p>
      </div>
    </div>
  );
};

export { SignInButton };
