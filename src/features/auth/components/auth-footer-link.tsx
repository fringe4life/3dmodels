import { css } from "@styled-system/css";
import Link from "next/link";

interface AuthFooterLinkProps {
  href: string;
  label: string;
  prompt: string;
}

const AuthFooterLink = ({ prompt, label, href }: AuthFooterLinkProps) => (
  <div
    className={css({
      fontSize: "sm",
      marginBlockStart: 6,
      textAlign: "center",
    })}
  >
    <span className={css({ color: "gray.600" })}>{prompt} </span>
    <Link
      className={css({
        color: { _hover: "brand.hover", base: "brand" },
        fontWeight: "medium",
        transitionDuration: "normal",
        transitionProperty: "colors",
      })}
      href={href}
    >
      {label}
    </Link>
  </div>
);

export { AuthFooterLink };
