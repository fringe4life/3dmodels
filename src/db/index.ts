import { attachDatabasePool } from "@vercel/functions";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { ENV } from "varlock/env";
import { relations } from "./schema/relations";

// Prefer Neon *pooled* URL (`ep-…-pooler.…`) in DATABASE_URL.
// connectionTimeoutMillis: Neon cold start can exceed pg default (~5s) → ETIMEDOUT in build.
// max > 1: Fluid Compute runs concurrent work on one instance; max: 1 queues/timeouts.
// min: 1 keeps a warm client; idleTimeout closes extras before suspend (attachDatabasePool).
const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
  connectionTimeoutMillis: 30_000,
  idleTimeoutMillis: 30_000,
  max: 10,
  min: 1,
});

// Fluid compute: reuse pool across warm invocations; close idle clients before suspend
attachDatabasePool(pool);

export const db = drizzle({
  client: pool,
  jit: true,
  relations,
});
