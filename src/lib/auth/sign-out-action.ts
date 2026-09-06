"use server";

import { headers } from "next/headers";
import { RedirectType, redirect, unstable_rethrow } from "next/navigation";
import { auth } from "@/lib/auth";
import type { Maybe } from "@/types";
import { fromErrorToActionState } from "@/utils/to-action-state/to-action-state";
import type { ActionState } from "@/utils/to-action-state/types";
import { tryCatch } from "@/utils/try-catch";

const signOutAction = async (
  _: Maybe<ActionState>,
  _formData: FormData,
): Promise<ActionState> => {
  try {
    const { data, error } = await tryCatch(
      async () =>
        await auth.api.signOut({
          headers: await headers(),
        }),
    );

    if (error || !data) {
      return fromErrorToActionState(error);
    }

    throw redirect("/", RedirectType.replace);
  } catch (error) {
    unstable_rethrow(error);

    return fromErrorToActionState(error);
  }
};

export { signOutAction };
