import type { LIMITS } from "@/features/pagination/constants";
import type { List, Maybe } from "@/types";

export interface Page {
  page: number;
}

interface PaginationMetadata extends Page {
  count: number;
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

export interface PaginationType extends Page {
  limit: LimitItem;
}

export interface PaginationMetadataObject {
  metadata: PaginationMetadata;
}
