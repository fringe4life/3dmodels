import { cache } from "react";
import { getCategoryBySlug } from "./get-category-by-slug";

export const getDisplayNameFromSlug = cache(
  async (slug: string): Promise<string> => {
    "use cache";

    const category = await getCategoryBySlug(slug);
    return category?.displayName || "";
  },
);
