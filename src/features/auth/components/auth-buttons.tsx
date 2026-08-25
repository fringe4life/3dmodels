"use client";

import { css, cx } from "@styled-system/css";
import { circle, hstack, square } from "@styled-system/patterns";
import { useTransition } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { SubmitButton } from "@/components/form/submit-button";
import { signOutAction } from "@/features/auth/actions/sign-out-action";
import type { Children } from "@/types";

type AuthButtonsProps = Children;

const AuthButtons = ({ children }: AuthButtonsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOutAction();
    });
  };

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

      <SubmitButton
        aria-label="Sign out"
        className={cx(
          "group",
          css({
            _disabled: { cursor: "progress", opacity: "0.75" },
            color: {
              _disabled: "text.secondary",
              _hover: "brand",
              base: "text.placeholder",
            },
            transitionDuration: "normal",
            transitionProperty: "colors",
          }),
        )}
        isPending={isPending}
        onClick={handleSignOut}
        type="button"
        variant="ghost"
      >
        <FaSignOutAlt
          aria-hidden="true"
          className={square({ _groupDisabled: { display: "none" }, size: 5 })}
        />
      </SubmitButton>
    </div>
  );
};

export { AuthButtons };
