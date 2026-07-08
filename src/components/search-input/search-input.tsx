"use client";

import { css } from "@styled-system/css";
import { square } from "@styled-system/patterns";
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
        aria-label="Search models"
        autoComplete="off"
        className={css({
          _focus: { outline: "none", ring: "0" },
          _focusVisible: { outline: "2", outlineColor: "searchInput" },
          _placeholder: { color: "gray.500" },
          backgroundColor: "white",
          borderColor: { _focusWithin: "searchInput", base: "searchInput/20" },
          borderWidth: 1,
          color: "text.muted",
          fontSize: { base: "sm" },
          inlineSize: "full",
          inset: "0",
          paddingBlock: 3,
          paddingInline: 5,
          position: "absolute",
          rounded: "full",
          transitionDuration: "normal",
          transitionProperty: "colors",
        })}
        name="search"
        onChange={handleSearch}
        onKeyDown={handleKeyPress}
        placeholder="E.g. dragon"
        type="text"
        value={query || ""}
      />
      <Activity mode={isPending ? "visible" : "hidden"}>
        <SearchInputTransition>
          <AiOutlineLoading3Quarters
            className={square({
              animation: "spin",
              color: "text.muted",
              fontSize: "sm",
              insetBlockStart: "50%",
              insetInlineEnd: 5,
              position: "absolute",
              size: 5,
              translate: "0 -50%",
            })}
          />
        </SearchInputTransition>
      </Activity>
    </>
  );
};

export { SearchInput };
