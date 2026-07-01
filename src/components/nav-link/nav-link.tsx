"use client";

import { css, cx } from "@styled-system/css";
import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Suspend } from "../suspend";
import { NavLinkSkeleton } from "./nav-link-skeleton";
import type {
  BorderPosition,
  MatchStrategy,
  NextLinkComponentProps,
} from "./types";

export interface NavLinkProps
  extends NextLinkComponentProps,
    Partial<BorderPosition>,
    Partial<MatchStrategy> {
  href: Route;
  /** Reserved width for the Suspense fallback; defaults to string `children` length. */
  skeletonCh?: number;
}

const getSkeletonCh = (children: ReactNode, skeletonCh?: number) => {
  if (skeletonCh !== undefined) {
    return skeletonCh;
  }

  if (typeof children === "string") {
    return children.length;
  }
};

const NavLinkInner = ({
  href,
  children,
  matchStrategy = "includes",
  borderPosition = "bottom",
  className,
  prefetch = true,
  ...linkProps
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive =
    matchStrategy === "endsWith"
      ? pathname.endsWith(href)
      : pathname.includes(href);

  return (
    <Link
      {...linkProps}
      aria-current={isActive ? "page" : undefined}
      className={cx(
        className,
        css({
          fontSize: "sm",
          fontWeight: "medium",
          color: {
            base: "black",
            _hover: "brand.muted !important",
          },
          transitionProperty:
            "color,background-color,border-color,text-decoration-color",
          transitionDuration: "normal",
          _currentPage: {
            color: "brand",
            fontWeight: "semibold",
            borderColor: "currentColor",
          },
          '&:not([data-border-bottom])[aria-current="page"]': {
            md: {
              borderInlineStartWidth: "2px",
              borderInlineStartStyle: "solid",
              paddingInlineStart: 3,
            },
          },
          "&[data-border-bottom]": {
            paddingBlock: "2",
          },
          '&[data-border-bottom][aria-current="page"]': {
            md: {
              borderBlockEndWidth: "2px",
              borderBlockEndStyle: "solid",
            },
          },
        }),
      )}
      {...(borderPosition === "bottom" && { "data-border-bottom": true })}
      href={href}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
};

/**
 * Client nav link with active-route styles. `usePathname()` runs inside an
 * internal `<Suspense>` boundary so shared nav can prerender with cacheComponents.
 */
const NavLink = ({
  skeletonCh,
  children,
  borderPosition = "bottom",
  className,
  ...linkProps
}: NavLinkProps) => {
  const textCh = getSkeletonCh(children, skeletonCh);

  return (
    <Suspend
      fallback={
        <NavLinkSkeleton
          borderPosition={borderPosition}
          ch={textCh ?? 8}
          className={className}
          variant={textCh === undefined ? "icon" : "text"}
        />
      }
    >
      <NavLinkInner
        borderPosition={borderPosition}
        className={className}
        {...linkProps}
      >
        {children}
      </NavLinkInner>
    </Suspend>
  );
};

export { NavLink };
