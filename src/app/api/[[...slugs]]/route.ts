import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import { auth } from "@/lib/auth";

const app = new Elysia({ prefix: "/api" })
  .use(
    cors({
      origin: process.env.NEXT_PUBLIC_SITE_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .mount("/auth", auth.handler)
  .onError(({ error }) => {
    console.log({ error });
    if (error instanceof Error) {
      return new Response(error.message);
    }
    return new Response("Internal Server Error", { status: 500 });
  });

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
export const PATCH = app.handle;
export const OPTIONS = app.handle;
