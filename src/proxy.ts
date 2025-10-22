// biome-ignore lint/performance/noBarrelFile: recommended way to do this
export { auth as proxy } from "@/lib/auth";

export const config = {
  matcher: ["/((?!api/auth|_next/static|_next/image|favicon.ico).*)"],
};
