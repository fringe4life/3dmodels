import type { LIMITS } from "@/features/pagination/constants";
import type { List, Maybe } from "@/types";

export interface Page {
  page: number;
}

export interface Count {
  count: number;
}

interface PaginationMetadata extends Page, Count {
  hasNextPage: boolean;
}

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
export interface PaginatedResultSuccess<T> extends PaginationMetadataObject {
  items: T[];
  type: "success";
}

export interface RawPaginatedResult<T> extends ListObject<T> {
  itemsCount: Maybe<number>;
}

export type LimitItem = (typeof LIMITS)[number];

export interface Limit {
  limit: LimitItem;
}

export interface PaginationType extends Page, Limit {}

export interface PaginationMetadataObject {
  metadata: PaginationMetadata;
}
