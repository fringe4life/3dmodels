"use server";

import { revalidateTag } from "next/cache";

// biome-ignore lint/suspicious/useAwait: server action
export async function revalidateCategoriesAction() {
  revalidateTag("categories", "max");
}
