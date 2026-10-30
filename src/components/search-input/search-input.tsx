"use client";

import { css } from "@styled-system/css";
import { square } from "@styled-system/patterns";
import { usePathname, useRouter } from "next/navigation";
import { createSerializer } from "nuqs";
import {
  Activity,
  addTransitionType,
  type ChangeEventHandler,
  type KeyboardEventHandler,
  useEffect,
  useId,
  useRef,
  useTransition,
} from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { SeedFromSearchParam } from "@/components/scripts/seed-from-search-param";
import { useSyncInputToSearchParam } from "@/hooks/use-sync-search-param";
import { processListingUrlSearchParams, resetPager } from "@/lib/listing-url";
import {
  cursorPaginationParsers,
  queryParser,
} from "@/lib/pagination/search-params";
import { SearchInputTransition } from "./search-input-transition";

const SEARCH_DEBOUNCE_DELAY_MS = 250;

type TransitionType = "search-clear" | "search-debounce" | "search-submit";

/** Client write path: merge onto location.search so sort/limit survive (shared with listingHref cleanup). */
const serializeSearchWrite = createSerializer(
  {
    ...cursorPaginationParsers,
    ...queryParser,
  },
  {
    processUrlSearchParams: processListingUrlSearchParams,
  },
);

const SearchInput = () => {
  const router = useRouter();
  const pathname = usePathname();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPending, startTransition] = useTransition();

  useSyncInputToSearchParam(inputRef, "query");

  useEffect(
    () => () => {
      if (debounceTimerRef.current !== null) {
        clearTimeout(debounceTimerRef.current);
      }
    },
    [],
  );

  const replaceSearch = (search: string, transitionType: TransitionType) => {
    const href = serializeSearchWrite(`${pathname}${window.location.search}`, {
      query: search,
      ...resetPager,
    });
    startTransition(() => {
      addTransitionType(transitionType);
      router.replace(href, { scroll: false });
    });
  };

  const scheduleSearch = (
    search: string,
    transitionType: TransitionType,
    debounceMs: number,
  ) => {
    if (debounceTimerRef.current !== null) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    if (debounceMs <= 0) {
      replaceSearch(search, transitionType);
      return;
    }
    debounceTimerRef.current = setTimeout(() => {
      debounceTimerRef.current = null;
      replaceSearch(search, transitionType);
    }, debounceMs);
  };

  const handleSearch: ChangeEventHandler<HTMLInputElement> = (e) => {
    const rawValue = e.currentTarget.value;
    const search = rawValue.trim().toLowerCase() || "";
    if (search === "") {
      scheduleSearch(search, "search-clear", 0);
      return;
    }
    scheduleSearch(search, "search-debounce", SEARCH_DEBOUNCE_DELAY_MS);
  };

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key !== "Enter") {
      return;
    }
    const search = e.currentTarget.value.trim().toLowerCase() || "";
    scheduleSearch(search, "search-submit", 0);
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
        id={inputId}
        name="search"
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
        placeholder="E.g. dragon"
        ref={inputRef}
        suppressHydrationWarning
        type="text"
      />
      <SeedFromSearchParam param="query" targetId={inputId} />
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
