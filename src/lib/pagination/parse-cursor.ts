import { type ModelId, parseModelId } from "@/db/brands";

const parsePaginationCursor = (cursor: string): ModelId | undefined =>
  parseModelId(cursor);

export { parsePaginationCursor };
