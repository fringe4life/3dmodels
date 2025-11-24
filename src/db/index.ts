import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

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

// Create the SQL client
const sql = neon(process.env.DATABASE_URL as string);

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
export const db = drizzle(sql, { schema });
