import { headers } from "next/headers";
import { cache } from "react";
import { auth } from "@/lib/auth";
import type { Maybe } from "@/types";
import { tryCatch } from "@/utils/try-catch";
import type { User } from "../types";

const getUser = cache(async (): Promise<Maybe<User>> => {
  const { data: session, error } = await tryCatch(
    async () =>
      await auth.api.getSession({
        headers: await headers(),
      }),
  );

  if (error || !session) {
    return null;
  }

  return session.user;
});

export { getUser };
