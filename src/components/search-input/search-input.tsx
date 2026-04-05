"use client";

import { debounce, defaultRateLimit, parseAsString, useQueryState } from "nuqs";
import {
  Activity,
  addTransitionType,
  type ChangeEventHandler,
  type KeyboardEventHandler,
  useTransition,
} from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SearchInputTransition } from "./search-input-transition";

// Constants for debounce timing
const SEARCH_DEBOUNCE_DELAY = 250; // milliseconds

const SearchInput = () => {
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
      addTransitionType(search === "" ? "search-clear" : "search-debounce");
      await setQuery(search || null, {
        limitUrlUpdates:
          search === "" ? defaultRateLimit : debounce(SEARCH_DEBOUNCE_DELAY),
      });
    });
  };

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      startTransition(async () => {
        addTransitionType("search-submit");
        await setQuery(query || null, { limitUrlUpdates: defaultRateLimit });
      });
    }
  };

  return (
    <>
      <input
        autoComplete="off"
        className="inline-full absolute inset-0 rounded-full border border-search-input/20 bg-white px-5 py-3 text-sm placeholder-gray-500 transition-colors duration-200 focus-within:border-search-input focus:outline-none focus:ring-0 focus-visible:outline-2 focus-visible:outline-search-input md:text-base"
        name="search"
        onChange={handleSearch}
        onKeyDown={handleKeyPress}
        placeholder="E.g. dragon"
        type="text"
        value={query || ""}
      />
      <Activity mode={isPending ? "visible" : "hidden"}>
        <SearchInputTransition>
          <AiOutlineLoading3Quarters className="block-5 absolute inset-bs-1/2 inset-e-5 aspect-square -translate-y-1/2 animate-spin text-gray-500 text-sm" />
        </SearchInputTransition>
      </Activity>
    </>
  );
};

export { SearchInput };
