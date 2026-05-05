"use client";

import { useTransition } from "react";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { buttonRecipe } from "@/components/button";
import { SubmitButton } from "@/components/form/submit-button";
import { NavLink } from "@/components/nav-link";
import { signOutAction } from "@/features/auth/actions/sign-out-action";
import type { AuthButtonsProps } from "@/features/auth/types";
import { css, cx } from "../../../../styled-system/css";
import { circle, flex, square } from "../../../../styled-system/patterns";

const AuthButtons = ({ isAuthenticated, children }: AuthButtonsProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOutAction();
    });
  };

  if (isAuthenticated) {
    return (
      <div className={flex({ align: "center", gap: 2 })}>
        <div
          className={cx(
            circle({ size: 8 }),
            css({ position: "relative", overflow: "hidden" }),
          )}
        >
          {children}
        </div>

        <SubmitButton
          className={cx(
            "group",
            css({
              color: {
                base: "gray.400",
                _hover: "orangeAccent",
                _disabled: "gray.700",
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
            className={cx(
              square({ size: 5 }),
              css({ _groupDisabled: { display: "none" } }),
            )}
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
