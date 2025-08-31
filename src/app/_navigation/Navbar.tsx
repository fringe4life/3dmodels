"use client";

import Link from "next/link";
import NavLink from "@/app/_navigation/NavLink";
import { useAuth } from "@/hooks/useAuth";


export default function Navbar() {
  const { isAuthenticated, signIn, signOut, session } = useAuth();

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
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-gray-700">
                  {session?.user?.name || session?.user?.email}
                </span>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="rounded-md px-4 py-2 text-gray-700 transition-colors hover:text-orange-accent"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => signIn()}
                className="rounded-md px-4 py-2 text-gray-700 transition-colors hover:text-orange-accent"
              >
                Sign In
              </button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
