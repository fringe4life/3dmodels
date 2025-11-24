import { neonConfig, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import { account, session, user, verification } from "./schema/auth";
import { likes } from "./schema/likes";
import { categories, models } from "./schema/models";
import {
  accountRelations,
  categoriesRelations,
  likesRelations,
  modelsRelations,
  sessionRelations,
  userRelations,
} from "./schema/relations";

neonConfig.webSocketConstructor = ws;
// Create the Pool client (WebSocket-based for transaction support)
const pool = new Pool({ connectionString: process.env.DATABASE_URL as string });

// Combine all schemas
const schema = {
  user,
  session,
  account,
  verification,
  categories,
  models,
  likes,
  userRelations,
  sessionRelations,
  accountRelations,
  categoriesRelations,
  modelsRelations,
  likesRelations,
};

// Create the Drizzle database instance
export const db = drizzle({ client: pool, schema });
