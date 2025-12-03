import { cacheTag } from "next/cache";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import type { Maybe } from "@/types";
import { tryCatch } from "@/utils/try-catch";
import type { ServerUser } from "../types";

const getSession = async (): Promise<Maybe<ServerUser>> => {
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

  return session.user;
};

export default getSession;
