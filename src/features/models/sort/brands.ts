import { brand, type InferOutput, picklist, pipe } from "valibot";
import { SORT_VALUES } from "@/features/models/sort/constants";
import type { SortList } from "./constants";

const sortSchema = pipe(picklist(SORT_VALUES), brand("Sort"));

const SORT_VALUE_SET: ReadonlySet<string> = new Set(SORT_VALUES);

export type Sort = InferOutput<typeof sortSchema>;

export function isSortList(value: string): value is SortList {
  return SORT_VALUE_SET.has(value);
}

export function toSort(value: SortList): Sort {
  return value as Sort;
}
