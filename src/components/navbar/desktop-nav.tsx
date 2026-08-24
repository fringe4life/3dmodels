import { css } from "@styled-system/css";
import { hstack } from "@styled-system/patterns";
import { NavLinkListItem } from "@/components/nav-link/nav-link-list-item";
import { PRIMARY_NAV_LINKS } from "./constants";
import { NavbarAuthSlot } from "./navbar-auth-slot";

const desktopNavigationClassName = hstack({
  display: { base: "none", sm: "flex" },
  gap: { base: 2, sm: 4 },
});

const desktopAuthListItemClassName = css({
  fontSize: "sm",
  placeSelf: "center",
});

const DesktopNav = () => (
  <ul className={desktopNavigationClassName}>
    {PRIMARY_NAV_LINKS.map(({ label, ...linkConfig }) => (
      <NavLinkListItem
        borderPosition="bottom"
        key={linkConfig.href}
        {...linkConfig}
      >
        {label}
      </NavLinkListItem>
    ))}
    <li className={desktopAuthListItemClassName}>
      <NavbarAuthSlot variant="desktop" />
    </li>
  </ul>
);

export { DesktopNav };
