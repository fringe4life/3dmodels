import { db } from "@/db";
import { categories } from "@/db/schema/models";
import { tryCatch } from "@/utils/try-catch";

export const getAllCategorySlugs = async (): Promise<
  { categoryName: string }[]
> => {
  const { data, error } = await tryCatch(
    async () => await db.select({ slug: categories.slug }).from(categories),
  );

  if (!data || error) {
    throw new Error("Failed to fetch category slugs from database");
  }

  return data.map((category) => ({ categoryName: category.slug }));
};
