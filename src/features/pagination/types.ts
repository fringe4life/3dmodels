import type { LIMITS } from "@/features/pagination/constants";
import type { List, Maybe } from "@/types";

export interface PaginationMetadata {
  count: number;
  hasNextPage: boolean;
  nextCursor: Maybe<string>;
}

export interface ListObject<T> {
  items: List<T>;
}

export interface PaginatedResult<T>
  extends PaginationMetadataObject,
    ListObject<T> {}

export interface RawPaginationAccess<T> {
  getItems: () => Promise<List<T>>;
  getItemsCount: () => Promise<Maybe<number>>;
}

export interface RawPaginationResult<T> extends ListObject<T> {
  itemsCount: Maybe<number>;
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
