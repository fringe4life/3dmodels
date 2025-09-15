"use client";

import { parseAsString, useQueryState } from "nuqs";
import { useActionState, useTransition } from "react";
import {
  performSearch,
  type SearchActionState,
} from "@/features/models/actions/search-actions";

const initialState: SearchActionState = {
  message: "",
  error: "",
  results: 0,
  query: "",
};

export function EnhancedSearchInput() {
  const [isPending, startTransition] = useTransition();
  const [state, formAction, pending] = useActionState(
    performSearch,
    initialState,
  );

  // nuqs for URL state management
  const [query, setQuery] = useQueryState(
    "query",
    parseAsString.withDefault("").withOptions({
      history: "push",
      shallow: true,
    }),
  );

  const handleSearch = (value: string) => {
    startTransition(() => {
      setQuery(value || null);
    });
  };

  const handleFormSubmit = (formData: FormData) => {
    // Update URL state first
    const searchValue = formData.get("query") as string;
    setQuery(searchValue || null);

    // Then trigger server action
    formAction(formData);
  };

  return (
    <div className="w-full space-y-4 px-5 md:max-w-xl md:px-0">
      {/* Real-time search input with nuqs */}
      <div>
        <input
          autoComplete="off"
          className="w-full rounded-full border border-[#606060] bg-white py-3 pr-5 pl-5 text-sm placeholder-gray-500 focus:border-[#606060] focus:outline-none focus:ring-0 md:text-base"
          disabled={isPending}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="E.g. dragon"
          type="text"
          value={query || ""}
        />
        {isPending && (
          <div className="mt-2 text-gray-500 text-sm">Updating search...</div>
        )}
      </div>

      {/* Form-based search with useActionState */}
      <form action={handleFormSubmit} className="flex gap-2">
        <input
          className="flex-1 rounded-full border border-[#606060] bg-white py-3 pr-5 pl-5 text-sm placeholder-gray-500 focus:border-[#606060] focus:outline-none focus:ring-0 md:text-base"
          defaultValue={query || ""}
          name="query"
          placeholder="Search with server action..."
          type="text"
        />
        <button
          className="rounded-full bg-black px-6 py-3 font-medium text-sm text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={pending}
          type="submit"
        >
          {pending ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Action state feedback */}
      {state.message && (
        <div className="rounded-lg border border-green-200 bg-green-50 p-3">
          <p className="text-green-800 text-sm">{state.message}</p>
          {state.results !== undefined && (
            <p className="mt-1 text-green-600 text-xs">
              Results: {state.results} models
            </p>
          )}
        </div>
      )}

      {state.error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3">
          <p className="text-red-800 text-sm">{state.error}</p>
        </div>
      )}
    </div>
  );
}
