import { cache } from "react";
import { db } from "@/db";
import { models } from "@/db/schema/models";

export const getAllModelIds = cache(async (): Promise<{ id: string }[]> => {
  try {
    const result = await db.select({ id: models.id }).from(models);
    return result.map((model) => ({ id: model.id.toString() }));
  } catch {
    throw new Error("Failed to fetch model IDs");
  }
});
