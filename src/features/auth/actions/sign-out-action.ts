"use server";

import { headers } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { fromErrorToActionState } from "@/utils/to-action-state";
import { tryCatch } from "@/utils/try-catch";

// Server action for sign-out
export const signOutAction = async () => {
  // Call Better Auth sign-out API
  const { data, error } = await tryCatch(
    async () =>
      await auth.api.signOut({
        headers: await headers(),
      }),
  );

  if (error || !data) {
    return fromErrorToActionState(error);
  }

  // Invalidate session cache
  // invalidateSessionCache();

  // Redirect to home page
  throw redirect("/", RedirectType.replace);
};
