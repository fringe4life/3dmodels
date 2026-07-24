import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import { ENV } from "varlock/env";
import { relations } from "./schema/relations";

const client = createClient({
  authToken: ENV.TURSO_DATABASE_AUTH,
  url: ENV.TURSO_DATABASE_URL,
});

export const db = drizzle({
  client,
  relations,
});
