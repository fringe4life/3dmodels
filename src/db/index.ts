import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import { verification } from "./schema/auth";
import { relations } from "./schema/relations";
import { schema as relationsSchema } from "./schema/schema";

neonConfig.webSocketConstructor = ws;
// Create the Pool client (WebSocket-based for transaction support)
const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });

// Combine all schemas
const schema = {
  ...relationsSchema,
  verification,
};

// Create the Drizzle database instance
export const db = drizzle({ client: pool, schema, relations });
