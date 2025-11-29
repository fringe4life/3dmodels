import type { Maybe } from "@/types";

export type PaginationMetadata = {
  count: number;
  hasNextPage: boolean;
  nextCursor: Maybe<string>;
};

export type PaginatedResult<T> = {
  list: Maybe<T[]>;
  metadata: PaginationMetadata;
};

export type DatabaseQueryResult<T> = {
  items: Pick<PaginatedResult<T>, "list">["list"];
  totalRows: Maybe<{ value: number }[]>;
};
