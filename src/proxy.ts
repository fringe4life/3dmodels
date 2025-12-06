import { getCookieCache } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export const proxy = async (request: NextRequest) => {
  const sessionCookie = await getCookieCache(request);
  // THIS IS NOT SECURE! it simply checks for whether there is a cookie
  if (sessionCookie) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
};

export const config = {
  matcher: ["/signin", "/signup"], // Specify the routes the middleware applies to
};
