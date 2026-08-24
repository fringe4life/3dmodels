import { css, cx } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import type { ReactNode } from "react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { NavLink } from "@/components/nav-link/nav-link";
import type { NavbarNavLinkConfig } from "./types";

interface MobileNavLinkProps extends NavbarNavLinkConfig {
  className?: string;
  leadingIcon?: ReactNode;
  showExternalIcon?: boolean;
}

const mobileNavigationLinkClassName = css({
  _focusVisible: {
    backgroundColor: "bg.muted",
    outline: "none",
    ring: 2,
    ringColor: "brand.ring",
    ringOffset: 1,
  },
  _hover: { backgroundColor: "bg.muted" },
  alignItems: "center",
  borderRadius: "md",
  display: "flex",
  fontSize: "base",
  fontWeight: "semibold",
  gap: 3,
  justifyContent: "space-between",
  paddingBlock: 3,
  paddingInline: 3,
  transitionDuration: "normal",
  transitionProperty: "background-color,color",
  transitionTimingFunction: "soft",
});

const mobileNavigationIconClassName = cx(
  square({ size: 4 }),
  css({ color: "text.muted", flexShrink: 0 }),
);

const MobileNavLink = ({
  label,
  leadingIcon,
  showExternalIcon = true,
  className,
  borderPosition = "left",
  closePopoverOnClick = true,
  ...linkConfig
}: MobileNavLinkProps) => (
  <NavLink
    {...linkConfig}
    borderPosition={borderPosition}
    className={cx(
      mobileNavigationLinkClassName,
      leadingIcon ? css({ justifyContent: "flex-start" }) : undefined,
      className,
    )}
    closePopoverOnClick={closePopoverOnClick}
  >
    {leadingIcon}
    <span>{label}</span>
    {showExternalIcon ? (
      <FaArrowUpRightFromSquare
        aria-hidden="true"
        className={mobileNavigationIconClassName}
      />
    ) : null}
  </NavLink>
);

export { MobileNavLink };
