import { db } from "@/db";
import type { Category } from "@/db/schema/models";
import { tryCatch } from "@/utils/try-catch";

export const getAllCategories = async (): Promise<Category[]> => {
  const { data, error } = await tryCatch(() => db.query.categories.findMany());

  if (!data || error) {
    throw new Error("Failed to load categories");
  }

  return data;
};
