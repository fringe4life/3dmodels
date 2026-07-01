# 3D Models Gallery

A modern web application for browsing and discovering 3D models, built with Next.js, TypeScript, and Drizzle ORM.

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-16.3.0--preview.5-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.3_canary-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.3-3178C6?logo=typescript)
![Panda CSS](https://img.shields.io/badge/Panda_CSS-2.0.0--beta.5-000000)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-1.0.0--rc.4-FFE66D?logo=postgresql)
[![Better Auth](https://img.shields.io/badge/Better%20Auth-1.7.0--rc.0-000000?logo=better-auth&logoColor=white)](https://better-auth.com/)
![Biome](https://img.shields.io/badge/Biome-2.4.16-60A5FA?logo=biome)
[![Ultracite](https://img.shields.io/badge/Ultracite-7.8.3-000000?logo=biome&logoColor=60A5FA)](https://github.com/ultracite/ultracite)
[![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/)
[![Linted with Biome](https://img.shields.io/badge/Linted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

- **Framework**: Next.js 16.3.0-preview.5 with App Router, Cache Components, React Compiler, and typed routes (`typedRoutes`)
- **Language**: TypeScript 6.0.3 with React 19.3 canary
- **Styling**: Panda CSS 2.0.0-beta.5 (`@pandacss/dev`, `@pandacss/preset-base`, `@pandacss/preset-panda`, `panda.config.ts`, vendored typography preset in `panda-presets/typography.ts`); generated `styled-system/` from `panda build` (gitignored; run via `bun install` / `prepare`); imports use the `@styled-system/*` path alias (`tsconfig.json`); global view transitions and `@layer` rules in `src/app/index.css`;
- **Database**: Neon (PostgreSQL) with Drizzle ORM 1.0.0-rc.4
- **Authentication**: Better Auth 1.7.0-rc.0 with email/password and GitHub OAuth, cookie caching enabled, ElysiaJS API backend; Drizzle adapter uses `relations-v2` with experimental joins
- **Search Params**: nuqs 2.9.0-beta.4 for type-safe URL state management; `NuqsAdapterBoundary` scopes the adapter to listing routes inside `Suspense` (not model detail); listing canonical URLs use `nuqs/server` loaders/serializers (`features/pagination/listing-canonical.ts`) for SEO metadata
- **Linting & Formatting**: Biome 2.4.16 with Ultracite 7.8.3 presets (`ultracite/biome/core`, `react`, `next`); [React Doctor](https://github.com/millionco/react-doctor) on PRs (`.github/workflows/react-doctor.yml`, `doctor.config.ts`)
- **Type Checking**: tsgo (TypeScript Native Preview)
- **Package Manager**: Bun
- **Build Tool**: Turbopack for dev and build; `partialPrefetching`, experimental view transitions, MCP server, cached navigations, and `appNewScrollHandler` (`next.config.ts`); env types from Varlock (`.env.schema`, `src/env.d.ts`), not Next `typedEnv`
- **Environment**: [Varlock](https://varlock.dev/) 1.9.0 with `.env.schema`, `@varlock/nextjs-integration` plugin in `next.config.ts`, optional Bitwarden Secrets Manager via `@varlock/bitwarden-plugin` (see `docs/VARLOCK.md`)
- **Validation**: Varlock for environment; Valibot 1.4.2 for server action and form schemas

## 🚀 Features

- **Browse 3D Models**: View a curated collection of 3D models across various categories
- **Category Filtering**: Filter models by category (3D Printer, Art, Education, Fashion, etc.)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Page Transitions**: View Transitions API with composable fade and slide animations for pagination
- **Type-Safe Database**: Full TypeScript support with Drizzle ORM
- **Performance Optimized**: Caching for frequently accessed data
- **Modern Stack**: Built with Next.js 16.3, TypeScript, and Panda CSS
- **Feature-Based Architecture**: Well-organized codebase with clear separation of concerns

**Note**: Like/dislike functionality with optimistic updates and real-time like count synchronization is fully implemented.


## 📁 Project Structure

Static assets are served from `public/` at the **repository root** (not under `src/`), including logos, hero images, and `public/img/models/*.jpg` thumbnails referenced by seed data. Supplemental docs live in `docs/` (for example `AUTH_SETUP.md`, `VARLOCK.md`, `PSEUDO_CLASS_TRANSITIONS.md`, `PERFORMANCE_IMPROVEMENTS.md`). **Panda CSS** writes generated files to **`styled-system/`** at the repo root (`panda.config.ts` → `outdir`); that folder is gitignored—run `bun install` (or `bunx panda build`) so imports like `@styled-system/css` resolve. Root tooling includes `panda-presets/` (vendored typography preset), `doctor.config.ts`, and `.github/workflows/react-doctor.yml` for PR diagnostics.

```
src/
├── app/                          # Next.js App Router
│   ├── @navbar/                  # Parallel route for navbar
│   │   ├── default.tsx
│   │   └── error.tsx
│   ├── @footer/                  # Parallel route for footer
│   │   └── default.tsx
│   ├── 3d-models/                # 3D models routes
│   │   ├── @categories/          # Parallel route for categories nav
│   │   │   ├── default.tsx
│   │   │   └── error.tsx         # Error boundary for categories
│   │   ├── @results/             # Parallel route for search results
│   │   │   ├── [...catchAll]/
│   │   │   │   └── page.tsx
│   │   │   ├── default.tsx
│   │   │   ├── error.tsx         # Error boundary for results with retry functionality
│   │   │   ├── loading.tsx       # Loading state for results
│   │   │   └── page.tsx
│   │   ├── [slug]/               # Individual model page
│   │   │   ├── error.tsx         # Error boundary for model detail page
│   │   │   ├── not-found.tsx
│   │   │   └── page.tsx
│   │   ├── categories/           # Category-specific pages
│   │   │   └── [categoryName]/
│   │   │       ├── error.tsx     # Error boundary for category pages with retry functionality
│   │   │       ├── loading.tsx   # Loading state for category pages
│   │   │       ├── not-found.tsx
│   │   │       └── page.tsx
│   │   ├── layout.tsx            # Models layout
│   │   └── page.tsx              # Models landing page
│   ├── about/                    # About page
│   │   └── page.tsx
│   ├── (auth)/                   # Authentication group route
│   │   ├── layout.tsx            # Centered auth layout
│   │   ├── signin/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── api/                      # API routes
│   │   └── [[...slugs]]/
│   │       ├── better-auth-openapi.ts  # Better Auth OpenAPI spec for Elysia docs
│   │       └── route.ts          # ElysiaJS handler mounting Better Auth (`basePath` /api/auth)
│   ├── index.css                 # Global @layer stack, view-transition animations
│   ├── styles.ts                 # Shared Panda `css` / pattern exports for app shells
│   ├── icon.png                  # App icon (metadata)
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   ├── global-error.tsx          # Root error boundary (App Router)
│   ├── robots.ts                 # robots.txt Route Handler
│   └── sitemap.ts                # Sitemap generation
├── assets/
│   └── images/                   # App-local image assets
├── features/
│   ├── auth/                     # Authentication feature
│   │   ├── actions/              # Server actions
│   │   │   ├── sign-in-action.ts
│   │   │   ├── sign-out-action.ts
│   │   │   └── sign-up-action.ts  # SignUpData type co-located here
│   │   ├── components/           # Auth components
│   │   │   ├── auth-buttons.tsx
│   │   │   ├── auth-buttons-skeleton.tsx
│   │   │   ├── auth-card.tsx
│   │   │   ├── auth-footer-link.tsx
│   │   │   ├── avatar.tsx        # User avatar (GitHub image, fallback icon)
│   │   │   ├── has-auth.tsx      # Generic auth component with session provider
│   │   │   ├── sign-in-button.tsx
│   │   │   └── sign-in-nav-link.tsx  # Icon-only sign-in NavLink for navbar
│   │   ├── auth-types.ts         # Shared auth type definitions
│   │   ├── constants.ts          # Auth validation constants
│   │   ├── queries/
│   │   │   └── get-user.ts
│   │   └── types.ts              # IsAuthenticated, UserAuthState discriminated union
│   ├── categories/               # Categories feature
│   │   ├── components/
│   │   │   ├── categories-block-transition.tsx
│   │   │   └── categories-nav.tsx
│   │   ├── constants.ts          # ALL_CATEGORIES, CATEGORY_LIST_ITEMS, not-found metadata
│   │   ├── types.ts              # CategoryName (CategorySlug route param)
│   │   └── queries/
│   │       ├── get-all-categories.ts
│   │       ├── get-all-category-slugs.ts
│   │       └── get-category-by-slug.ts
│   ├── models/                   # Models feature
│   │   ├── components/
│   │   │   ├── model-card.tsx
│   │   │   ├── model-card-skeleton.tsx
│   │   │   ├── model-detail.tsx
│   │   │   ├── models-grid.tsx
│   │   │   ├── models-grid-skeleton.tsx
│   │   │   ├── models-not-found.tsx
│   │   │   └── models-view.tsx
│   │   ├── constants.ts
│   │   ├── dal/
│   │   │   ├── get-models.ts     # `{ result, isAuthenticated }`; search + user, batched likes
│   │   │   └── search-models.ts  # Unified listing/search (optional query + category)
│   │   ├── likes/                # Likes sub-feature (toggle, status, heart UI)
│   │   │   ├── actions/
│   │   │   │   └── toggle-like.ts
│   │   │   ├── components/
│   │   │   │   ├── heart-button-client.tsx
│   │   │   │   ├── heart-button-count.tsx
│   │   │   │   ├── heart-button-server.tsx
│   │   │   │   ├── heart-button-skeleton.tsx
│   │   │   │   ├── heart-icon.tsx
│   │   │   │   └── likes-count-transition.tsx
│   │   │   ├── dal/
│   │   │   │   └── toggle-like.ts
│   │   │   ├── hooks/
│   │   │   │   ├── heart-like-optimistic.ts
│   │   │   │   └── use-heart-like.ts
│   │   │   ├── queries/
│   │   │   │   └── like-status.ts
│   │   │   ├── constants.ts
│   │   │   └── types.ts
│   │   ├── queries/
│   │   │   ├── build-models-where.ts  # Shared SQL where builder for list/count
│   │   │   ├── get-all-model-slugs.ts
│   │   │   ├── get-model-by-slug.ts
│   │   │   ├── get-models-count.ts
│   │   │   └── get-models-list.ts
│   │   └── types.ts              # ModelWithLikeStatus, SearchPattern, Category; component props extend IsAuthenticated
│   └── pagination/
│       ├── components/
│       │   ├── pagination-button.tsx
│       │   ├── pagination-limit-control.tsx
│       │   ├── pagination-offset-transition.tsx
│       │   ├── pagination-page-control.tsx
│       │   ├── pagination-skeleton.tsx
│       │   ├── pagination-summary.tsx
│       │   └── pagination.tsx
│       ├── dal/
│       │   └── paginate-items.ts
│       ├── hooks/
│       │   └── use-pagination-query.ts
│       ├── utils/
│       │   └── to-paginated-result.ts
│       ├── listing-canonical.ts
│       ├── pagination-search-params.ts
│       ├── constants.ts
│       └── types.ts              # PaginatedResult, PaginationMetadataObject; component props co-located in components/
├── constants.ts                  # Shared constants (EMPTY_LIST_LENGTH)
├── components/                   # Shared/generic components
│   ├── form/
│   │   ├── field-errors.tsx
│   │   ├── form-error.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── reset-button.tsx
│   │   └── submit-button.tsx
│   ├── nav-link/
│   │   ├── nav-link-list-item.tsx
│   │   ├── nav-link-skeleton.tsx
│   │   ├── nav-link.tsx          # Suspense-wrapped link with active state
│   │   └── types.ts
│   ├── navbar/
│   │   └── navbar.tsx            # Sticky header (logo, nav links, auth slot)
│   ├── nuqs/
│   │   └── nuqs-adapter-boundary.tsx  # Suspense + NuqsAdapter for listing routes
│   ├── button.tsx
│   ├── generic-component.tsx
│   ├── not-found/
│   │   ├── unsuccessful-state-list-item.tsx
│   │   └── unsuccessful-state.tsx
│   ├── pill.tsx
│   ├── scroll-progress.tsx
│   ├── skeleton.tsx              # Shared loading skeleton primitive
│   ├── search-input/
│   │   ├── search-input.tsx
│   │   ├── search-input-transition.tsx
│   │   └── search-input-skeleton.tsx
│   ├── suspend.tsx
│   └── top-link.tsx
├── db/
│   ├── schema/
│   │   ├── auth.ts
│   │   ├── likes.ts
│   │   ├── models.ts             # categories + models tables; category_slug pgEnum
│   │   ├── relations.ts
│   │   └── index.ts
│   ├── migrations/               # Drizzle SQL migrations (drizzle-kit generate)
│   ├── seed-data/
│   │   └── models.ts
│   ├── brands.ts                 # CategorySlug / User branded Valibot types
│   ├── categories.ts             # CATEGORIES constant (source of truth for enum values)
│   ├── seed.ts
│   ├── drop-tables.ts
│   └── index.ts
├── lib/
│   ├── api.ts
│   ├── auth.ts
│   ├── auth-client.ts
│   ├── date.ts
│   └── hero-image.ts
├── types/
│   └── index.ts
├── utils/
│   ├── cache-invalidation.ts
│   ├── sanitise-name.ts
│   ├── to-action-state.ts
│   └── try-catch.ts
├── global.d.ts
└── proxy.ts
```

## 🏗️ Architecture Overview

### Feature-Based Organization
The project follows a feature-based architecture where related functionality is co-located:

- **`features/models/`**: Model listing, detail, and search components, queries, and DAL
- **`features/models/likes/`**: Like toggle action, DAL, queries, hooks, and heart-button UI
- **`features/categories/`**: All category-related components and data queries
- **`features/pagination/`**: Pagination utilities, types, and components shared across features
- **`features/auth/`**: Authentication actions, components, queries, and types
- **`components/`**: Shared components used across features (including navigation)

### Directory Conventions
- **`_` prefix**: Private folders that are not part of Next.js routing
- **`features/`**: Feature-based modules with their own components and queries
- **`components/`**: Shared/generic components used across features
- **`db/categories.ts`**: Source-of-truth category list; drives PostgreSQL `category_slug` enum and Valibot branded slugs in `db/brands.ts`
- **`db/seed-data/`**: Model seed data only (`models.ts`)

### Performance Optimizations
- **NuqsAdapterBoundary**: `NuqsAdapter` wrapped in `Suspense` on listing pages (`@results/page.tsx`, category pages) only — model detail routes skip nuqs overhead
- **Font Loading**: Only required font weights are loaded (Albert Sans: 400,500,600,700; Montserrat Alternates: 400,600,700)
- **Error Handling**: Centralized `tryCatch` utility for consistent error handling across database queries
- **Cache Components**: Uses `"use cache"`, `"use cache: remote"`, and `"use cache: private"` directives for persistent caching; React `cache()` is used only for functions called multiple times in the same render pass (e.g., `getModelBySlug` and `getCategoryBySlug` called in both `generateMetadata` and page components)
- **Type Safety**: `Maybe<T>` for nullable query results; `UserAuthState` discriminated union (`{ isAuthenticated: true, user }` | `{ isAuthenticated: false }`) from `getUser()` and `HasAuth`; shared `IsAuthenticated` interface extended by models/pagination props; component-specific props co-located next to components where not reused
- **Query Builder**: Migrated to Drizzle ORM RQBv2 for simple relational queries (`db.query.tableName.findMany/findFirst`) with object-based `where` clauses; complex queries and mutations remain on SQL builder
- **Error Recovery**: Error boundaries with `error.tsx` for failed queries (results, category pages, and model detail pages) with built-in `reset()` retry functionality and helpful error guidance
- **Database Query Separation**: Database queries return raw `DatabaseQueryResult<T>`; transformation to `PaginatedResult<T>` happens in higher-level functions using `transformToPaginatedResult` utility from `features/pagination/utils/`
- **View Transitions**: Composable CSS animations using base fade and slide keyframes with CSS variables for slide distance, enabling smooth directional page transitions (enter-left, exit-left, enter-right, exit-right) for pagination

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or a current Node.js LTS
- Neon database account (or any PostgreSQL database)
- Optional: [Bitwarden Secrets Manager](https://bitwarden.com/products/secrets-manager/) machine account token if you use `bitwarden()` resolvers in `.env.schema` (see `docs/VARLOCK.md`)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 3dmodels
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

   This runs the **`prepare`** lifecycle script (`panda build` to generate `styled-system/`, plus Husky). If codegen ever needs a manual rerun: `bunx panda build`.

3. **Environment Setup**
   Configuration is defined in **`.env.schema`** (Varlock). Copy it to **`.env`** and fill in values, or use **literal strings** in place of `bitwarden("…")` UUIDs for local development. Typical variables:

   ```env
   # Bootstrap (Bitwarden resolvers in .env.schema)
   BITWARDEN_ACCESS_TOKEN="your-machine-account-token"

   NEXT_PUBLIC_SITE_URL="http://localhost:3000"

   BETTER_AUTH_SECRET="your-secret-key-here-change-this-in-production"

   GITHUB_CLIENT_ID="your-github-oauth-client-id"
   GITHUB_CLIENT_SECRET="your-github-oauth-client-secret"

   DATABASE_URL="your-neon-database-connection-string"
   ```

   Run **`bun run env:typegen`** after changing `.env.schema` to refresh **`src/env.d.ts`**. Typed access uses **`import { ENV } from "varlock/env"`**. See **`docs/VARLOCK.md`** and **`docs/AUTH_SETUP.md`** for Bitwarden, Bun, and Vercel notes.

4. **Database Setup**
   Scripts use **`varlock run --`** so Drizzle and seed commands receive resolved env (see `package.json`):

   ```bash
   bun run db:push
   bun run db:seed
   ```

   Alternatively, migrations (SQL and `meta/` snapshots are written to `src/db/migrations/` when you run generate; clones may use `db:push` only until migrations exist):

   ```bash
   bun run db:generate
   bun run db:migrate
   bun run db:seed
   ```

   For one-off Drizzle CLI use without the `db:*` scripts, use the same pattern as `package.json` (for example `varlock run -- bun x drizzle-kit push`).

5. **Start the development server**
   ```bash
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📊 Database Schema

### Categories Table
- `id`: Primary key (auto-increment)
- `displayName`: Human-readable category name
- `slug`: PostgreSQL `category_slug` enum (unique); values defined in `src/db/categories.ts`

### Models Table
- `slug`: Primary key (text, auto-generated from name)
- `name`: Model name (unique)
- `description`: Model description
- `likes`: Number of likes (counter)
- `image`: Image URL
- `categorySlug`: Foreign key to categories.slug
- `userId`: Foreign key to user.id (cascade delete)
- `dateAdded`: Timestamp when model was added

### Likes Table
- `id`: Primary key (auto-increment)
- `userId`: Foreign key to users.id (cascade delete)
- `modelSlug`: Foreign key to models.slug (cascade delete)
- `createdAt`: Timestamp when like was created
- Unique constraint on `(userId, modelSlug)` pair

### Authentication Tables (Better Auth)
- `user`: User accounts with email/password and OAuth support
- `account`: OAuth provider accounts (GitHub)
- `session`: User sessions with cookie caching
- `verification`: Email verification tokens

## 🗄️ Database Operations

### Available Scripts

- `bun run db:generate` — Generate migrations (`varlock run -- bun x drizzle-kit generate`)
- `bun run db:migrate` — Run migrations (`varlock run -- bun x drizzle-kit migrate`)
- `bun run db:push` — Push schema (`varlock run -- bun x drizzle-kit push --force`)
- `bun run db:studio` — Drizzle Studio (`varlock run -- bun x drizzle-kit studio`)
- `bun run db:seed` — Seed database (requires existing users for seeded models)
- `bun run db:drop` — Drop all tables (development reset)

### Database Relations
The application uses Drizzle ORM 1.0.0-rc.4 with `defineRelations` for type-safe relations:
- Relations defined using the v1/rc syntax with `r.one()` and `r.many()` helpers
- Relation names avoid conflicts with column names (e.g., `modelLikes` instead of `likes` to avoid conflict with `models.likes` column)
- All relations exported from `schema/relations.ts` and included in the database schema

### Query Builder (RQBv2)
The application uses Drizzle ORM's Relational Query Builder v2 (RQBv2) for type-safe relational queries:
- **Read queries**: All read queries use RQBv2 syntax (`db.query.tableName.findMany()`, `db.query.tableName.findFirst()`) with object-based `where` clauses, including complex conditions with `OR: []`, `AND: []`, `NOT: {}`, and column filters like `{ column: { eq: value, ilike: pattern } }` for better type safety and developer experience
- **Count queries**: Count queries use `db.$count()` (RQBv2), with where conditions passed using SQL builder syntax (`and()`, `or()`, `ilike()`, etc.) since `$count` accepts SQL builder conditions
- **Mutations**: Insert, update, and delete operations use the SQL builder syntax (mutations not yet available in RQBv2)
- **Hybrid approach**: The codebase uses a hybrid strategy - RQBv2 object syntax for all read queries (including complex conditions with `AND`/`OR` arrays), SQL builder for count where conditions and mutations
- **Query organization**: Model queries are split into focused functions (`get-models-list.ts` for listing with RQBv2, `get-models-count.ts` for counting with SQL builder, `build-models-where.ts` for shared filter conditions) and composed in higher-level DAL functions (`get-models.ts`, `search-models.ts`). Both helpers support optional `searchPattern` and `category` parameters for flexible querying
- **Better Auth adapter**: Uses `@better-auth/drizzle-adapter/relations-v2` with experimental joins enabled (`lib/auth.ts`); mounted on ElysiaJS at `/api/[[...slugs]]/route.ts` with `basePath` `/api/auth`; OpenAPI documentation includes auth routes via `better-auth-openapi.ts`

### Cache Components
The application uses Next.js Cache Components for optimal performance:
- Static content is pre-rendered at build time
- Dynamic content (like authentication state) is rendered at request time
- Server components use `connection()` to opt into dynamic rendering when needed
- Cache invalidation handled by `cacheTag` utilities
- Error handling with `error.tsx` error boundaries for failed queries (categories, results, and category pages with built-in `reset()` retry functionality)
- Loading states with `loading.tsx` for results and category pages

### Caching Strategy

The application uses Next.js Cache Components with granular cache tags for efficient invalidation:
- **Models**: Cached with `models`, `model-{slug}`, and `models-category-{slug}` tags
- **Categories**: Cached at component level with `categories` tag and `cacheLife("max")` for pre-rendered HTML output
- **Cache Life**: Hours profile for most queries (5 min stale, 1 hour revalidate, 1 day expire), max for static categories (component-level caching)
- **Query Functions**: Unified `getModels()` function uses `searchModels()` which handles search (with optional query), category filtering, and listing. The function uses helper functions `getModelsList` and `getModelsCount` which support optional search and category parameters
- **Like Status**: `like-status.ts` queries use `"use cache: private"` for user-specific like status (cached on device)
- **Model Lists**: `get-models.ts` adds `hasLiked` per model after a single batched like query for the page
- **Invalidation**: Centralized utilities in `utils/cache-invalidation.ts` with on-demand invalidation via `invalidateModel()`
- **Optimistic Updates**: Heart button uses `useOptimistic` for immediate UI feedback with server state synchronization via form actions

## 🎨 Styling & Components

### Design System
- **Tokens & utilities**: Panda CSS 2 semantic tokens and preset utilities (`panda.config.ts`, `@pandacss/preset-base`, `@pandacss/preset-panda`, typography preset in `panda-presets/typography.ts`); orange accent and shared patterns (e.g., `navLink`) live in config
- **Typography**: Albert Sans + Montserrat Alternates via `next/font` in root layout; heading font applied in Panda `globalCss`
- **Layout & spacing**: Panda `css()` / layout patterns (e.g., `grid` for model grids in `src/app/styles.ts`)
- **Responsive**: Mobile-first breakpoints via Panda conditions and component styles

### Key Components

#### Feature Components
- `features/models/components/model-card` - Individual model display card
- `features/models/components/model-card-skeleton` - Loading skeleton for model cards
- `features/models/components/model-detail` - Detailed model view page
- `features/models/components/models-grid` - Grid layout for model cards
- `features/models/components/models-not-found` - Cached component for displaying no search results with helpful suggestions
- `features/models/components/models-view` - Shared server shell: `Suspense` + async inner that awaits `getModels`; pagination uses `PaginationOffsetTransition` for directional View Transitions
- `features/pagination/components/pagination` - Reusable pagination with nuqs integration and View Transition support
- `features/pagination/components/pagination-button` - Page/limit control button used by pagination
- `features/pagination/components/pagination-limit-control` - Per-page limit selector
- `features/pagination/components/pagination-page-control` - Page number navigation
- `features/pagination/components/pagination-summary` - Result count / range summary
- `features/pagination/hooks/use-pagination-query` - nuqs + View Transition hook for page/limit changes
- `features/models/likes/components/heart-button-client` - Client component with `useHeartLike` hook, optimistic like/count state, View Transition types for count changes
- `features/models/likes/components/likes-count-transition` - Wraps like count with `ViewTransition` update names for increase/decrease
- `features/models/likes/components/heart-button-server` - Server component for detail pages (resolves like status server-side)
- `features/models/likes/components/heart-button-skeleton` - Loading skeleton for heart button
- `features/models/likes/hooks/use-heart-like` - Client hook for toggle action and optimistic state
- `components/search-input/search-input` - Model search with nuqs URL state; `search-input-transition` for view transitions
- `features/categories/components/categories-nav` - Category filtering sidebar (server component)
- `features/categories/components/categories-block-transition` - View transition wrapper for category listing blocks
- `app/3d-models/@categories/error.tsx` - Error boundary for categories with built-in retry functionality
- `app/3d-models/@results/error.tsx` - Error boundary for search results with retry and error guidance
- `app/3d-models/@results/loading.tsx` - Loading state for search results
- `app/3d-models/categories/[categoryName]/error.tsx` - Error boundary for category pages with retry and error guidance
- `app/3d-models/categories/[categoryName]/loading.tsx` - Loading state for category pages
- `app/3d-models/[slug]/error.tsx` - Error boundary for model detail pages with retry and error guidance

#### Navigation Components
- `app/@navbar/default` - Parallel route delegating to shared `Navbar`
- `app/@navbar/error.tsx` - Error boundary for navbar with retry functionality
- `app/@footer/default` - Footer parallel route with copyright
- `components/navbar/navbar` - Sticky header with scroll-driven animation, logo, nav links, and auth slot (`HasAuthSuspense` → avatar or `SignInNavLink`)
- `components/nav-link/nav-link` - `NavLink` with `Suspense` fallback, active state (`includes` or `endsWith`), border position (`bottom` or `left`) (client component)
- `components/nav-link/nav-link-skeleton` - Width-matched skeleton for `NavLink` Suspense fallback
- `components/nav-link/nav-link-list-item` - `li` + `NavLink` wrapper
- `components/nuqs/nuqs-adapter-boundary` - `Suspense` + `NuqsAdapter` for listing routes only
- `components/top-link` - Top-of-page control used in layouts
- `features/auth/components/auth-buttons` - Sign-out control wrapping avatar (authenticated navbar slot)
- `features/auth/components/auth-buttons-skeleton` - Navbar auth slot loading state
- `features/auth/components/sign-in-nav-link` - Icon-only sign-in link for unauthenticated navbar slot
- `features/auth/components/auth-card` - Card shell for sign-in/sign-up pages
- `features/auth/components/auth-footer-link` - Footer link between auth screens
- `features/auth/components/avatar` - Avatar image with fallback

#### Shared Components
- `components/button` - Shared button styled with Panda variants
- `components/form/input` - Text input with consistent field styling
- `components/form/label` - Accessible labels for form fields
- `components/form/submit-button` - Submit control wired for pending state
- `components/form/reset-button` - Reset control for forms
- `components/form/field-errors` - Field-level error display component with ViewTransition support
- `components/form/form-error` - Form-level error display component with ViewTransition support
- `components/not-found/unsuccessful-state` - Unified component for not-found and error states with conditional styling based on `isError` prop
- `components/not-found/unsuccessful-state-list-item` - List item component for unsuccessful state suggestions
- `components/pill` - Small label component
- `components/scroll-progress` - Top-of-page reading progress indicator (client)
- `components/skeleton` - Shared skeleton primitive for loading placeholders
- `components/suspend` - Suspense helper component
- `components/generic-component` - Generic wrapper for collections

#### Authentication & Data Access
- `lib/auth` - Better Auth configuration with email/password and GitHub OAuth
- `lib/auth-client` - Better Auth client instance for client-side usage
- `features/auth/actions` - Sign-in, sign-up, and sign-out server actions with Valibot validation
- `features/auth/components/has-auth` - Renders `children(auth)` with `UserAuthState`; `HasAuthSuspense` wraps in `Suspend`
- `features/auth/constants` - Validation constants (password length, email length, name length limits)
- `features/auth/queries/get-user` - User query with `React.cache()` (returns `UserAuthState` from session)
- `features/auth/components/sign-in-button` - GitHub OAuth sign-in button
- `utils/to-action-state` - Action state utilities for consistent server action responses
- `components/form/field-errors` - Reusable field error component used in auth forms
- `components/form/form-error` - Reusable form-level error component used in auth forms

## 🔧 Development

### Code Quality Tools

- **Biome / Ultracite**: Linting and formatting (see `.cursor/rules/ultracite.mdc`)
- **React Doctor**: React/Next.js diagnostics on pull requests; run locally with `bun run react-doctor`
- **tsgo**: TypeScript type checking
- **TypeScript**: Static type checking

### Available Scripts

- `prepare` (automatic on `bun install`) — Panda `styled-system/` build and Husky setup
- `bun run dev` - Start development server (Turbopack)
- `bun run dev:inspect` - Start development server with Node.js inspector
- `bun run next:upgrade` - Upgrade Next.js to latest version
- `bun run next:analyze` - Analyze Next.js bundle (experimental-analyze)
- `bun run build` - Build for production (Turbopack)
- `bun run build:debug` - Build with debug prerender information
- `bun run start` - Start production server
- `bun run test` - Run tests (Bun test runner)
- `bun run test:watch` - Run tests in watch mode
- `bun run test:unit` - Run unit tests
- `bun run test:components` - Run component tests
- `bun run test:integration` - Run integration tests
- `bunfig.toml` — test preload (`tests/setup/test-preload.ts`) registers Happy DOM globals and stubs `server-only` for component tests
- `bun run test:e2e` - Run Playwright E2E tests
- `bun run e2e:open` - Open Playwright UI
- `bun run e2e:codegen` - Playwright codegen (localhost:3000)
- `bun run type` - Run tsgo type checking
- `bun run typegen` - Generate Next.js routes and run tsgo (noEmit)
- `bun run env:typegen` - Regenerate `src/env.d.ts` from `.env.schema` (Varlock)
- `bun run db:generate` - Generate Drizzle migrations
- `bun run db:migrate` - Run Drizzle migrations
- `bun run db:push` - Push schema directly to database
- `bun run db:studio` - Open Drizzle Studio
- `bun run db:seed` - Seed database with initial data
- `bun run db:drop` - Drop all tables (development reset)
- `bun run fix` - Fix linting issues with Ultracite/Biome
- `bun run check` - Check linting rules with Ultracite/Biome
- `bun run doctor` - Run Ultracite doctor diagnostics
- `bun run ultracite:upgrade` - Upgrade Ultracite configuration
- `bun run react-doctor` - Run React Doctor locally (`doctor.config.ts`)

### Code Style

The project follows a consistent coding style with:
- ES modules (import/export syntax)
- TypeScript for type safety
- Panda CSS for styling (`css` recipes, semantic tokens)
- Feature-based organization
- Component-specific type definitions
- Proper error handling and logging

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch
4. If you use Bun on Vercel, set `bunVersion: "1.x"` and `buildCommand: "bun --bun run next build"` in `vercel.json`. Ensure Bun runtime is >= 1.3.7 for Cache Components.

### Environment Variables

Mirror **`.env.schema`**: `NEXT_PUBLIC_SITE_URL`, `BETTER_AUTH_SECRET`, `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `DATABASE_URL`, and **`BITWARDEN_ACCESS_TOKEN`** when using **`bitwarden()`** resolvers. Varlock validates at runtime; types live in **`src/env.d.ts`**. See **`docs/VARLOCK.md`** for Vercel and Bitwarden.

## 📝 Data Management

### Adding New Models

1. Update `src/db/seed-data/models.ts` with new model data (note: `userId` and `likes` are omitted from seed data)
2. Run `bun run db:seed` to update the database (requires existing users in the database)

### Adding New Categories

1. Add the category to `src/db/categories.ts` (updates the PostgreSQL enum source of truth)
2. Run `bun run db:generate` then `bun run db:migrate` (or `bun run db:push` in development)
3. Run `bun run db:seed` to update the database

### Cache Management

- Use centralized cache invalidation utilities in `utils/cache-invalidation.ts`
- Functions: `invalidateAllModels()`, `invalidateModel(slug)`, `invalidateCategory(slug)`
- Cache tags provide granular control over what gets invalidated
- Automatic cache invalidation on data mutations (e.g., `toggleLike` invalidates model cache)
- Session cache uses `"use cache: private"` directive with `cacheTag("session")` for responsive auth state
- Like status uses `features/models/likes/queries/like-status.ts` with `"use cache: private"` for user-specific cache

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the feature-based architecture
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review existing issues
- Create a new issue with detailed information
