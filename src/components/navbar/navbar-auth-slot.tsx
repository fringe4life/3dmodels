import { HasAuthSuspense } from "@/lib/auth/has-auth";
import { AuthButtons } from "./auth-buttons";
import { AuthButtonsSkeleton } from "./auth-buttons-skeleton";
import { Avatar } from "./avatar";
import { MobileAuthAction } from "./mobile-nav-auth";
import { SignInNavLink } from "./sign-in-nav-link";

interface NavbarAuthSlotProps {
  variant: "desktop" | "mobile";
}

const NavbarAuthSlot = ({ variant }: NavbarAuthSlotProps) => {
  if (variant === "mobile") {
    return <MobileAuthAction />;
  }

  return (
    <HasAuthSuspense fallback={<AuthButtonsSkeleton />}>
      {(auth) =>
        auth.isAuthenticated ? (
          <AuthButtons transitionName="navbar-sign-out-desktop">
            <Avatar user={{ image: auth.user.image, name: auth.user.name }} />
          </AuthButtons>
        ) : (
          <SignInNavLink />
        )
      }
    </HasAuthSuspense>
  );
};

export { NavbarAuthSlot };
