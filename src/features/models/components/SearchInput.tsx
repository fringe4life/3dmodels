"use client";

import { debounce, defaultRateLimit, parseAsString, useQueryState } from "nuqs";
import { type KeyboardEventHandler, useTransition } from "react";

export function SearchInput() {
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useQueryState(
    "query",
    parseAsString.withDefault("").withOptions({
      history: "push",
      shallow: false,
      startTransition,
      // Debounce URL updates by 250ms to avoid excessive server requests
      limitUrlUpdates: debounce(250),
    }),
  );

  const handleSearch = (value: string) => {
    // Send immediate update if clearing the input, otherwise debounce
    setQuery(value || null, {
      limitUrlUpdates: value === "" ? defaultRateLimit : debounce(250),
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
        type="text"
        placeholder="E.g. dragon"
        autoComplete="off"
        value={query || ""}
        onChange={(e) => handleSearch(e.target.value)}
        onKeyDown={handleKeyPress}
        className="w-full rounded-full border border-[#606060] bg-white py-3 pr-5 pl-5 text-sm placeholder-gray-500 focus:border-[#606060] focus:outline-none focus:ring-0 md:text-base"
        disabled={isPending}
      />
      {isPending && (
        <div className="mt-2 text-gray-500 text-sm">Searching...</div>
      )}
    </div>
  );
}
