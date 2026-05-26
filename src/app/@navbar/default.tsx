import { css } from "@styled-system/css";
import { between, hstack, stack } from "@styled-system/patterns";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { NavLinkListItem } from "@/components/nav-link";
import { AuthButtons } from "@/features/auth/components/auth-buttons";
import { AuthButtonsSkeleton } from "@/features/auth/components/auth-buttons-skeleton";
import { Avatar } from "@/features/auth/components/avatar";
import { HasAuthSuspense } from "@/features/auth/components/has-auth";

// Main component with HasAuthSuspense boundary
const Navbar = () => (
  <ViewTransition name="main-header">
    <header
      className={stack({
        position: "sticky",
        insetBlockStart: 0,
        insetInline: 0,
        zIndex: "20",
        borderBottomWidth: 2,
        borderBottomColor: "gray.400/20",
        borderBottomStyle: "solid",
        backgroundColor: "white/65",
        backdropBlur: "sm",
        transitionProperty: "translate,border-radius",
        transitionDuration: "normal",
        transitionTimingFunction: "soft",
        _supportsScroll: {
          animationName: "navAnimation",
          animationTimingFunction: "linear",
          animationFillMode: "both",
          animationTimeline: "scroll()",
          animationRange: "100px 200px",
        },
        paddingInline: { base: 2, sm: 6 },
        paddingBlock: 4,
      })}
    >
      <nav className={between()}>
        <Link href="/">
          <div
            className={css({
              position: "relative",
              cursor: "pointer",
              paddingInlineStart: 4,
            })}
          >
            {/* Desktop Logo */}
            <Image
              alt="PrintForge Logo"
              className={css({
                display: { base: "none", md: "block" },
              })}
              height={42}
              priority
              src="/printforge-logo.svg"
              unoptimized
              width={200}
            />
            {/* Mobile Logo */}
            <Image
              alt="PrintForge Logo"
              className={css({
                display: { base: "block", md: "none" },
              })}
              height={42}
              priority
              src="/printforge-logo-icon.svg"
              unoptimized
              width={40}
            />
          </div>
        </Link>
        <ul className={hstack({ gap: { base: 2, sm: 4 } })}>
          <NavLinkListItem href="/3d-models">3D Models</NavLinkListItem>
          <NavLinkListItem href="/about">About</NavLinkListItem>
          <li className={css({ placeSelf: "center", fontSize: "sm" })}>
            <HasAuthSuspense fallback={<AuthButtonsSkeleton />}>
              {(user, isAuthenticated) => (
                <AuthButtons isAuthenticated={isAuthenticated}>
                  <Avatar user={{ name: user?.name, image: user?.image }} />
                </AuthButtons>
              )}
            </HasAuthSuspense>
          </li>
        </ul>
      </nav>
    </header>
  </ViewTransition>
);

export default Navbar;
