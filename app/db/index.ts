import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Enable connection caching for better performance
neonConfig.fetchConnectionCache = true;

// Create the SQL client
const sql = neon(process.env.DATABASE_URL as string);

// Create the Drizzle database instance
export const db = drizzle(sql, { schema });

// Export the schema for use in other files
export * from "./schema";
