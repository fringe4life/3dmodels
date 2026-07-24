/// <reference path="./src/env.d.ts" />

import { defineConfig } from "drizzle-kit";
import { ENV } from "varlock/env";

export default defineConfig({
  dbCredentials: {
    authToken: ENV.TURSO_DATABASE_AUTH,
    url: ENV.TURSO_DATABASE_URL,
  },
  dialect: "turso",
  out: "./src/db/migrations",
  schema: "./src/db/schema/*.ts",
  strict: true,
  verbose: true,
});
