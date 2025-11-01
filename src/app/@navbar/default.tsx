import Link from "next/link";
import NavLink from "@/app/_navigation/nav-link";
import HasAuth from "@/components/has-auth";
import AuthButtons from "../_navigation/auth-buttons";

type NavbarAuthProps = {
  isAuthenticated: boolean;
  user: {
    name?: string | null;
    email?: string | null;
  } | null;
};

// Main component with Stream boundary
export default function Navbar() {
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
            <HasAuth<NavbarAuthProps, void>
              Component={AuthButtons}
              fallback={
                <div className="h-8 w-20 animate-pulse rounded bg-gray-200" />
              }
              processUser={(session, isAuthenticated) => {
                const user = session
                  ? {
                      name: session.user?.name,
                      email: session.user?.email,
                    }
                  : null;
                return { isAuthenticated, user };
              }}
            />
          </li>
        </ul>
      </nav>
    </header>
  );
}
