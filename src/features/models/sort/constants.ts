export const SORT_VALUES = ["alphabetic", "popular", "recent"] as const;

export const DEFAULT_SORT = "alphabetic" as const;

export const SORT_LABELS = {
  alphabetic: "A-Z",
  popular: "Popular",
  recent: "Recent",
} as const satisfies Record<SortList, string>;

export type SortList = (typeof SORT_VALUES)[number];
