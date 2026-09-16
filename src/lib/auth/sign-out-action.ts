"use server";

import { headers } from "next/headers";
import { RedirectType, redirect } from "next/navigation";
import { returnServerError } from "next-safe-action";
import { auth } from "@/lib/auth";
import { actionClient, formActionInput } from "@/lib/safe-action";
import { tryCatch } from "@/utils/try-catch";

const signOutAction = actionClient
  .inputSchema(formActionInput)
  .stateAction(async () => {
    const { data, error } = await tryCatch(
      async () =>
        await auth.api.signOut({
          headers: await headers(),
        }),
    );

    if (error || !data) {
      returnServerError("Failed to sign out");
    }

    redirect("/", RedirectType.replace);
  });

export { signOutAction };
