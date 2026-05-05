import Link from "next/link";
import { css } from "../../../../styled-system/css";

interface AuthFooterLinkProps {
  href: string;
  label: string;
  prompt: string;
}

const AuthFooterLink = ({ prompt, label, href }: AuthFooterLinkProps) => (
  <div
    className={css({
      marginBlockStart: 6,
      textAlign: "center",
      fontSize: "sm",
    })}
  >
    <span className={css({ color: "gray.600" })}>{prompt} </span>
    <Link
      className={css({
        fontWeight: "medium",
        color: { base: "orangeAccent", _hover: "orangeAccent/80" },
        transitionProperty: "colors",
        transitionDuration: "normal",
      })}
      href={href}
    >
      {label}
    </Link>
  </div>
);

export { AuthFooterLink };
