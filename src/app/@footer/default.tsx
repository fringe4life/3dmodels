import { css, cx } from "@styled-system/css";
import { grid, hstack, siteContainer } from "@styled-system/patterns";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import {
  MOBILE_SIGN_IN_LINK,
  PRIMARY_NAV_LINKS,
} from "@/components/navbar/constants";
import { HasAuthSuspense } from "@/lib/auth/has-auth";
import { getCurrentYear } from "@/lib/date";

const footerClassName = css({
  backgroundColor: "bg.subtle",
  borderBlockStartColor: "border.subtle",
  borderBlockStartWidth: "1px",
  color: "text.secondary",
});

const footerInnerClassName = cx(
  siteContainer(),
  grid({
    alignItems: "center",
    columnGap: 5,
    gridTemplateColumns: "1fr auto 1fr",
    minBlockSize: "5.5rem",
    mobileDown: {
      flexWrap: "wrap",
      gap: 3,
      minBlockSize: "auto",
      paddingBlock: 4,
    },
    tabletDown: {
      display: "flex",
      justifyContent: "space-between",
      minBlockSize: "4.875rem",
    },
  }),
);

const footerLogoClassName = css({
  blockSize: "auto",
  display: "block",
  inlineSize: "142px",
  mobileDown: {
    inlineSize: "116px",
  },
  tabletDown: {
    inlineSize: "125px",
  },
});

const footerNavigationContainerClassName = css({
  gridColumn: 2,
  justifySelf: "center",
  mobileDown: {
    inlineSize: "full",
    order: 3,
  },
});

const footerNavigationClassName = hstack({
  gap: "30px",
  mobileDown: {
    gap: 5,
  },
  tabletDown: {
    gap: 4.5,
  },
});

const footerLinkClassName = css({
  _focusVisible: {
    outline: "3px solid token(colors.brand.ring)",
    outlineOffset: 1,
  },
  _hover: {
    color: "text.primary",
    textDecoration: "underline",
    textDecorationColor: "brand",
    textUnderlineOffset: "5px",
  },
  alignItems: "center",
  color: "text.secondary",
  display: "inline-flex",
  fontSize: "sm",
  fontWeight: "semibold",
  minBlockSize: 11,
  mobileDown: {
    fontSize: "xs",
  },
  whiteSpace: "nowrap",
});

const footerCopyrightClassName = css({
  color: "text.muted",
  fontSize: "sm",
  justifySelf: "end",
  margin: 0,
  mobileDown: {
    fontSize: "xs",
  },
  whiteSpace: "nowrap",
});

const FooterDefault = async () => {
  const currentYear = await getCurrentYear();

  return (
    <ViewTransition name="main-footer">
      <footer className={footerClassName}>
        <div className={footerInnerClassName}>
          <Link aria-label="Go to the PrintForge homepage" href="/" prefetch>
            <Image
              alt=""
              className={footerLogoClassName}
              height={520}
              src="/printforge-logo.svg"
              unoptimized
              width={2470}
            />
          </Link>
          <nav
            aria-label="Footer navigation"
            className={footerNavigationContainerClassName}
          >
            <ul
              className={cx(
                footerNavigationClassName,
                css({ listStyle: "none" }),
              )}
            >
              {PRIMARY_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    className={footerLinkClassName}
                    href={link.href}
                    prefetch={"prefetch" in link ? link.prefetch : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <HasAuthSuspense
                fallback={
                  <li>
                    <Link
                      className={footerLinkClassName}
                      href={MOBILE_SIGN_IN_LINK.href}
                      prefetch={MOBILE_SIGN_IN_LINK.prefetch}
                    >
                      {MOBILE_SIGN_IN_LINK.label}
                    </Link>
                  </li>
                }
              >
                {(auth) =>
                  auth.isAuthenticated ? null : (
                    <li>
                      <Link
                        className={footerLinkClassName}
                        href={MOBILE_SIGN_IN_LINK.href}
                        prefetch={MOBILE_SIGN_IN_LINK.prefetch}
                      >
                        {MOBILE_SIGN_IN_LINK.label}
                      </Link>
                    </li>
                  )
                }
              </HasAuthSuspense>
            </ul>
          </nav>
          <p className={footerCopyrightClassName}>
            &copy; {currentYear} PrintForge
          </p>
        </div>
      </footer>
    </ViewTransition>
  );
};

export default FooterDefault;
