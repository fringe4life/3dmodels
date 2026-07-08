/// <reference path="./src/env.d.ts" />

import { defineConfig } from "drizzle-kit";
import { ENV } from "varlock/env";
export default defineConfig({
  dbCredentials: {
    url: ENV.DATABASE_URL,
  },
  dialect: "postgresql",
  out: "./src/db/migrations",
  schema: "./src/db/schema/*.ts",
  strict: true,
  verbose: true,
});
