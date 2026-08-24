import { css, cx } from "@styled-system/css";
import {
  between,
  circle,
  hstack,
  square,
  stack,
} from "@styled-system/patterns";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { NavLink } from "@/components/nav-link/nav-link";
import { NavLinkListItem } from "@/components/nav-link/nav-link-list-item";
import { OfflineBanner } from "@/components/offline-indicator";
import { AuthButtons } from "@/features/auth/components/auth-buttons";
import { AuthButtonsSkeleton } from "@/features/auth/components/auth-buttons-skeleton";
import { Avatar } from "@/features/auth/components/avatar";
import { HasAuthSuspense } from "@/features/auth/components/has-auth";
import { SignInNavLink } from "@/features/auth/components/sign-in-nav-link";

const MOBILE_NAVIGATION_ID = "mobile-navigation";

const desktopNavigationClassName = hstack({
  display: { base: "none", md: "flex" },
  gap: { base: 2, sm: 4 },
});

const mobileMenuButtonClassName = cx(
  square({ size: 9 }),
  css({
    _active: { scale: "0.95" },
    _focusVisible: {
      outline: "none",
      ring: 2,
      ringColor: "brand.ring",
      ringOffset: 2,
    },
    _hover: {
      backgroundColor: "bg.muted",
      borderColor: "brand",
    },
    alignItems: "center",
    anchorName: "--mobile-menu-trigger",
    backgroundColor: "bg.surface",
    borderColor: "border.strong",
    borderWidth: 1,
    color: "text.primary",
    display: { base: "inline-flex", md: "none" },
    justifyContent: "center",
    rounded: "md",
    transitionDuration: "normal",
    transitionProperty: "background-color,border-color,scale",
    transitionTimingFunction: "soft",
  }),
);

const mobileMenuGlyphClassName = cx(
  square({ size: 5 }),
  css({
    _motionReduce: {
      "& line": {
        transitionDelay: "0ms",
        transitionDuration: "0ms",
      },
    },
    "& [data-line=middle]": {
      transitionDelay: "155ms",
      transitionDuration: "55ms",
      transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
    },
    "& line": {
      fill: "none",
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeWidth: 1.9,
      transformBox: "fill-box",
      transformOrigin: "center",
      transitionDuration: "210ms",
      transitionProperty: "transform",
      transitionTimingFunction: "cubic-bezier(.22,1,.36,1)",
      vectorEffect: "non-scaling-stroke",
    },
    display: "block",
    overflow: "visible",
  }),
);

const navbarClassName = cx(
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
    paddingInline: { base: 2, sm: 6 },
    position: "sticky",
    transitionDuration: "normal",
    transitionProperty: "translate,border-radius",
    transitionTimingFunction: "soft",
    zIndex: "20",
  }),
  css({
    '&:has(#mobile-navigation:popover-open) .mobile-menu-glyph [data-line="bottom"]':
      {
        transform: "translateY(-5px) rotate(-45deg)",
      },
    '&:has(#mobile-navigation:popover-open) .mobile-menu-glyph [data-line="middle"]':
      {
        transform: "scaleX(0)",
        transitionDelay: "0ms",
      },
    '&:has(#mobile-navigation:popover-open) .mobile-menu-glyph [data-line="top"]':
      {
        transform: "translateY(5px) rotate(45deg)",
      },
  }),
);

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
  display: { base: "block", md: "none" },
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

const mobilePopoverStatusClassName = hstack({
  color: "brand",
  fontSize: "xs",
  fontWeight: "semibold",
  gap: 1.5,
});

const mobilePopoverStatusDotClassName = circle({
  backgroundColor: "brand",
  size: 1,
});

const mobileNavigationListClassName = stack({
  gap: 1,
  padding: 2,
});

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

const mobileAuthItemClassName = css({
  borderBlockStartColor: "border.subtle",
  borderBlockStartWidth: 1,
  marginBlockStart: 1,
  paddingBlockStart: 1,
});

const mobileSignInIconContainerClassName = cx(
  circle({
    backgroundColor: "bg.muted",
    size: 7,
  }),
  css({
    alignItems: "center",
    display: "inline-flex",
    flexShrink: 0,
    justifyContent: "center",
  }),
);

const mobileAccountRowClassName = hstack({
  justifyContent: "space-between",
  paddingBlock: 3,
  paddingInline: 3,
});

const mobileAccountLabelClassName = css({
  color: "text.secondary",
  fontSize: "sm",
  fontWeight: "semibold",
});

const MobileSignInLink = () => (
  <NavLink
    borderPosition="left"
    className={cx(
      mobileNavigationLinkClassName,
      css({ justifyContent: "flex-start" }),
    )}
    href="/signin"
    matchStrategy="endsWith"
    prefetch
  >
    <span className={mobileSignInIconContainerClassName}>
      <FaSignInAlt
        aria-hidden="true"
        className={cx(square({ size: 4 }), css({ color: "text.secondary" }))}
      />
    </span>
    <span>Sign in</span>
  </NavLink>
);

const MobileAuthAction = () => (
  <HasAuthSuspense fallback={<MobileSignInLink />}>
    {(auth) =>
      auth.isAuthenticated ? (
        <div className={mobileAccountRowClassName}>
          <span className={mobileAccountLabelClassName}>Account</span>
          <AuthButtons>
            <Avatar user={{ image: auth.user.image, name: auth.user.name }} />
          </AuthButtons>
        </div>
      ) : (
        <MobileSignInLink />
      )
    }
  </HasAuthSuspense>
);

const Navbar = () => (
  <ViewTransition name="main-header">
    <header className={navbarClassName}>
      <nav
        aria-label="Primary navigation"
        className={cx(between(), css({ position: "relative" }))}
      >
        <Link href="/" prefetch>
          <div
            className={css({
              cursor: "pointer",
              paddingInlineStart: 4,
              position: "relative",
            })}
          >
            <Image
              alt="PrintForge Logo"
              className={css({
                blockSize: 10,
                display: { base: "none", md: "block" },
                inlineSize: 200,
              })}
              height={520}
              priority
              src="/printforge-logo.svg"
              unoptimized
              width={2470}
            />
            <Image
              alt="PrintForge Logo"
              className={square({
                display: { base: "block", md: "none" },
                size: 10,
              })}
              height={172}
              priority
              src="/printforge-logo-icon.svg"
              unoptimized
              width={199}
            />
          </div>
        </Link>
        <div className={hstack({ gap: { base: 2, sm: 4 } })}>
          <OfflineBanner />
          <ul className={desktopNavigationClassName}>
            <NavLinkListItem href="/3d-models">3D Models</NavLinkListItem>
            <NavLinkListItem href="/about" prefetch>
              About
            </NavLinkListItem>
            <li className={css({ fontSize: "sm", placeSelf: "center" })}>
              <HasAuthSuspense fallback={<AuthButtonsSkeleton />}>
                {(auth) =>
                  auth.isAuthenticated ? (
                    <AuthButtons>
                      <Avatar
                        user={{ image: auth.user.image, name: auth.user.name }}
                      />
                    </AuthButtons>
                  ) : (
                    <SignInNavLink />
                  )
                }
              </HasAuthSuspense>
            </li>
          </ul>
          <button
            aria-controls={MOBILE_NAVIGATION_ID}
            aria-label="Navigation menu"
            className={mobileMenuButtonClassName}
            popoverTarget={MOBILE_NAVIGATION_ID}
            type="button"
          >
            <svg
              aria-hidden="true"
              className={cx("mobile-menu-glyph", mobileMenuGlyphClassName)}
              viewBox="0 0 24 24"
            >
              <line data-line="top" x1="5" x2="19" y1="7" y2="7" />
              <line data-line="middle" x1="5" x2="19" y1="12" y2="12" />
              <line data-line="bottom" x1="5" x2="19" y1="17" y2="17" />
            </svg>
          </button>
        </div>
      </nav>
      <div
        className={mobilePopoverClassName}
        id={MOBILE_NAVIGATION_ID}
        popover="auto"
      >
        <div className={mobilePopoverHeaderClassName}>
          <span className={mobilePopoverTitleClassName}>Navigate</span>
          <span aria-hidden="true" className={mobilePopoverStatusClassName}>
            <span className={mobilePopoverStatusDotClassName} />
            Offline
          </span>
        </div>
        <nav aria-label="Mobile navigation">
          <ul className={mobileNavigationListClassName}>
            <li>
              <NavLink
                borderPosition="left"
                className={mobileNavigationLinkClassName}
                href="/3d-models"
              >
                <span>3D Models</span>
                <FaArrowUpRightFromSquare
                  aria-hidden="true"
                  className={mobileNavigationIconClassName}
                />
              </NavLink>
            </li>
            <li>
              <NavLink
                borderPosition="left"
                className={mobileNavigationLinkClassName}
                href="/about"
                prefetch
              >
                <span>About</span>
                <FaArrowUpRightFromSquare
                  aria-hidden="true"
                  className={mobileNavigationIconClassName}
                />
              </NavLink>
            </li>
            <li className={mobileAuthItemClassName}>
              <MobileAuthAction />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  </ViewTransition>
);

export { Navbar };
