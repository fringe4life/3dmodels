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
import { css } from "../../../styled-system/css";
import { square } from "../../../styled-system/patterns";
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
        className={css({
          inlineSize: "full",
          position: "absolute",
          inset: "0",
          rounded: "full",
          borderColor: { base: "searchInput/20", _focusWithin: "searchInput" },
          borderWidth: 1,
          backgroundColor: "white",
          paddingInline: 5,
          paddingBlock: 3,
          fontSize: { base: "sm" },
          color: "text.muted",
          transitionProperty: "colors",
          transitionDuration: "normal",
          _focus: { outline: "none", ring: "0" },
          _focusVisible: { outline: "2", outlineColor: "searchInput" },
          _placeholder: { color: "gray.500" },
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
              size: 5,
              position: "absolute",
              insetBlockStart: "50%",
              insetInlineEnd: 5,
              translate: "0 -50%",
              animation: "spin",
              color: "text.muted",
              fontSize: "sm",
            })}
          />
        </SearchInputTransition>
      </Activity>
    </>
  );
};

export { SearchInput };
