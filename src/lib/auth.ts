import "server-only";

import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";
import { openAPI } from "better-auth/plugins";
import { ENV } from "varlock/env";
import { db } from "@/db";
import { schema } from "@/db/schema";

/**
 * Runtime Better Auth instance (server-only).
 * Schema generation uses `auth.cli.config.ts` instead — do not import this file
 * from the CLI config path, and do not import `auth.cli.config` from app code.
 */
export const auth = betterAuth({
  advanced: { database: { joins: true } },
  basePath: "/api/auth",
  baseURL: ENV.NEXT_PUBLIC_SITE_URL,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  emailAndPassword: {
    autoSignIn: true,
    enabled: true,
  },
  plugins: [openAPI(), nextCookies()], // cookies must be last plugin to avoid issues with cache invalidation
  secret: ENV.BETTER_AUTH_SECRET,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
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
});
