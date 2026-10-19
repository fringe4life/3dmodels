"use client";

import { css } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import { debounce, defaultRateLimit, useQueryStates } from "nuqs";
import {
  Activity,
  addTransitionType,
  type ChangeEventHandler,
  type KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { DEFAULT_CURSOR, DEFAULT_DIRECTION } from "@/lib/pagination/constants";
import {
  cursorPaginationParsers,
  queryParser,
} from "@/lib/pagination/search-params";
import { SearchInputTransition } from "./search-input-transition";

const SEARCH_DEBOUNCE_DELAY = 250;

type TransitionType = "search-clear" | "search-debounce" | "search-submit";

type LimitUrlUpdates = typeof defaultRateLimit;

const SearchInput = () => {
  const [isPending, startTransition] = useTransition();
  const [{ query }, setSearchState] = useQueryStates({
    ...cursorPaginationParsers,
    ...queryParser,
  });
  // Local draft so Enter can flush before the debounced URL write lands.
  const [draftQuery, setDraftQuery] = useState(query || "");
  const draftQueryRef = useRef(draftQuery);

  useEffect(() => {
    draftQueryRef.current = draftQuery;
  }, [draftQuery]);

  useEffect(() => {
    setDraftQuery(query || "");
  }, [query]);

  const changeSearch = (
    search: string,
    transitionType: TransitionType,
    debounceTime: LimitUrlUpdates,
  ) => {
    startTransition(async () => {
      addTransitionType(transitionType);
      await setSearchState(
        {
          cursor: DEFAULT_CURSOR,
          direction: DEFAULT_DIRECTION,
          query: search,
        },
        {
          limitUrlUpdates: debounceTime,
        },
      );
    });
  };

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const search = e.currentTarget.value.trim().toLowerCase() || "";
    setDraftQuery(e.currentTarget.value);
    const isEmpty = search === "";
    let debounceTime: LimitUrlUpdates = debounce(SEARCH_DEBOUNCE_DELAY);
    let transitionType: TransitionType = "search-debounce";
    if (isEmpty) {
      transitionType = "search-clear";
      debounceTime = defaultRateLimit;
    }
    changeSearch(search, transitionType, debounceTime);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      const search = draftQueryRef.current.trim().toLowerCase() || "";
      changeSearch(search, "search-submit", defaultRateLimit);
    }
  };
  return (
    <>
      <input
        aria-busy={isPending}
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
        onKeyDown={handleKeyDown}
        placeholder="E.g. dragon"
        type="text"
        value={draftQuery}
      />
      <Activity mode={isPending ? "visible" : "hidden"}>
        <SearchInputTransition>
          <AiOutlineLoading3Quarters
            aria-hidden="true"
            className={square({
              animationDuration: "slow",
              animationIterationCount: "infinite",
              animationName: "spin",
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
