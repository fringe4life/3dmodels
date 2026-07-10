/** biome-ignore-all lint/suspicious/noConsole: a command to clear db */
import { Pool } from "pg";
import { ENV } from "varlock/env";

const pool = new Pool({ connectionString: ENV.DATABASE_URL });

await pool.query(`DROP TABLE IF EXISTS "likes" CASCADE`);
await pool.query(`DROP TABLE IF EXISTS "models" CASCADE`);
await pool.query(`DROP TABLE IF EXISTS "categories" CASCADE`);
await pool.end();
console.log("✓ All tables dropped successfully");
