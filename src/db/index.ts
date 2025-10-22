import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { accounts, sessions, users, verificationTokens } from "./schema/auth";

import { likes } from "./schema/likes";

import { models } from "./schema/models";

import {
  categoriesRelations,
  likesRelations,
  modelsRelations,
} from "./schema/relations";

// Create the SQL client
const sql = neon(process.env.DATABASE_URL as string);

// Combine all schemas
const schema = {
  ...sessions,
  ...users,
  ...verificationTokens,
  ...accounts,
  ...likes,
  ...models,
  ...categoriesRelations,
  ...modelsRelations,
  ...likesRelations,
};

// Create the Drizzle database instance
export const db = drizzle(sql, { schema });
