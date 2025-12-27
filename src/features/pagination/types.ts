import type { LIMITS } from "@/features/pagination/constants";
import type { List, Maybe } from "@/types";

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
  totalRows: Maybe<number>;
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
