import { css } from "@styled-system/css";
import { NavLink, type NavLinkProps } from "./nav-link";

type NavLinkListItemProps = NavLinkProps & {
  liClassName?: string;
};

const NavLinkListItem = ({
  liClassName = css({
    fontSize: "sm",
    letterSpacing: "wide",
    textTransform: "uppercase",
  }),
  ...navLinkProps
}: NavLinkListItemProps) => (
  <li className={liClassName}>
    <NavLink {...navLinkProps} />
  </li>
);

export { NavLinkListItem };
