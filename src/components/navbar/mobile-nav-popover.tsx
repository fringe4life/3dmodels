import { css } from "@styled-system/css";
import { stack } from "@styled-system/patterns";
import { MobileConnectivityStatus } from "@/components/offline/offline-mobile";
import { PRIMARY_NAV_LINKS } from "./constants";
import { MobileNavLink } from "./mobile-nav-link";
import { NavbarAuthSlot } from "./navbar-auth-slot";

interface MobileNavPopoverProps {
  navigationId: string;
}

const mobilePopoverClassName = css({
  _backdrop: {
    backgroundImage:
      "linear-gradient(to bottom, transparent 0, transparent 4.75rem, rgb(17 17 19 / 12%) 4.75rem, rgb(17 17 19 / 12%) 100%)",
  },
  _open: {
    opacity: 1,
    translate: "0 0",
  },
  _starting: {
    opacity: 0,
    translate: "0 -10px",
  },
  backgroundColor: "bg.surface",
  borderColor: "border.subtle",
  borderWidth: 1,
  boxShadow: "lg",
  display: { base: "block", sm: "none" },
  inlineSize: "calc(100% - 1rem)",
  insetBlockStart: "anchor(bottom)",
  insetInlineEnd: "anchor(right)",
  insetInlineStart: "auto",
  margin: 0,
  marginBlockStart: 2,
  maxInlineSize: "20rem",
  opacity: 0,
  padding: 0,
  position: "fixed",
  positionAnchor: "--mobile-menu-trigger",
  rounded: "lg",
  transitionBehavior: "allow-discrete",
  transitionDuration: "normal",
  transitionProperty: "opacity,translate,display,overlay",
  transitionTimingFunction: "soft",
  translate: "0 -10px",
});

const mobilePopoverHeaderClassName = css({
  alignItems: "center",
  borderBlockEndColor: "border.subtle",
  borderBlockEndWidth: 1,
  display: "flex",
  justifyContent: "space-between",
  paddingBlock: 3,
  paddingInline: 4,
});

const mobilePopoverTitleClassName = css({
  color: "text.muted",
  fontSize: "xs",
  fontWeight: "semibold",
  letterSpacing: "wide",
  textTransform: "uppercase",
});

const mobileNavigationListClassName = stack({
  gap: 1,
  padding: 2,
});

const mobileAuthItemClassName = css({
  borderBlockStartColor: "border.subtle",
  borderBlockStartWidth: 1,
  marginBlockStart: 1,
  paddingBlockStart: 1,
});

const MobileNavPopover = ({ navigationId }: MobileNavPopoverProps) => (
  <div className={mobilePopoverClassName} id={navigationId} popover="auto">
    <div className={mobilePopoverHeaderClassName}>
      <span className={mobilePopoverTitleClassName}>Navigate</span>
      <MobileConnectivityStatus />
    </div>
    <nav aria-label="Mobile navigation">
      <ul className={mobileNavigationListClassName}>
        {PRIMARY_NAV_LINKS.map((linkConfig) => (
          <li key={linkConfig.href}>
            <MobileNavLink {...linkConfig} />
          </li>
        ))}
        <li className={mobileAuthItemClassName}>
          <NavbarAuthSlot variant="mobile" />
        </li>
      </ul>
    </nav>
  </div>
);

export { MobileNavPopover };
