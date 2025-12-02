import Link from "next/link";
import NavLink from "@/components/nav-link";
import AuthButtons from "@/features/auth/components/auth-buttons";
import { HasAuthSuspense } from "@/features/auth/components/has-auth";

// Main component with Stream boundary
const Navbar = () => (
  <header className="bg-white">
    <nav className="flex justify-between px-6 py-4 pr-2">
      <Link href="/">
        <div className="relative cursor-pointer">
          {/* Desktop Logo */}
          <img
            alt="PrintForge Logo"
            className="hidden w-50 md:block"
            height={42}
            src="/printforge-logo.svg"
            width={200}
          />
          {/* Mobile Logo */}
          <img
            alt="PrintForge Logo"
            className="block w-10 md:hidden"
            height={42}
            src="/printforge-logo-icon.svg"
            width={40}
          />
        </div>
      </Link>
      <ul className="flex items-center gap-5">
        <NavLink href="/3d-models">3D Models</NavLink>
        <NavLink href="/about">About</NavLink>
        <li className="text-sm">
          <HasAuthSuspense
            fallback={
              <div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
            }
          >
            {(user, isAuthenticated) => (
              <AuthButtons isAuthenticated={isAuthenticated} user={user} />
            )}
          </HasAuthSuspense>
        </li>
      </ul>
    </nav>
  </header>
);

export default Navbar;
