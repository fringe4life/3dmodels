import { css, cx } from "@styled-system/css";
import { between, hstack } from "@styled-system/patterns";
import { ViewTransition } from "react";
import { OfflineBanner } from "@/components/offline/offline-indicator";
import { MOBILE_NAVIGATION_ID } from "./constants";
import { DesktopNav } from "./desktop-nav";
import { MobileMenuButton } from "./mobile-menu-button";
import { MobileNavPopover } from "./mobile-nav-popover";
import { NavbarLogo } from "./navbar-logo";
import { navbarShellClassName } from "./navbar-shell.styles";

const Navbar = () => (
  <ViewTransition name="main-header">
    <header className={navbarShellClassName}>
      <nav
        aria-label="Primary navigation"
        className={cx(between(), css({ position: "relative" }))}
      >
        <NavbarLogo />
        <div className={hstack({ gap: { base: 2, sm: 4 } })}>
          <OfflineBanner />
          <DesktopNav />
          <MobileMenuButton navigationId={MOBILE_NAVIGATION_ID} />
        </div>
      </nav>
      <MobileNavPopover navigationId={MOBILE_NAVIGATION_ID} />
    </header>
  </ViewTransition>
);

export { Navbar };
