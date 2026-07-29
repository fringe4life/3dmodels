import { parseAsStringLiteral } from "nuqs/server";
import { DEFAULT_SORT, SORT_VALUES } from "@/features/models/sort/constants";

export const sortParser = {
  sort: parseAsStringLiteral(SORT_VALUES).withDefault(DEFAULT_SORT),
};
