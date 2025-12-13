"use client";

import type { ErrorProps } from "@/types";

const CategoriesError = ({ reset }: ErrorProps) => (
  <div className="flex items-center gap-4 p-4 md:flex-col md:items-start">
    <p className="text-gray-600 text-sm">Failed to load categories</p>
    <button
      className="rounded-md bg-orange-accent px-4 py-2 font-medium text-sm text-white transition-colors hover:bg-orange-accent/90 disabled:cursor-not-allowed disabled:opacity-50"
      onClick={reset}
      type="button"
    >
      Try again
    </button>
  </div>
);

export default CategoriesError;
