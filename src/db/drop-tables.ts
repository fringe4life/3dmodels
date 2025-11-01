/** biome-ignore-all lint/suspicious/noConsole: a command to clear db */
import { neon } from "@neondatabase/serverless";
import "dotenv/config";

const sql = neon(process.env.DATABASE_URL as string);

await sql`DROP TABLE IF EXISTS "likes" CASCADE`;
await sql`DROP TABLE IF EXISTS "models" CASCADE`;
await sql`DROP TABLE IF EXISTS "categories" CASCADE`;
await sql`DROP TABLE IF EXISTS "session" CASCADE`;
await sql`DROP TABLE IF EXISTS "account" CASCADE`;
await sql`DROP TABLE IF EXISTS "authenticator" CASCADE`;
await sql`DROP TABLE IF EXISTS "user" CASCADE`;
await sql`DROP TABLE IF EXISTS "verificationToken" CASCADE`;
console.log("✓ All tables dropped successfully");
process.exit(0);
