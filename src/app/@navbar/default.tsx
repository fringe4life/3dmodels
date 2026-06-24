import { css } from "@styled-system/css";
import { between, hstack, square, stack } from "@styled-system/patterns";
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
                blockSize: 10,
                inlineSize: 200,
              })}
              height={520}
              priority
              src="/printforge-logo.svg"
              unoptimized
              width={2470}
            />
            {/* Mobile Logo */}
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
        <ul className={hstack({ gap: { base: 2, sm: 4 } })}>
          <NavLinkListItem href="/3d-models">3D Models</NavLinkListItem>
          <NavLinkListItem href="/about">About</NavLinkListItem>
          <li className={css({ placeSelf: "center", fontSize: "sm" })}>
            <HasAuthSuspense fallback={<AuthButtonsSkeleton />}>
              {(auth) => (
                <AuthButtons isAuthenticated={auth.isAuthenticated}>
                  <Avatar
                    user={
                      auth.isAuthenticated
                        ? { name: auth.user.name, image: auth.user.image }
                        : {}
                    }
                  />
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
