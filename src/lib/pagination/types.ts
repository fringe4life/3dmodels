import type { LIMITS } from "@/lib/pagination/constants";
import type { List, Prettify } from "@/types";

export type Direction = "forward" | "backward";

export type SortDirection = "asc" | "desc";

export interface HasNextPage {
  hasNextPage: boolean;
}

export interface HasPreviousPage {
  hasPreviousPage: boolean;
}

export type PaginationMetadata = Prettify<HasNextPage & HasPreviousPage>;

export interface PaginationMetadataObject {
  metadata: PaginationMetadata;
}

export interface Limit {
  limit: LimitItem;
}

export type LimitItem = (typeof LIMITS)[number];

export interface Cursor {
  cursor: string;
}

export interface DirectionState {
  direction: Direction;
}

export type PaginationType = Prettify<Limit & Cursor & DirectionState>;

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

export type PaginatedResult<T> =
  | PaginatedResultError
  | PaginatedResultEmpty
  | PaginatedResultSuccess<T>;

interface ListObject<T> {
  items: List<T>;
}

export type RawPaginatedResult<T> = ListObject<T>;

export interface Id {
  id: string;
}

export type ToPaginationParams<T> = Prettify<
  ListObject<T> & Limit & Cursor & Partial<DirectionState>
>;
