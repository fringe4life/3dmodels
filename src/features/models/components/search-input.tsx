"use client";

import { debounce, defaultRateLimit, parseAsString, useQueryState } from "nuqs";
import {
  Activity,
  type ChangeEventHandler,
  type KeyboardEventHandler,
  useTransition,
} from "react";

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
    }),
  );

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const search = e.currentTarget.value;
    // Send immediate update if clearing the input, otherwise debounce
    startTransition(async () => {
      await setQuery(search || null, {
        limitUrlUpdates:
          search === "" ? defaultRateLimit : debounce(SEARCH_DEBOUNCE_DELAY),
      });
    });
  };

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      // Send immediate update on Enter key press
      startTransition(async () => {
        await setQuery(query || null, { limitUrlUpdates: defaultRateLimit });
      });
    }
  };

  return (
    <>
      <input
        autoComplete="off"
        className="absolute inset-0 w-full rounded-full border border-search-input bg-white py-3 pr-5 pl-5 text-sm placeholder-gray-500 focus:border-search-input focus:outline-none focus:ring-0 md:text-base"
        onChange={handleSearch}
        onKeyDown={handleKeyPress}
        placeholder="E.g. dragon"
        type="text"
        value={query || ""}
      />
      <Activity mode={isPending ? "visible" : "hidden"}>
        <div className="-translate-y-1/2 loading-dots absolute top-1/2 left-95/100 text-gray-500 text-sm">
          .
        </div>
      </Activity>
    </>
  );
}
