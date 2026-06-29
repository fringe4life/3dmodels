import { db } from "@/db";
import type { DbCategory } from "@/db/schema/models";
import { tryCatch } from "@/utils/try-catch";

export const getAllCategories = async (): Promise<DbCategory[]> => {
  const { data, error } = await tryCatch(() => db.query.categories.findMany());
  if (!data || error) {
    throw new Error("Failed to load categories");
  }
  return data;
};
