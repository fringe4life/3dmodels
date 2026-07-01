import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { status } from "elysia";
import { ENV } from "varlock/env";
import { app } from "@/lib/api";
import { auth } from "@/lib/auth";
import { OpenAPI } from "./better-auth-openapi";

const isDev = process.env.NODE_ENV === "development";

app
  .use(
    openapi({
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),
      },
      enabled: isDev,
    }),
  )
  .use(
    cors({
      origin: ENV.NEXT_PUBLIC_SITE_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .mount(auth.handler)
  .onError(({ error }) => {
    if (error instanceof Error) {
      return new Response(error.message);
    }
    return status(500, { message: "Internal Server Error" });
  });

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
export const PATCH = app.handle;
export const OPTIONS = app.handle;
