import { cacheTag } from "next/cache";
import { headers } from "next/headers";
import type { ServerSession } from "@/features/auth/types";
import { auth } from "@/lib/auth";
import type { Maybe } from "@/types";
import { tryCatch } from "@/utils/try-catch";

const getSession = async (): Promise<Maybe<ServerSession>> => {
  "use cache: private";
  cacheTag("session");

  const { data: session, error } = await tryCatch(
    async () =>
      await auth.api.getSession({
        headers: await headers(),
      }),
  );

  if (error || !session) {
    return null;
  }

  return session;
};

export default getSession;
