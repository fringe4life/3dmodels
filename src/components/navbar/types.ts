import type { Route } from "next";
import type { NavLinkProps } from "@/components/nav-link/nav-link";

/** Serializable nav entry — no children/className; href must be a typed Route. */
export type NavbarNavLinkConfig = {
  label: string;
  href: Route;
} & Partial<
  Pick<
    NavLinkProps,
    | "prefetch"
    | "matchStrategy"
    | "borderPosition"
    | "closePopoverOnClick"
    | "skeletonCh"
  >
>;
