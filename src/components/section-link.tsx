import { css, cx } from "@styled-system/css";
import type { Route } from "next";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { arrowRecipe } from "@/components/arrow-recipe";

/**
 * The one section-link style on the marketing pages: underlined label with the
 * orange rule and a compact arrow that only moves while the link is hovered or
 * focused (`group`). The arrow recipe needs the `group` marker to fire.
 */
const sectionLinkClassName = cx(
  "group",
  css({
    _focusVisible: {
      outline: "3px solid token(colors.brand.ring)",
      outlineOffset: 1,
    },
    _hover: {
      color: "brand",
    },
    alignItems: "center",
    color: "text.primary",
    display: "inline-flex",
    fontSize: "sm",
    fontWeight: "semibold",
    gap: 2,
    inlineSize: "fit-content",
    minBlockSize: 11,
    textDecoration: "underline",
    textDecorationColor: "brand",
    textUnderlineOffset: "4px",
    whiteSpace: "nowrap",
  }),
);

interface SectionLinkProps {
  children: React.ReactNode;
  className?: string;
  href: Route;
}

const SectionLink = ({ children, className, href }: SectionLinkProps) => (
  <Link className={cx(sectionLinkClassName, className)} href={href} prefetch>
    <span>{children}</span>
    <FaArrowRight
      aria-hidden="true"
      className={arrowRecipe({
        direction: "right",
        distance: "compact",
        size: "sm",
      })}
    />
  </Link>
);

export { SectionLink };
