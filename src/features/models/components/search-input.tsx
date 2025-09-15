"use client";

import { debounce, defaultRateLimit, parseAsString, useQueryState } from "nuqs";
import { type KeyboardEventHandler, useTransition } from "react";

// Constants for debounce timing
const SEARCH_DEBOUNCE_DELAY = 250; // milliseconds

export function SearchInput() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useQueryState(
    "query",
    parseAsString.withDefault("").withOptions({
      history: "push",
      shallow: false,
      startTransition,
      // Debounce URL updates to avoid excessive server requests
      limitUrlUpdates: debounce(SEARCH_DEBOUNCE_DELAY),
    }),
  );

  const handleSearch = (value: string) => {
    // Send immediate update if clearing the input, otherwise debounce
    setQuery(value || null, {
      limitUrlUpdates:
        value === "" ? defaultRateLimit : debounce(SEARCH_DEBOUNCE_DELAY),
    });
  };

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      // Send immediate update on Enter key press
      setQuery(query || null, { limitUrlUpdates: defaultRateLimit });
    }
  };

  return (
    <div className="w-full px-5 md:max-w-xl md:px-0">
      <input
        autoComplete="off"
        className="w-full rounded-full border border-[#606060] bg-white py-3 pr-5 pl-5 text-sm placeholder-gray-500 focus:border-[#606060] focus:outline-none focus:ring-0 md:text-base"
        disabled={isPending}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="E.g. dragon"
        type="text"
        value={query || ""}
      />
      {isPending && (
        <div className="mt-2 text-gray-500 text-sm">Searching...</div>
      )}
    </div>
  );
}
