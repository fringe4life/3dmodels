"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { returnServerError } from "next-safe-action";
import { auth } from "@/lib/auth";
import { actionClient, formActionInput } from "@/lib/safe-action";

const signInGithubAction = actionClient
  .inputSchema(formActionInput)
  .stateAction(async () => {
    const result = await auth.api.signInSocial({
      body: {
        callbackURL: "/",
        provider: "github",
      },
      headers: await headers(),
    });

    if (!result.url) {
      returnServerError("Failed to start GitHub sign-in");
    }

    redirect(result.url);
  });

export { signInGithubAction };
