import { parseAsStringLiteral } from "nuqs/server";
import { DEFAULT_SORT, SORT_VALUES } from "@/features/models/sort/constants";

/** Options applied at `useQueryStates` / serializer (`clearOnDefault`). */
export const sortParser =
  parseAsStringLiteral(SORT_VALUES).withDefault(DEFAULT_SORT);
