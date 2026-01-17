import type { LIMITS } from "@/features/pagination/constants";
import type { List, Maybe } from "@/types";

export interface Page {
  page: number;
}

export interface PaginationMetadata extends Page {
  count: number;
  hasNextPage: boolean;
}

export interface ListObject<T> {
  items: List<T>;
}

export type PaginatedResult<T> =
  | PaginatedResultError
  | PaginatedResultEmpty
  | PaginatedResultSuccess<T>;

export interface PaginatedResultError {
  type: "error";
  message: string;
}

export interface PaginatedResultEmpty {
  type: "empty";
  message: string;
}
export interface PaginatedResultSuccess<T> extends PaginationMetadataObject {
  type: "success";
  items: T[];
}

export interface RawPaginationAccess<T> {
  getItems: () => Promise<List<T>>;
  getItemsCount: () => Promise<Maybe<number>>;
}

export interface RawPaginatedResult<T> extends ListObject<T> {
  itemsCount: Maybe<number>;
}

export type LimitItem = (typeof LIMITS)[number];

export interface PaginationType extends Page {
  limit: LimitItem;
}

interface PaginationMetadataObject {
  metadata: PaginationMetadata;
}

export interface PaginationProps extends PaginationMetadataObject {}

export interface PaginationOffsetTransitionProps<T extends Page> {
  children: React.ReactNode;
  metadata: T;
}
