import { cacheLife, cacheTag } from "next/cache";
import { cache } from "react";
import { db } from "@/db";
import type { Model } from "@/db/schema/models";
import { models } from "@/db/schema/models";
import { tryCatch } from "@/utils/try-catch";

export const getAllModels = cache(async (): Promise<Model[]> => {
  "use cache";

  cacheTag("models");
  cacheLife("hours");

  const { data, error } = await tryCatch(
    async () => await db.select().from(models),
  );
  if (error || !data) {
    return [];
  }
  return data;
});
