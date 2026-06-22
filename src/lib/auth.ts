import "server-only";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";
import { openAPI } from "better-auth/plugins";
import { ENV } from "varlock/env";
import { db } from "@/db";
import { schema } from "@/db/schema";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  baseURL: ENV.NEXT_PUBLIC_SITE_URL,
  basePath: "/api/auth",
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  // When adding a provider, add a matching `images.remotePatterns` entry in
  // `next.config.ts` for that provider's avatar host so `next/image` can load
  // `user.image` (see Avatar component).
  socialProviders: {
    github: {
      clientId: ENV.GITHUB_CLIENT_ID,
      clientSecret: ENV.GITHUB_CLIENT_SECRET,
      redirectURI: "https://3dmodels-ecru.vercel.app/api/auth/callback/github",
    },
  },
  secret: ENV.BETTER_AUTH_SECRET,
  plugins: [openAPI(), nextCookies()], // cookies must be last plugin to avoid issues with cache invalidation
});
