import { cors } from "@elysiajs/cors";
import { openapi } from "@elysiajs/openapi";
import { status, t } from "elysia";
import { ENV } from "varlock/env";
import { db } from "@/db";
import { getUser } from "@/features/auth/queries/get-user";
import { DEFAULT_HAS_LIKED } from "@/features/models/constants";
import { searchModelsAPI } from "@/features/models/dal/search-models-api";
import { getModelBySlugApi } from "@/features/models/queries/get-model-by-slug-api";
import { LIMITS } from "@/features/pagination/constants";
import type { LimitItem } from "@/features/pagination/types";
import { transformToPaginatedResult } from "@/features/pagination/utils/to-paginated-result";
import { app } from "@/lib/api";
import { auth } from "@/lib/auth";
import { tryCatch } from "@/utils/try-catch";
import { OpenAPI } from "./better-auth-openapi";

app
  .use(
    openapi({
      documentation: {
        components: await OpenAPI.components,
        paths: await OpenAPI.getPaths(),
      },
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
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        });

        if (!session) {
          return status(401, { message: "Unauthorized" });
        }

        return {
          user: session.user,
          session: session.session,
        };
      },
    },
  })
  .onError(({ error }) => {
    if (error instanceof Error) {
      return new Response(error.message);
    }
    return status(500, { message: "Internal Server Error" });
  })
  .get(
    "/models/:slug",
    async ({ params }) => {
      const model = await getModelBySlugApi(params.slug);
      if (!model) {
        return status(404, { message: "Model not found" });
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
        return status(404, { message: "Models not found" });
      }
      return transformToPaginatedResult(models, { page, limit: limitItem });
    },
    {
      query: t.Object({
        page: t.Number({ default: 0, minimum: 0 }),
        limit: t.Number({ enum: LIMITS, default: 10 }),
      }),
    },
  )
  .get(
    "/models/:slug/liked",
    async ({ params }) => {
      const { slug } = params;
      const user = await getUser();

      if (!user) {
        return DEFAULT_HAS_LIKED;
      }

      const { data, error } = await tryCatch(() =>
        db.query.likes.findFirst({
          where: {
            userId: user.id,
            modelSlug: slug,
          },
        }),
      );

      if (error) {
        return status(500, { message: "Internal Server Error" });
      }

      return { hasLiked: data !== null };
    },
    {
      params: t.Object({
        slug: t.String(),
      }),
    },
  );

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
export const PATCH = app.handle;
export const OPTIONS = app.handle;

export type App = typeof app;
