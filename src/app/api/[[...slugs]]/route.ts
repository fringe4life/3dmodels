import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { Elysia, t } from "elysia";
import { searchModelsAPI } from "@/features/models/dal/search-models-api";
import { getModelBySlugApi } from "@/features/models/queries/get-model-by-slug-api";
import { LIMITS } from "@/features/pagination/constants";
import type { LimitItem } from "@/features/pagination/types";
import { transformToPaginatedResult } from "@/features/pagination/utils/to-paginated-result";
import { auth } from "@/lib/auth";

const app = new Elysia({ prefix: "/api" })
  .use(openapi())
  .use(
    cors({
      origin: process.env.NEXT_PUBLIC_SITE_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .mount("/auth", auth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) {
          return status(401);
        }

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  })
  .onError(({ error }) => {
    console.log({ error });
    if (error instanceof Error) {
      return new Response(error.message);
    }
    return new Response("Internal Server Error", { status: 500 });
  })
  .get(
    "/models/:slug",
    async ({ params }) => {
      const model = await getModelBySlugApi(params.slug);
      if (!model) {
        return new Response("Model not found", { status: 404 });
      }
      return model;
    },
    {
      params: t.Object({
        slug: t.String(),
      }),
    },
  )
  .get(
    "/models",
    async ({ query }) => {
      const { page, limit } = query;

      const limitItem = limit as LimitItem;

      const models = await searchModelsAPI(undefined, {
        page,
        limit: limitItem,
      });
      if (!models) {
        return new Response("Models not found", { status: 404 });
      }
      return transformToPaginatedResult(models, { page, limit: limitItem });
    },
    {
      query: t.Object({
        page: t.Number({ default: 0, minimum: 0 }),
        limit: t.Number({ enum: LIMITS, default: 10 }),
      }),
    },
  );

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
export const PATCH = app.handle;
export const OPTIONS = app.handle;
