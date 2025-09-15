import Link from "next/link";
import NavLink from "@/app/_navigation/nav-link";
import Stream from "@/components/streamable";
import { auth } from "@/lib/auth";
import AuthButtons from "./auth-buttons";

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
              alt="PrintForge Logo"
              className="hidden h-auto w-50 md:block"
              height={42}
              src="/printforge-logo.svg"
              width={200}
            />
            {/* Mobile Logo */}
            <img
              alt="PrintForge Logo"
              className="block h-auto w-10 md:hidden"
              height={42}
              src="/printforge-logo-icon.svg"
              width={40}
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
              alt="PrintForge Logo"
              className="hidden h-auto w-50 md:block"
              height={42}
              src="/printforge-logo.svg"
              width={200}
            />
            {/* Mobile Logo */}
            <img
              alt="PrintForge Logo"
              className="block h-auto w-10 md:hidden"
              height={42}
              src="/printforge-logo-icon.svg"
              width={40}
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

// Main component with Stream boundary
export default function Navbar() {
  return (
    <Stream fallback={<NavbarSkeleton />} value={NavbarContent()}>
      {(content) => content}
    </Stream>
  );
}
