import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import { schema } from "@/db/schema";
import { env } from "@/utils/env";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  // experimental: {
  //   joins: true,
  // },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  baseURL: process.env.NEXT_PUBLIC_SITE_URL,
  basePath: "/auth",
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      // redirectURI: "http://localhost:3000/api/auth/callback/github",
      redirectURI: "https://3dmodels-ecru.vercel.app/api/auth/callback/github",
    },
  },
  secret: env.AUTH_SECRET,
  plugins: [nextCookies()], // Must be last plugin
});
