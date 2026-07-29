import { drizzleAdapter } from "@better-auth/drizzle-adapter/relations-v2";
import { betterAuth } from "better-auth/minimal";
import { db } from "@/db";
import { schema } from "@/db/schema";

/**
 * CLI-only Better Auth config for `auth:generate`.
 * No secrets, OAuth creds, or runtime plugins — keep schema-affecting options
 * in sync with `auth.ts` (adapter provider, email/password, experimental joins,
 * and any plugin that defines tables/columns).
 */
export const auth = betterAuth({
  advanced: { database: { joins: true } },
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // Placeholder so `betterAuth()` constructs without loading ENV secrets.
  secret: "cli-generate-only",
});
