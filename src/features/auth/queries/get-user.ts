import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "@/lib/auth";
import { tryCatch } from "@/utils/try-catch";
import type { UserAuthState } from "../types";

const getUser = cache(async (): Promise<UserAuthState> => {
  const { data: session, error } = await tryCatch(
    async () =>
      await auth.api.getSession({
        headers: await headers(),
      }),
  );

  if (error || !session?.user?.id) {
    return { isAuthenticated: false };
  }

  return { isAuthenticated: true, user: session.user };
});

export { getUser };
