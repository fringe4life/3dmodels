import { uuidv7 } from "uuidv7";
import { type ModelId, toModelId } from "@/db/brands";

const UUID_V7_LENGTH = 36;

const createId = (): ModelId => toModelId(uuidv7());

export { createId, UUID_V7_LENGTH };
