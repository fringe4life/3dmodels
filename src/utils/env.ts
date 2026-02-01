import "server-only";
import { minLength, object, parse, pipe, string, url } from "valibot";

const envSchema = object({
  GITHUB_CLIENT_SECRET: string(),
  GITHUB_CLIENT_ID: string(),
  BETTER_AUTH_SECRET: string(),
  AUTH_DRIZZLE_URL: pipe(string(), url()),
  DATABASE_URL: pipe(string(), url()),
  REDIS_API_KEY: pipe(string(), minLength(1, "too short")),
});

export const env = parse(envSchema, process.env);
