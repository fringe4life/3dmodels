/** biome-ignore-all lint/suspicious/noConsole: a command to clear db */
import { sql } from "drizzle-orm";
import { db } from "@/db";

await db.run(sql`PRAGMA foreign_keys = OFF`);
await db.run(sql`DROP TABLE IF EXISTS likes`);
await db.run(sql`DROP TABLE IF EXISTS models`);
await db.run(sql`DROP TABLE IF EXISTS categories`);
await db.run(sql`DROP TABLE IF EXISTS session`);
await db.run(sql`DROP TABLE IF EXISTS account`);
await db.run(sql`DROP TABLE IF EXISTS verification`);
await db.run(sql`DROP TABLE IF EXISTS user`);
await db.run(sql`DROP TABLE IF EXISTS __drizzle_migrations`);
await db.run(sql`PRAGMA foreign_keys = ON`);
console.log("✓ All tables dropped successfully");
