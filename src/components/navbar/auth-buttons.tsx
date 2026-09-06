"use client";

import { css } from "@styled-system/css";
import { circle, hstack, square } from "@styled-system/patterns";
import { useActionState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { FormError } from "@/components/form/form-error";
import { PendingButton } from "@/components/pending-button";
import { signOutAction } from "@/lib/auth/sign-out-action";
import type { Children } from "@/types";

type AuthButtonsProps = Children & {
  transitionName: string;
};

const AuthButtons = ({ children, transitionName }: AuthButtonsProps) => {
  const [actionState, formAction, isPending] = useActionState(
    signOutAction,
    null,
  );

  return (
    <div className={hstack({ gap: 2 })}>
      <div
        className={circle({
          overflow: "hidden",
          position: "relative",
          size: 8,
        })}
      >
        {children}
      </div>

      <form action={formAction}>
        <PendingButton
          aria-label="Sign out"
          className={css({
            _disabled: { cursor: "progress", opacity: "0.75" },
            color: {
              _disabled: "text.secondary",
              _hover: "brand",
              base: "text.placeholder",
            },
            inlineSize: "fit-content",
            transitionDuration: "normal",
            transitionProperty: "colors",
          })}
          isPending={isPending}
          transitionName={transitionName}
          variant="ghost"
        >
          <FaSignOutAlt aria-hidden="true" className={square({ size: 5 })} />
        </PendingButton>
      </form>
      <FormError actionState={actionState} isPending={isPending} />
    </div>
  );
};

export { AuthButtons };
