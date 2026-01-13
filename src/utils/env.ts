import "server-only";
import { object, parse, pipe, string, url } from "valibot";

const envSchema = object({
  GITHUB_CLIENT_SECRET: string(),
  GITHUB_CLIENT_ID: string(),
  AUTH_SECRET: string(),
  AUTH_DRIZZLE_URL: pipe(string(), url()),
  DATABASE_URL: pipe(string(), url()),
});

export const env = parse(envSchema, process.env);
