"use server";

import { headers } from "next/headers";
import { redirect, unstable_rethrow } from "next/navigation";
import { auth } from "@/lib/auth";
import type { Maybe } from "@/types";
import { fromErrorToActionState } from "@/utils/to-action-state/to-action-state";
import type { ActionState } from "@/utils/to-action-state/types";

const signInGithubAction = async (
  _: Maybe<ActionState>,
  _formData: FormData,
): Promise<ActionState> => {
  try {
    const result = await auth.api.signInSocial({
      body: {
        callbackURL: "/",
        provider: "github",
      },
      headers: await headers(),
    });

    if (!result.url) {
      throw new Error("Failed to start GitHub sign-in");
    }

    throw redirect(result.url);
  } catch (error) {
    unstable_rethrow(error);

    return fromErrorToActionState(error);
  }
};

export { signInGithubAction };
