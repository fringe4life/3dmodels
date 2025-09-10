import { unstable_cacheLife as cacheLife } from "next/cache";

/**
 * Cached function to get the current year
 * This prevents issues with new Date() in Server Components during static generation
 * The cache will be invalidated once per day
 */
export async function getCurrentYear() {
  "use cache";
  cacheLife("days");

  return new Date().getFullYear();
}
