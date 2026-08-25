import { css, cx } from "@styled-system/css";
import { between, cq, hstack, stack } from "@styled-system/patterns";
import { ViewTransition } from "react";
import { OfflineBanner } from "@/components/offline-indicator";
import { MOBILE_NAVIGATION_ID } from "./constants";
import { DesktopNav } from "./desktop-nav";
import { MobileMenuButton } from "./mobile-menu-button";
import { MobileNavPopover } from "./mobile-nav-popover";
import { NavbarLogo } from "./navbar-logo";

/** Must match `MOBILE_NAVIGATION_ID` — used in `:has()` hamburger-open selectors below. */
const mobileNavigationSelector = `#${MOBILE_NAVIGATION_ID}`;

const navbarShellClassName = cx(
  stack({
    _supportsScroll: {
      animationFillMode: "both",
      animationName: "navAnimation",
      animationRange: "100px 200px",
      animationTimeline: "scroll()",
      animationTimingFunction: "linear",
    },
    backdropBlur: "sm",
    backgroundColor: "white/65",
    borderBottomColor: "gray.400/20",
    borderBottomStyle: "solid",
    borderBottomWidth: 2,
    insetBlockStart: 0,
    insetInline: 0,
    paddingBlock: 4,
    paddingInline: { base: 4, sm: 6 },
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
