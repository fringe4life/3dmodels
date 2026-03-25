import Image from "next/image";
import Link from "next/link";
import { NavLinkListItem } from "@/components/nav-link";
import { AuthButtons } from "@/features/auth/components/auth-buttons";
import { AuthButtonsSkeleton } from "@/features/auth/components/auth-buttons-skeleton";
import { Avatar } from "@/features/auth/components/avatar";
import { HasAuthSuspense } from "@/features/auth/components/has-auth";

// Main component with HasAuthSuspense boundary
const Navbar = () => (
  <header className="nav-scroll sticky inset-bs-0 inset-x-0 z-20 border-gray-400/20 border-b bg-white/65 backdrop-blur">
    <nav className="flex items-center justify-between px-2 py-4 pe-2 sm:px-6">
      <Link href="/">
        <div className="relative cursor-pointer ps-4">
          {/* Desktop Logo */}
          <Image
            alt="PrintForge Logo"
            className="inline-50 hidden md:block"
            height={42}
            priority
            src="/printforge-logo.svg"
            unoptimized
            width={200}
          />
          {/* Mobile Logo */}
          <Image
            alt="PrintForge Logo"
            className="inline-10 block-10.5 block md:hidden"
            height={42}
            priority
            src="/printforge-logo-icon.svg"
            unoptimized
            width={40}
          />
        </div>
      </Link>
      <ul className="flex items-center gap-2 sm:gap-5">
        <NavLinkListItem href="/3d-models">3D Models</NavLinkListItem>
        <NavLinkListItem href="/about">About</NavLinkListItem>
        <li className="place-self-center text-sm">
          <HasAuthSuspense fallback={<AuthButtonsSkeleton />}>
            {(user, isAuthenticated) => (
              <AuthButtons isAuthenticated={isAuthenticated}>
                <Avatar user={{ name: user?.name, image: user?.image }} />
              </AuthButtons>
            )}
          </HasAuthSuspense>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navbar;
