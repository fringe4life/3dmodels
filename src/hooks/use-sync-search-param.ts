"use client";

import { type RefObject, useLayoutEffect, useState } from "react";

/**
 * Subscribe to URL search changes without `useSearchParams` (static-shell safe).
 * Covers back/forward (`popstate`) and App Router `pushState` / `replaceState`.
 */
const subscribeToLocationSearch = (onChange: () => void): (() => void) => {
  window.addEventListener("popstate", onChange);

  const { pushState, replaceState } = window.history;
  const wrap =
    (original: typeof pushState) =>
    (...args: Parameters<typeof pushState>) => {
      const result = original.apply(window.history, args);
      onChange();
      return result;
    };

  window.history.pushState = wrap(pushState);
  window.history.replaceState = wrap(replaceState);

  return () => {
    window.removeEventListener("popstate", onChange);
    window.history.pushState = pushState;
    window.history.replaceState = replaceState;
  };
};

/**
 * Re-sync a write-only control from the URL after soft navigations / Activity.
 * Does not subscribe via useSearchParams (cacheComponents static shell safe).
 */
const useSyncInputToSearchParam = (
  ref: RefObject<HTMLInputElement | null>,
  param: string,
) => {
  useLayoutEffect(() => {
    const sync = () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      const next = new URLSearchParams(window.location.search).get(param) ?? "";
      if (el.value !== next) {
        el.value = next;
      }
    };
    sync();
    return subscribeToLocationSearch(sync);
  }, [ref, param]);
};

const useSyncSearchParamValue = (
  param: string,
  onSync: (value: string | null) => void,
) => {
  useLayoutEffect(() => {
    const sync = () => {
      onSync(new URLSearchParams(window.location.search).get(param));
    };
    sync();
    return subscribeToLocationSearch(sync);
  }, [param, onSync]);
};

/** Live `window.location.search` for building Link hrefs without useSearchParams. */
const useLocationSearch = (): string => {
  const [search, setSearch] = useState("");
  useLayoutEffect(() => {
    const sync = () => {
      setSearch(window.location.search);
    };
    sync();
    return subscribeToLocationSearch(sync);
  }, []);
  return search;
};

export {
  useLocationSearch,
  useSyncInputToSearchParam,
  useSyncSearchParamValue,
};
