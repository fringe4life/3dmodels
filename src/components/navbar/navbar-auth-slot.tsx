import { AuthButtons } from "@/features/auth/components/auth-buttons";
import { AuthButtonsSkeleton } from "@/features/auth/components/auth-buttons-skeleton";
import { Avatar } from "@/features/auth/components/avatar";
import { HasAuthSuspense } from "@/features/auth/components/has-auth";
import { SignInNavLink } from "@/features/auth/components/sign-in-nav-link";
import { MobileAuthAction } from "./mobile-nav-auth";

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
          <AuthButtons>
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
