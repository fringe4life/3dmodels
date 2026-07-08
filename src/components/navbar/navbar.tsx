import { css } from "@styled-system/css";
import { between, hstack, square, stack } from "@styled-system/patterns";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { NavLinkListItem } from "@/components/nav-link/nav-link-list-item";
import { AuthButtons } from "@/features/auth/components/auth-buttons";
import { AuthButtonsSkeleton } from "@/features/auth/components/auth-buttons-skeleton";
import { Avatar } from "@/features/auth/components/avatar";
import { HasAuthSuspense } from "@/features/auth/components/has-auth";
import { SignInNavLink } from "@/features/auth/components/sign-in-nav-link";

const Navbar = () => (
  <ViewTransition name="main-header">
    <header
      className={stack({
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
      })}
    >
      <nav className={between()}>
        <Link href="/">
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
        <ul className={hstack({ gap: { base: 2, sm: 4 } })}>
          <NavLinkListItem href="/3d-models">3D Models</NavLinkListItem>
          <NavLinkListItem href="/about">About</NavLinkListItem>
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
      </nav>
    </header>
  </ViewTransition>
);

export { Navbar };
