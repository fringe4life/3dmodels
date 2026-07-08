import type { LIMITS } from "@/features/pagination/constants";
import type { List, Maybe, Prettify } from "@/types";

export interface Page {
  page: number;
}

export interface Count {
  count: number;
}

export interface HasNextPage {
  hasNextPage: boolean;
}

export interface HasPreviousPage {
  hasPreviousPage: boolean;
}

type PaginationMetadata = Prettify<Page & Count & HasNextPage>;

interface ListObject<T> {
  items: List<T>;
}

export type PaginatedResult<T> =
  | PaginatedResultError
  | PaginatedResultEmpty
  | PaginatedResultSuccess<T>;

export interface PaginatedResultError {
  message: string;
  type: "error";
}

export interface PaginatedResultEmpty {
  message: string;
  type: "empty";
}
export type PaginatedResultSuccess<T> = Prettify<
  PaginationMetadataObject & {
    items: T[];
    type: "success";
  }
>;

export type RawPaginatedResult<T> = Prettify<
  ListObject<T> & {
    itemsCount: Maybe<number>;
  }
>;

export type LimitItem = (typeof LIMITS)[number];

export interface Limit {
  limit: LimitItem;
}

export type PaginationType = Prettify<Page & Limit>;

export interface PaginationMetadataObject {
  metadata: PaginationMetadata;
}
