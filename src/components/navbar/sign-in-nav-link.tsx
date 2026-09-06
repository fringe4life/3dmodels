import { square, visuallyHidden } from "@styled-system/patterns";
import { FaSignInAlt } from "react-icons/fa";
import { buttonRecipe } from "@/components/button-recipe";
import { NavLink } from "@/components/nav-link/nav-link";

const SignInNavLink = () => (
  <NavLink
    borderPosition="bottom"
    className={buttonRecipe({ size: "md", variant: "ghost" })}
    href="/signin"
    matchStrategy="endsWith"
    prefetch
    skeletonCh={3}
  >
    <span className={visuallyHidden()}>Sign In</span>
    <FaSignInAlt aria-hidden className={square({ size: 5 })} />
  </NavLink>
);

export { SignInNavLink };
