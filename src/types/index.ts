import type { SearchParams } from "nuqs/server";
/**
 * Used to handle potential failures. It can be used to return a value or null or undefined.
 */
export type Maybe<T> = T | null | undefined;
export type List<T> = Maybe<T[]>;

export interface SearchParamsProps {
  searchParams: Promise<SearchParams>;
}

export interface Children {
  children: React.ReactNode;
}
