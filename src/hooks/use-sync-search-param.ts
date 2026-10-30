"use client";

import { type RefObject, useLayoutEffect, useState } from "react";

const locationSearchListeners = new Set<() => void>();

let nativePushState: History["pushState"] | null = null;
let nativeReplaceState: History["replaceState"] | null = null;

const notifyLocationSearchListeners = () => {
  for (const listener of locationSearchListeners) {
    listener();
  }
};

const ensureHistoryPatched = () => {
  if (nativePushState !== null) {
    return;
  }
  nativePushState = window.history.pushState.bind(window.history);
  nativeReplaceState = window.history.replaceState.bind(window.history);

  window.history.pushState = (...args: Parameters<History["pushState"]>) => {
    const result = nativePushState?.(...args);
    notifyLocationSearchListeners();
    return result;
  };
  window.history.replaceState = (
    ...args: Parameters<History["replaceState"]>
  ) => {
    const result = nativeReplaceState?.(...args);
    notifyLocationSearchListeners();
    return result;
  };
  window.addEventListener("popstate", notifyLocationSearchListeners);
};

const teardownHistoryPatchIfIdle = () => {
  if (locationSearchListeners.size > 0 || nativePushState === null) {
    return;
  }
  window.removeEventListener("popstate", notifyLocationSearchListeners);
  if (nativePushState) {
    window.history.pushState = nativePushState;
  }
  if (nativeReplaceState) {
    window.history.replaceState = nativeReplaceState;
  }
  nativePushState = null;
  nativeReplaceState = null;
};

/**
 * Subscribe to URL search changes without `useSearchParams` (static-shell safe).
 * Shared history wrappers — safe with multiple subscribers / non-LIFO cleanup.
 */
const subscribeToLocationSearch = (onChange: () => void): (() => void) => {
  ensureHistoryPatched();
  locationSearchListeners.add(onChange);
  return () => {
    locationSearchListeners.delete(onChange);
    teardownHistoryPatchIfIdle();
  };
};

interface SyncInputOptions {
  /** Full path+search of the last href this control wrote; skip overwrite for that commit. */
  lastWrittenHrefRef: RefObject<string | null>;
  /** Cancel a pending debounced write when another navigation wins. */
  onForeignNavigation?: () => void;
}

/**
 * Re-sync a write-only control from the URL after soft navigations / Activity.
 * Does not subscribe via useSearchParams (cacheComponents static shell safe).
 * Skips applying the URL when this control's own `router.replace` just committed,
 * so in-flight typing (spaces, case, extra chars) is not clobbered.
 */
const useSyncInputToSearchParam = (
  ref: RefObject<HTMLInputElement | null>,
  param: string,
  { lastWrittenHrefRef, onForeignNavigation }: SyncInputOptions,
) => {
  useLayoutEffect(() => {
    const sync = () => {
      const el = ref.current;
      if (!el) {
        return;
      }
      const currentHref = `${window.location.pathname}${window.location.search}`;
      if (lastWrittenHrefRef.current === currentHref) {
        return;
      }
      onForeignNavigation?.();
      lastWrittenHrefRef.current = null;
      const next = new URLSearchParams(window.location.search).get(param) ?? "";
      if (el.value !== next) {
        el.value = next;
      }
    };
    sync();
    return subscribeToLocationSearch(sync);
  }, [ref, param, lastWrittenHrefRef, onForeignNavigation]);
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
