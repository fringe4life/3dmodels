import Link from "next/link";
import NavLink from "@/app/components/NavLink";
import PFLogo from "@/public/printforge-logo.svg";
import PFLogoIcon from "@/public/printforge-logo-icon.svg";

export default function Navbar() {
  return (
    <header className="w-full bg-white">
      <nav className="flex justify-between px-6 py-4 pr-2">
        <Link href="/">
          <div className="relative cursor-pointer">
            {/* Desktop Logo */}
            <img
              src={PFLogo.src}
              alt="PrintForge Logo"
              className="hidden h-auto w-[200px] md:block"
            />
            {/* Mobile Logo */}
            <img
              src={PFLogoIcon.src}
              alt="PrintForge Logo"
              className="block h-auto w-[40px] md:hidden"
            />
          </div>
        </Link>
        <ul className="flex items-center gap-1.5">
          <NavLink href="/3d-models">3D Models</NavLink>
          <NavLink href="/about">About</NavLink>
        </ul>
      </nav>
    </header>
  );
}
