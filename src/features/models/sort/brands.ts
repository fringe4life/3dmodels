import { brand, type InferOutput, picklist, pipe } from "valibot";
import { SORT_VALUES } from "@/features/models/sort/constants";
import type { SortList } from "./constants";

const sortSchema = pipe(picklist(SORT_VALUES), brand("Sort"));

export type Sort = InferOutput<typeof sortSchema>;

export function toSort(value: SortList): Sort {
  return value as Sort;
}
