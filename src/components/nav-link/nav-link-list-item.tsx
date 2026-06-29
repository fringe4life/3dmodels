import { css } from "@styled-system/css";
import { NavLink, type NavLinkProps } from "./nav-link";

interface NavLinkListItemProps extends NavLinkProps {
  liClassName?: string;
}

const NavLinkListItem = ({
  liClassName = css({
    fontSize: "sm",
    textTransform: "uppercase",
    letterSpacing: "wide",
  }),
  ...navLinkProps
}: NavLinkListItemProps) => (
  <li className={liClassName}>
    <NavLink {...navLinkProps} />
  </li>
);

export { NavLinkListItem };
