import { css, cx } from "@styled-system/css";
import { circle, hstack, square } from "@styled-system/patterns";
import { FaSignInAlt } from "react-icons/fa";
import { HasAuthSuspense } from "@/lib/auth/has-auth";
import { AuthButtons } from "./auth-buttons";
import { Avatar } from "./avatar";
import { MOBILE_SIGN_IN_LINK } from "./constants";
import { MobileNavLink } from "./mobile-nav-link";

const mobileSignInIconContainerClassName = cx(
  circle({
    backgroundColor: "bg.muted",
    size: 7,
  }),
  css({
    alignItems: "center",
    display: "inline-flex",
    flexShrink: 0,
    justifyContent: "center",
  }),
);

const mobileAccountRowClassName = hstack({
  justifyContent: "space-between",
  paddingBlock: 3,
  paddingInline: 3,
});

const mobileAccountLabelClassName = css({
  color: "text.secondary",
  fontSize: "sm",
  fontWeight: "semibold",
});

const MobileSignInLink = () => (
  <MobileNavLink
    {...MOBILE_SIGN_IN_LINK}
    leadingIcon={
      <span className={mobileSignInIconContainerClassName}>
        <FaSignInAlt
          aria-hidden="true"
          className={cx(square({ size: 4 }), css({ color: "text.secondary" }))}
        />
      </span>
    }
    showExternalIcon={false}
  />
);

const MobileAuthAction = () => (
  <HasAuthSuspense fallback={<MobileSignInLink />}>
    {(auth) =>
      auth.isAuthenticated ? (
        <div className={mobileAccountRowClassName}>
          <span className={mobileAccountLabelClassName}>Account</span>
          <AuthButtons transitionName="navbar-sign-out-mobile">
            <Avatar user={{ image: auth.user.image, name: auth.user.name }} />
          </AuthButtons>
        </div>
      ) : (
        <MobileSignInLink />
      )
    }
  </HasAuthSuspense>
);

export { MobileAuthAction };
