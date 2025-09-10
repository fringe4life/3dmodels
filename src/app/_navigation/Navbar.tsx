import Link from "next/link";
import { Suspense } from "react";
import NavLink from "@/app/_navigation/NavLink";
import { auth } from "@/lib/auth";
import AuthButtons from "./AuthButtons";

// Server component that fetches auth state
async function NavbarContent() {
  const session = await auth();
  const isAuthenticated = !!session;

  return (
    <header className="w-full bg-white">
      <nav className="flex justify-between px-6 py-4 pr-2">
        <Link href="/">
          <div className="relative cursor-pointer">
            {/* Desktop Logo */}
            <img
              src="/printforge-logo.svg"
              alt="PrintForge Logo"
              className="hidden h-auto w-50 md:block"
            />
            {/* Mobile Logo */}
            <img
              src="/printforge-logo-icon.svg"
              alt="PrintForge Logo"
              className="block h-auto w-10 md:hidden"
            />
          </div>
        </Link>
        <ul className="flex items-center gap-1.5">
          <NavLink href="/3d-models">3D Models</NavLink>
          <NavLink href="/about">About</NavLink>
          <li className="text-sm">
            <AuthButtons
              isAuthenticated={isAuthenticated}
              user={session?.user}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}

// Loading skeleton for the navbar
function NavbarSkeleton() {
  return (
    <header className="w-full bg-white">
      <nav className="flex justify-between px-6 py-4 pr-2">
        <Link href="/">
          <div className="relative cursor-pointer">
            {/* Desktop Logo */}
            <img
              src="/printforge-logo.svg"
              alt="PrintForge Logo"
              className="hidden h-auto w-50 md:block"
            />
            {/* Mobile Logo */}
            <img
              src="/printforge-logo-icon.svg"
              alt="PrintForge Logo"
              className="block h-auto w-10 md:hidden"
            />
          </div>
        </Link>
        <ul className="flex items-center gap-1.5">
          <NavLink href="/3d-models">3D Models</NavLink>
          <NavLink href="/about">About</NavLink>
          <li className="text-sm">
            <div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
          </li>
        </ul>
      </nav>
    </header>
  );
}

// Main component with Suspense boundary
export default function Navbar() {
  return (
    <Suspense fallback={<NavbarSkeleton />}>
      <NavbarContent />
    </Suspense>
  );
}
