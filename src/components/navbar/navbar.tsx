import { css, cx, keyframes } from "@styled-system/css";
import {
  between,
  cq,
  hstack,
  siteContainer,
  stack,
} from "@styled-system/patterns";
import { ViewTransition } from "react";
import { OfflineBanner } from "@/components/offline-indicator";
import { MOBILE_NAVIGATION_ID } from "./constants";
import { DesktopNav } from "./desktop-nav";
import { MobileMenuButton } from "./mobile-menu-button";
import { MobileNavPopover } from "./mobile-nav-popover";
import { NavbarLogo } from "./navbar-logo";

/** Must match `MOBILE_NAVIGATION_ID` — used in `:has()` hamburger-open selectors below. */
const mobileNavigationSelector = `#${MOBILE_NAVIGATION_ID}`;

/** Sticky main header: elevates on page scroll (see `Navbar`) */
const navAnimation = keyframes({
  to: {
    borderRadius: "100dvw",
    boxShadow:
      "0 1px 2px token(colors.gray.300/0.2), 0 2px 4px token(colors.black/0.2), 0 4px 8px token(colors.black/0.1)",
    translate: "0 8px",
  },
});

const navbarShellClassName = cx(
  stack({
    _supportsScroll: {
      animationFillMode: "both",
      animationName: navAnimation,
      animationRange: "100px 200px",
      animationTimeline: "scroll()",
      animationTimingFunction: "linear",
    },
    backdropBlur: "sm",
    backgroundColor: "white/65",
    borderBlockEndColor: "gray.400/20",
    borderBlockEndStyle: "solid",
    borderBlockEndWidth: 2,
    insetBlockStart: 0,
    insetInline: 0,
    paddingBlock: 4,
    position: "sticky",
    transitionDuration: "normal",
    transitionProperty: "translate,border-radius",
    transitionTimingFunction: "soft",
    zIndex: "20",
  }),
  css({
    [`&:has(${mobileNavigationSelector}:popover-open) .mobile-menu-glyph [data-line="bottom"]`]:
      {
        transform: "translateY(-5px) rotate(-45deg)",
      },
    [`&:has(${mobileNavigationSelector}:popover-open) .mobile-menu-glyph [data-line="middle"]`]:
      {
        transform: "scaleX(0)",
        transitionDelay: "0ms",
      },
    [`&:has(${mobileNavigationSelector}:popover-open) .mobile-menu-glyph [data-line="top"]`]:
      {
        transform: "translateY(5px) rotate(45deg)",
      },
  }),
);

const Navbar = () => (
  <ViewTransition name="main-header">
    <header className={navbarShellClassName}>
      <nav
        aria-label="Primary navigation"
        className={cx(
          between(),
          cq({ name: "navbar" }),
          siteContainer(),
          css({ position: "relative" }),
        )}
      >
        <NavbarLogo />
        <div className={cx(hstack({ gap: { base: 2, sm: 4 } }))}>
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
