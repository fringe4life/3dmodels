import { headers } from "next/headers";
import { connection } from "next/server";
import { cache } from "react";
import { auth } from "@/lib/auth";
import type {
  AuthenticatedState,
  UnauthenticatedState,
  UserAuthState,
} from "@/lib/auth/types";
import { tryCatch } from "@/utils/try-catch";

const getUser = cache(async (): Promise<UserAuthState> => {
  await connection();
  const { data: session, error } = await tryCatch(
    async () =>
      await auth.api.getSession({
        headers: await headers(),
      }),
  );

  if (error || !session?.user?.id) {
    return { isAuthenticated: false } satisfies UnauthenticatedState;
  }

  return {
    isAuthenticated: true,
    user: session.user,
  } satisfies AuthenticatedState;
});

export { getUser };
