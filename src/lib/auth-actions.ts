"use server";

import { updateTag } from "next/cache";

/**
 * Server actions for authentication operations
 * These can be used to explicitly invalidate the session cache
 * when needed, though Better Auth's API routes handle this automatically
 * through cookie changes.
 */

// biome-ignore lint/suspicious/useAwait: Server actions must be async
export async function invalidateSessionCache() {
  updateTag("session");
}
