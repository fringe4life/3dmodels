import type { NavbarNavLinkConfig } from "./types";

export const MOBILE_NAVIGATION_ID = "mobile-navigation";

export const PRIMARY_NAV_LINKS = [
  { href: "/3d-models", label: "3D Models" },
  { href: "/about", label: "About", prefetch: true },
] as const satisfies readonly NavbarNavLinkConfig[];

export const MOBILE_SIGN_IN_LINK = {
  href: "/signin",
  label: "Sign in",
  matchStrategy: "endsWith",
  prefetch: true,
} as const satisfies NavbarNavLinkConfig;
