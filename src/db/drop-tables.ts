/** biome-ignore-all lint/suspicious/noConsole: a command to clear db */
import { neon } from "@neondatabase/serverless";
import "dotenv/config";
import { env } from "@/utils/env";

const sql = neon(env.DATABASE_URL);

await sql`DROP TABLE IF EXISTS "likes" CASCADE`;
await sql`DROP TABLE IF EXISTS "models" CASCADE`;
await sql`DROP TABLE IF EXISTS "categories" CASCADE`;
console.log("✓ All tables dropped successfully");
process.exit(0);
