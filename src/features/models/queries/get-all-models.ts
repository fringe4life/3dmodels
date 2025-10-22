import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import { models } from "@/db/schema/models";

export const getAllModels = cache(async (): Promise<Model[]> => {
  "use cache";

  cacheTag("models");
  cacheLife("hours");

  try {
    return await db.select().from(models);
  } catch {
    throw new Error("Failed to fetch all models");
  }
});
