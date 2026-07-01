"use client";

import { css, cx } from "@styled-system/css";
import { circle, hstack, square } from "@styled-system/patterns";
import { useTransition } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { SubmitButton } from "@/components/form/submit-button";
import { signOutAction } from "@/features/auth/actions/sign-out-action";
import type { Children } from "@/types";

interface AuthButtonsProps extends Children {}

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
          size: 8,
          position: "relative",
          overflow: "hidden",
        })}
      >
        {children}
      </div>

      <SubmitButton
        className={cx(
          "group",
          css({
            color: {
              base: "text.placeholder",
              _hover: "brand",
              _disabled: "text.secondary",
            },
            transitionProperty: "colors",
            transitionDuration: "normal",
            _disabled: { opacity: "0.75", cursor: "progress" },
          }),
        )}
        isPending={isPending}
        onClick={handleSignOut}
        type="button"
        variant="ghost"
      >
        <FaSignOutAlt
          className={square({ size: 5, _groupDisabled: { display: "none" } })}
        />
      </SubmitButton>
    </div>
  );
};

export { AuthButtons };
