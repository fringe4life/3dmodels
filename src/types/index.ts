import type { SearchParams } from "nuqs/server";
import type { Model } from "@/db/schema/models";

/**
 * Generic type helper for adding like status to any model type
 * @template T - The base model type
 */
export type WithLike<T> = T & { hasLiked: boolean };

/**
 * Specific type for Model with like status
 * This can be used when you need the full Model type with like information
 */
export type ModelWithLike = WithLike<Model>;

/**
 * Used to handle potential failures. It can be used to return a value or null.
 */
export type Maybe<T> = T | null | undefined;

export type PaginationMetadata = {
  count: number;
  hasNextPage: boolean;
  nextCursor: Maybe<string>;
};

export type PaginatedResult<T> = {
  list: Maybe<T[]>;
  metadata: PaginationMetadata;
};

export type SearchParamsProps = {
  searchParams: Promise<SearchParams>;
};
