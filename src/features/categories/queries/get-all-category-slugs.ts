import { db } from "@/db";
import { tryCatch } from "@/utils/try-catch";
import type { CategoryName } from "../types";

export const getAllCategorySlugs = async (): Promise<CategoryName[]> => {
  const { data, error } = await tryCatch(() =>
    db.query.categories.findMany({
      columns: {
        slug: true,
      },
    }),
  );

  if (!data || error) {
    throw new Error("Failed to fetch category slugs from database");
  }

  return data.map((category) => ({ categoryName: category.slug }));
};
