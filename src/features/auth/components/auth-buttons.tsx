"use client";

import { css, cx } from "@styled-system/css";
import { circle, hstack, square } from "@styled-system/patterns";
import { useTransition } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { buttonRecipe } from "@/components/button";
import { SubmitButton } from "@/components/form/submit-button";
import { NavLink } from "@/components/nav-link";
import { signOutAction } from "@/features/auth/actions/sign-out-action";
import type { AuthButtonsProps } from "@/features/auth/types";

const AuthButtons = ({ isAuthenticated, children }: AuthButtonsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOutAction();
    });
  };

  if (isAuthenticated) {
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
  }
  // Not authenticated
  return (
    <NavLink
      borderPosition="bottom"
      className={buttonRecipe({ variant: "ghost", size: "md" })}
      href="/signin"
      matchStrategy="endsWith"
    >
      <span className={css({ srOnly: true })}>Sign In</span>
      <FaSignInAlt aria-hidden className={square({ size: 5 })} />
    </NavLink>
  );
};

export { AuthButtons };
