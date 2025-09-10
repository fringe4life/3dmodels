import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import type { Model } from "@/db/schema";
import { models } from "@/db/schema";

export const getAllModels = cache(async (): Promise<Model[]> => {
  "use cache";

  cacheTag("models");
  cacheLife("hours");

  try {
    return await db.select().from(models);
  } catch (error) {
    console.error("Error fetching all models:", error);
    throw error;
  }
});
