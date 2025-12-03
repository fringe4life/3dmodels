"use server";

import { updateTag } from "next/cache";
import { getAllCategories } from "../queries/get-all-categories";

export async function revalidateCategoriesAction() {
  await getAllCategories();
  updateTag("categories");
}
