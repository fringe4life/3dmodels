import { css } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import { FaSignInAlt } from "react-icons/fa";
import { buttonRecipe } from "@/components/button";
import { NavLink } from "@/components/nav-link/nav-link";

const SignInNavLink = () => (
  <NavLink
    borderPosition="bottom"
    className={buttonRecipe({ variant: "ghost", size: "md" })}
    href="/signin"
    matchStrategy="endsWith"
    skeletonCh={3}
  >
    <span className={css({ srOnly: true })}>Sign In</span>
    <FaSignInAlt aria-hidden className={square({ size: 5 })} />
  </NavLink>
);

export { SignInNavLink };
