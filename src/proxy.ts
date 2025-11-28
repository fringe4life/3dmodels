import { getSessionCookie } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

// biome-ignore lint/suspicious/useAwait: recommended way to do this
export async function proxy(request: NextRequest) {
  const sessionCookie = getSessionCookie(request);
  // THIS IS NOT SECURE!
  if (sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup"], // Specify the routes the middleware applies to
};
