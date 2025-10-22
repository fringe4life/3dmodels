import { auth } from "@/lib/auth";

export type HasAuth = {
  userId: string | undefined;
  isAuthenticated: boolean;
};

export async function hasAuth<TReturn>(
  fn: (session: HasAuth) => Promise<TReturn>,
) {
  const session = await auth();
  return fn({
    userId: session?.user?.id,
    isAuthenticated: !!session?.user,
  });
}
