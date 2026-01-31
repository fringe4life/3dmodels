import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { env } from "@/utils/env";
import { schema as relationsSchema } from "./schema";
import { relations } from "./schema/relations";

neonConfig.webSocketConstructor = globalThis.WebSocket;
// Create the Pool client (WebSocket-based for transaction support)
const pool = new Pool({ connectionString: env.DATABASE_URL });

// Combine all schemas
const schema = {
  ...relationsSchema,
  ...relations,
};

// Create the Drizzle database instance
export const db = drizzle({ client: pool, schema, relations });
