"use client";

import type { ErrorInfo } from "next/error";

const NavbarError = ({ unstable_retry }: ErrorInfo) => (
  <div className="flex items-center gap-4 p-4 md:flex-col md:items-start">
    <p className="text-gray-600 text-sm">Failed to load User</p>
    <button
      className="rounded-md bg-orange-accent px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-orange-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={() => unstable_retry()}
      type="button"
    >
      Try again
    </button>
  </div>
);

export default NavbarError;
