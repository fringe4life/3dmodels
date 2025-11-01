import { neon } from "@neondatabase/serverless";
import { config } from "dotenv";
config();

const sql = neon(process.env.DATABASE_URL);
await sql`DROP TABLE IF EXISTS "likes" CASCADE`;
await sql`DROP TABLE IF EXISTS "models" CASCADE`;
await sql`DROP TABLE IF EXISTS "categories" CASCADE`;
await sql`DROP TABLE IF EXISTS "session" CASCADE`;
await sql`DROP TABLE IF EXISTS "account" CASCADE`;
await sql`DROP TABLE IF EXISTS "authenticator" CASCADE`;
await sql`DROP TABLE IF EXISTS "user" CASCADE`;
await sql`DROP TABLE IF EXISTS "verification_token" CASCADE`;
console.log("✓ All tables dropped successfully");
