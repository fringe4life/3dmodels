import type { Maybe } from "@/types";
import type { LIMITS } from "./pagination-search-params";

type List<T> = Maybe<T[]>;
export interface PaginationMetadata {
  count: number;
  hasNextPage: boolean;
  nextCursor: Maybe<string>;
}

export interface PaginatedResult<T> extends PaginationMetadataObject {
  list: List<T>;
}

export interface DatabaseQueryResult<T> {
  items: List<T>;
  totalRows: Maybe<{ value: number }[]>;
}

export type LimitItem = (typeof LIMITS)[number];

export interface PaginationType {
  page: number;
  limit: LimitItem;
}

interface PaginationMetadataObject {
  metadata: PaginationMetadata;
}

export interface PaginationProps extends PaginationMetadataObject {
  pagination: PaginationType;
  setPagination: (pagination: PaginationType) => void;
}

export interface NuqsPaginationProps extends PaginationMetadataObject {}
