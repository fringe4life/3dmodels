import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { ENV } from "varlock/env";
import { relations } from "./schema/relations";

neonConfig.webSocketConstructor = globalThis.WebSocket;
// Create the Pool client (WebSocket-based for transaction support)
const pool = new Pool({ connectionString: ENV.DATABASE_URL });

// Create the Drizzle database instance
export const db = drizzle({
  client: pool,
  relations,
  jit: true,
});
