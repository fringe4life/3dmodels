/// <reference path="./src/env.d.ts" />

import { defineConfig } from "drizzle-kit";
import { ENV } from "varlock/env";
export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema/*.ts",
  out: "./src/db/migrations",
  dbCredentials: {
    url: ENV.DATABASE_URL,
  },
  verbose: true,
  strict: true,
});
