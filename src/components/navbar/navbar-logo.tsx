import { css } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import Image from "next/image";
import Link from "next/link";

const logoLinkClassName = css({
  cursor: "pointer",
  position: "relative",
});

const wordmarkLogoClassName = css({
  blockSize: 10,
  display: { base: "none", xs: "block" },
  inlineSize: 200,
});

const iconLogoClassName = square({
  display: { base: "block", xs: "none" },
  size: 10,
});

const NavbarLogo = () => (
  <Link aria-label="Go to the printforge homepage" href="/" prefetch>
    <div className={logoLinkClassName}>
      <Image
        alt="PrintForge Logo"
        className={wordmarkLogoClassName}
        height={520}
        priority
        src="/printforge-logo.svg"
        unoptimized
        width={2470}
      />
      <Image
        alt="PrintForge Logo"
        className={iconLogoClassName}
        height={172}
        priority
        src="/printforge-logo-icon.svg"
        unoptimized
        width={199}
      />
    </div>
  </Link>
);

export { NavbarLogo };
