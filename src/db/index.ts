import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import { env } from "@/utils/env";
import { verification } from "./schema/auth";
import { relations } from "./schema/relations";
import { schema as relationsSchema } from "./schema/schema";

neonConfig.webSocketConstructor = ws;
// Create the Pool client (WebSocket-based for transaction support)
const pool = new Pool({ connectionString: env.DATABASE_URL });

// Combine all schemas
const schema = {
  ...relationsSchema,
  verification,

  ...relations,
};

// Create the Drizzle database instance
export const db = drizzle({ client: pool, schema });
