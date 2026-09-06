import { fallback, picklist } from "valibot";
import { DEFAULT_LIMIT, LIMITS } from "@/lib/pagination/constants";

export const limitItemSchema = fallback(picklist(LIMITS), DEFAULT_LIMIT);
