# 3D Models Gallery

A modern web application for browsing and discovering 3D models, built with Next.js, TypeScript, and Drizzle ORM.

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-16.2.1-black?logo=next.js)
![React](https://img.shields.io/badge/React-canary-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.2.2-38B2AC?logo=tailwind-css)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-beta-FFE66D?logo=postgresql)
[![Better Auth](https://img.shields.io/badge/Better%20Auth-1.5.6-000000?logo=better-auth&logoColor=white)](https://better-auth.com/)
![Biome](https://img.shields.io/badge/Biome-2.4.7-60A5FA?logo=biome)
[![Ultracite](https://img.shields.io/badge/Ultracite-7.3.2-000000?logo=biome&logoColor=60A5FA)](https://github.com/ultracite/ultracite)
[![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/)
[![Linted with Biome](https://img.shields.io/badge/Linted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

- **Framework**: Next.js 16.2.1 with App Router, Cache Components, and typed routes (`typedRoutes`)
- **Language**: TypeScript 6.0.2 with React canary
- **Styling**: Tailwind CSS v4.2.2 (Biome CSS parser with `tailwindDirectives`)
- **Database**: Neon (PostgreSQL) with Drizzle ORM (beta)
- **Authentication**: Better Auth with email/password and GitHub OAuth, cookie caching enabled, ElysiaJS API backend
- **Search Params**: nuqs 2.8.9 for type-safe URL state management
- **Linting & Formatting**: Biome 2.4.7 with Ultracite 7.3.2 presets (`ultracite/biome/core`, `react`, `next`)
- **Type Checking**: tsgo (TypeScript Native Preview)
- **Package Manager**: Bun
- **Build Tool**: Turbopack for dev and build; experimental view transitions, MCP server, typed env, and cached navigations (`next.config.ts`)
- **Validation**: Valibot 1.3.1 for schema validation (including `src/utils/env.ts`)

## 🚀 Features

- **Browse 3D Models**: View a curated collection of 3D models across various categories
- **Category Filtering**: Filter models by category (3D Printer, Art, Education, Fashion, etc.)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Smooth Page Transitions**: View Transitions API with composable fade and slide animations for pagination
- **Type-Safe Database**: Full TypeScript support with Drizzle ORM
- **Performance Optimized**: Caching for frequently accessed data
- **Modern Stack**: Built with Next.js 16.2.1, TypeScript, and Tailwind CSS v4
- **Feature-Based Architecture**: Well-organized codebase with clear separation of concerns

**Note**: Like/dislike functionality with optimistic updates and real-time like count synchronization is fully implemented.


## 📁 Project Structure

Static assets are served from `public/` at the **repository root** (not under `src/`). Supplemental docs live in `docs/` (for example `AUTH_SETUP.md`, `PSEUDO_CLASS_TRANSITIONS.md`, `PERFORMANCE_IMPROVEMENTS.md`).

```
src/
├── app/                          # Next.js App Router
│   ├── @navbar/                  # Parallel route for navbar
│   │   └── default.tsx
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
│   │       └── route.ts          # ElysiaJS API handler (Better Auth `basePath` /api/auth)
│   ├── globals.css               # Global styles
│   ├── scroll-state.css          # Scroll-state container queries (CSS)
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── features/
│   ├── auth/                     # Authentication feature
│   │   ├── actions/              # Server actions
│   │   │   ├── sign-in-action.ts
│   │   │   ├── sign-out-action.ts
│   │   │   └── sign-up-action.ts
│   │   ├── components/           # Auth components
│   │   │   ├── auth-buttons.tsx  # Authentication buttons component
│   │   │   ├── auth-buttons-skeleton.tsx
│   │   │   ├── avatar.tsx        # User avatar (GitHub image, fallback icon)
│   │   │   ├── has-auth.tsx      # Generic auth component with session provider
│   │   │   └── sign-in-button.tsx
│   │   ├── constants.ts         # Auth validation constants
│   │   ├── queries/              # Auth queries
│   │   │   └── get-user.ts
│   │   └── types.ts              # Auth type definitions (AuthButtonsProps, SignUpData, HasAuthChildren, ServerUser)
│   ├── categories/               # Categories feature
│   │   ├── components/           # Category-specific components
│   │   │   └── categories-nav.tsx
│   │   ├── constants.ts          # Category metadata and display configuration
│   │   ├── types.ts               # Category type definitions
│   │   └── queries/              # Category data queries
│   │       ├── get-all-categories.ts
│   │       ├── get-all-category-slugs.ts
│   │       └── get-category-by-slug.ts
│   ├── models/                   # Models feature
│   │   ├── actions/              # Server actions
│   │   │   └── likes.ts
│   │   ├── components/           # Model-specific components
│   │   │   ├── heart-button/      # Heart button component group
│   │   │   │   ├── heart-button-client.tsx  # Client: form action, optimistic like/count, transitions
│   │   │   │   ├── heart-button-count.tsx   # Like count display
│   │   │   │   ├── heart-button-server.tsx   # Server component for detail pages
│   │   │   │   ├── heart-button-skeleton.tsx
│   │   │   │   ├── heart-like-optimistic.ts  # Reducer for unified `useOptimistic` like state
│   │   │   │   └── likes-count-transition.tsx # View Transitions for like count updates
│   │   │   ├── model-card.tsx
│   │   │   ├── model-card-skeleton.tsx
│   │   │   ├── model-detail.tsx
│   │   │   ├── models-grid.tsx
│   │   │   ├── models-grid-skeleton.tsx
│   │   │   ├── models-not-found.tsx
│   │   │   ├── models-view.tsx # Shared component for search results and category pages
│   │   ├── constants.ts           # Model categories, filters, display metadata, and error guidance
│   │   ├── dal/                   # Data access layer for models
│   │   │   ├── get-models.ts      # Returns `{ result, isAuthenticated }`; parallel search + user, batched like slugs
│   │   │   ├── search-models.ts   # Unified search function (handles search with optional query, category filtering, and listing)
│   │   │   └── search-models-api.ts  # API-specific search function (avoids cache components)
│   │   ├── queries/               # Model data queries
│   │   │   ├── get-all-model-slugs.ts
│   │   │   ├── get-model-by-slug.ts
│   │   │   ├── get-model-by-slug-api.ts  # API-specific query (avoids cache components)
│   │   │   ├── get-model-with-like-status.ts  # getHasLikedStatus (single) + getLikedSlugsForUser (batch)
│   │   │   ├── get-models-count.ts  # Count query for pagination (uses SQL builder syntax, optional search/category)
│   │   │   └── get-models-list.ts   # List query with optional search and category filters (uses RQBv2 object syntax)
│   │   ├── search-params.ts       # Type-safe search params for models
│   │   └── types.ts               # Model type definitions
│   └── pagination/               # Pagination feature
│       ├── components/           # Pagination components
│       │   ├── pagination-offset-transition.tsx # View transition helpers for pagination
│       │   ├── pagination-skeleton.tsx # Pagination skeleton state
│       │   └── pagination.tsx    # Pagination component with nuqs integration and ViewTransition support
│       ├── dal/                  # Data access layer for pagination
│       │   └── paginate-items.ts  # Pagination helper function
│       ├── utils/                # Pagination utilities
│       │   └── to-paginated-result.ts
│       ├── pagination-search-params.ts  # Pagination search params
│       ├── constants.ts          # Pagination constants (DEFAULT_PAGE, DEFAULT_LIMIT, LIMITS, SORT_ORDERS)
│       └── types.ts              # Pagination type definitions (includes PaginationProps, NuqsPaginationProps, PaginationType, etc.)
├── constants.ts                 # Shared constants (EMPTY_LIST_LENGTH)
├── components/                   # Shared/generic components
│   ├── form/                     # Form-related components
│   │   ├── field-errors.tsx      # Field error display component
│   │   └── form-error.tsx        # Form-level error display component
│   ├── generic-component.tsx     # Generic wrapper component
│   ├── nav-link.tsx              # NavLink + NavLinkListItem; active route styling (client)
│   ├── top-link.tsx              # Top-of-page skip / scroll control for layouts
│   ├── not-found/                # Unsuccessful state components
│   │   ├── unsuccessful-state-list-item.tsx  # List item component for unsuccessful states
│   │   └── unsuccessful-state.tsx            # Unified component for not-found and error states
│   ├── pill.tsx                  # Reusable pill component
│   ├── search-input-skeleton.tsx # Skeleton loader for search input
│   ├── search-input.tsx          # Search input component with URL state
│   ├── streamable.tsx            # Streaming utilities
│   └── suspend.tsx               # Suspense helper; optional React `ViewTransition` wrapper
├── db/                          # Database configuration
│   ├── schema/                  # Database schema definitions
│   │   ├── auth.ts              # Authentication tables
│   │   ├── likes.ts             # Likes table
│   │   ├── models.ts            # Models and categories tables
│   │   ├── relations.ts         # Table relations (Drizzle ORM v1 beta)
│   │   └── index.ts             # Schema exports
│   ├── seed-data/               # Seed data
│   │   ├── categories.ts
│   │   └── models.ts
│   ├── seed.ts                  # Database seeding script
│   ├── drop-tables.ts           # Drop all tables script
│   └── index.ts                 # Database connection
├── lib/                         # Utility libraries
│   ├── api.ts                   # ElysiaJS app instance
│   ├── auth.ts                  # Better Auth configuration
│   ├── auth-client.ts           # Better Auth client instance
│   └── date.ts                  # Date utilities
├── types/                       # Type definitions
│   └── index.ts                 # Shared types (Maybe<T>, SearchParamsProps, NavLinkProps, GenericComponentProps, FieldErrorProps, UnsuccessfulStateProps, etc.)
├── utils/                       # Utility functions
│   ├── cache-invalidation.ts    # Cache invalidation utilities
│   ├── env.ts                   # Environment variable validation (Valibot)
│   ├── to-action-state.ts       # Action state utilities for server actions
│   └── try-catch.ts             # Error handling utilities
├── global.d.ts                  # Global TypeScript declarations
└── proxy.ts                     # Next.js proxy middleware
```

## 🏗️ Architecture Overview

### Feature-Based Organization
The project follows a feature-based architecture where related functionality is co-located:

- **`features/models/`**: All model-related components, actions, queries, and search params
- **`features/categories/`**: All category-related components and data queries
- **`features/pagination/`**: Pagination utilities, types, and components shared across features
- **`features/auth/`**: Authentication actions, components, queries, and types
- **`components/`**: Shared components used across features (including navigation)

### Directory Conventions
- **`_` prefix**: Private folders that are not part of Next.js routing
- **`features/`**: Feature-based modules with their own components and queries
- **`components/`**: Shared/generic components used across features
- **`db/seed-data/`**: Explicitly named seed data files

### Performance Optimizations
- **NuqsAdapter**: Scoped to `/3d-models` layout only (not root layout) for reduced overhead on routes that don't use URL state management
- **Font Loading**: Only required font weights are loaded (Albert Sans: 400,500,600,700; Montserrat Alternates: 400,600,700)
- **Error Handling**: Centralized `tryCatch` utility for consistent error handling across database queries
- **Cache Components**: Uses `"use cache"`, `"use cache: remote"`, and `"use cache: private"` directives for persistent caching; React `cache()` is used only for functions called multiple times in the same render pass (e.g., `getModelBySlug` and `getCategoryBySlug` called in both `generateMetadata` and page components)
- **Type Safety**: `Maybe<T>` type helper used consistently across all query functions for nullable return types; centralized type definitions in `src/types/index.ts` and feature-specific `types.ts` files for better organization and reusability
- **Query Builder**: Migrated to Drizzle ORM RQBv2 for simple relational queries (`db.query.tableName.findMany/findFirst`) with object-based `where` clauses; complex queries and mutations remain on SQL builder
- **Error Recovery**: Error boundaries with `error.tsx` for failed queries (results, category pages, and model detail pages) with built-in `reset()` retry functionality and helpful error guidance
- **Database Query Separation**: Database queries return raw `DatabaseQueryResult<T>`; transformation to `PaginatedResult<T>` happens in higher-level functions using `transformToPaginatedResult` utility from `features/pagination/utils/`
- **View Transitions**: Composable CSS animations using base fade and slide keyframes with CSS variables for slide distance, enabling smooth directional page transitions (enter-left, exit-left, enter-right, exit-right) for pagination

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Neon database account (or any PostgreSQL database)

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

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   # Site Configuration
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"  # or your production URL
   
   # Better Auth Configuration
   BETTER_AUTH_SECRET="your-secret-key-here-change-this-in-production"  # Main secret used by Better Auth and cookie cache
   AUTH_DRIZZLE_URL="http://localhost:3000"  # Required public site URL (validated; use same origin as NEXT_PUBLIC_SITE_URL)
   
   # GitHub OAuth
   GITHUB_CLIENT_ID="your-github-oauth-client-id"
   GITHUB_CLIENT_SECRET="your-github-oauth-client-secret"
   
   # Database
   DATABASE_URL="your-neon-database-connection-string"
   
   # Optional: Redis (for remote cache handler, if enabled)
   # REDIS_API_KEY="your-redis-connection-string"
   ```
   
   **Note**: `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET`, `BETTER_AUTH_SECRET`, `AUTH_DRIZZLE_URL`, and `DATABASE_URL` are validated at startup in `src/utils/env.ts`. Set `NEXT_PUBLIC_SITE_URL` as well; it is used for Better Auth `baseURL` and API CORS but is not part of that schema. See `docs/AUTH_SETUP.md` for detailed setup instructions.

4. **Database Setup**
   ```bash
   # Push schema to Neon database
   bunx drizzle-kit push
   
   # Note: Users must be created manually (via sign-up or Better Auth admin)
   # Seed the database with initial data (requires existing users)
   bun run db:seed
   ```
   
   Alternatively, if you want to generate migrations:
   ```bash
   bunx drizzle-kit generate
   bunx drizzle-kit migrate
   bun run db:seed
   ```

5. **Start the development server**
   ```bash
   bun run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📊 Database Schema

### Categories Table
- `id`: Primary key (auto-increment)
- `displayName`: Human-readable category name
- `slug`: URL-friendly identifier (unique)

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

- `bunx drizzle-kit generate` (or `bun run db:generate`) - Generate new migration files
- `bunx drizzle-kit migrate` (or `bun run db:migrate`) - Run pending migrations
- `bunx drizzle-kit push` (or `bun run db:push`) - Push schema changes directly to database
- `bunx drizzle-kit studio` (or `bun run db:studio`) - Open Drizzle Studio for database management
- `bun run db:seed` - Seed database with initial data
- `bun run db:drop` - Drop all tables (useful for development reset)

### Database Relations
The application uses Drizzle ORM v1 (beta) with `defineRelations` for type-safe relations:
- Relations defined using the new v1 beta syntax with `r.one()` and `r.many()` helpers
- Relation names avoid conflicts with column names (e.g., `modelLikes` instead of `likes` to avoid conflict with `models.likes` column)
- All relations exported from `schema/relations.ts` and included in the database schema

### Query Builder (RQBv2)
The application uses Drizzle ORM's Relational Query Builder v2 (RQBv2) for type-safe relational queries:
- **Read queries**: All read queries use RQBv2 syntax (`db.query.tableName.findMany()`, `db.query.tableName.findFirst()`) with object-based `where` clauses, including complex conditions with `OR: []`, `AND: []`, `NOT: {}`, and column filters like `{ column: { eq: value, ilike: pattern } }` for better type safety and developer experience
- **Count queries**: Count queries use `db.$count()` (RQBv2), with where conditions passed using SQL builder syntax (`and()`, `or()`, `ilike()`, etc.) since `$count` accepts SQL builder conditions
- **Mutations**: Insert, update, and delete operations use the SQL builder syntax (mutations not yet available in RQBv2)
- **Hybrid approach**: The codebase uses a hybrid strategy - RQBv2 object syntax for all read queries (including complex conditions with `AND`/`OR` arrays), SQL builder for count where conditions and mutations
- **Query organization**: Model queries are split into focused functions (`get-models-list.ts` for listing with RQBv2, `get-models-count.ts` for counting with SQL builder) and composed in higher-level DAL functions like `search-models.ts` in the `dal/` directory. Both helper functions support optional `searchPattern` and `category` parameters for flexible querying
- **Note**: Better Auth's `drizzleAdapter` currently has compatibility issues with RQBv2, showing errors about unknown relational filter fields (e.g., "decoder"). Experimental joins have been disabled for Drizzle v1 compatibility. Both email/password and GitHub OAuth authentication are fully functional. The application will continue using RQBv2 for queries as Better Auth is expected to update their adapter soon. Better Auth API routes are handled via ElysiaJS at `/api/[[...slugs]]/route.ts` with the auth handler at Better Auth `basePath` `/api/auth`; Better Auth routes are included in the OpenAPI documentation via `better-auth-openapi.ts`. To avoid Cache Components interfering with API handlers, Elysia calls dedicated `*-api` query helpers (e.g., `search-models-api.ts`, `get-model-by-slug-api.ts`) instead of using the same functions that back server components.

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
- **Like Status**: `getHasLikedStatus` uses `"use cache: private"` for user-specific like status (cached on device)
- **Model Lists**: `get-models.ts` adds `hasLiked` per model after a single batched like query for the page
- **Invalidation**: Centralized utilities in `utils/cache-invalidation.ts` with on-demand invalidation via `invalidateModel()`
- **Optimistic Updates**: Heart button uses `useOptimistic` for immediate UI feedback with server state synchronization via form actions

## 🎨 Styling & Components

### Design System
- **Colors**: Custom color palette with orange accent (Tailwind CSS classes, no shadcn/ui dependencies)
- **Typography**: Consistent font hierarchy
- **Spacing**: Systematic spacing using Tailwind utilities
- **Responsive**: Mobile-first responsive design

### Key Components

#### Feature Components
- `features/models/components/model-card` - Individual model display card
- `features/models/components/model-card-skeleton` - Loading skeleton for model cards
- `features/models/components/model-detail` - Detailed model view page
- `features/models/components/models-grid` - Grid layout for model cards
- `features/models/components/models-not-found` - Cached component for displaying no search results with helpful suggestions
- `features/models/components/models-view` - Shared server shell: `Suspense` + async inner that awaits `getModels`; pagination uses `PaginationOffsetTransition` for directional View Transitions
- `features/pagination/components/pagination` - Reusable pagination component with nuqs integration and ViewTransition support
- `features/models/components/heart-button/heart-button-client` - Client component with form action, unified optimistic like/count state, View Transition types for count changes
- `features/models/components/heart-button/likes-count-transition` - Wraps like count with `ViewTransition` update names for increase/decrease
- `features/models/components/heart-button/heart-button-server` - Server component for detail pages (resolves like status server-side)
- `features/models/components/heart-button/heart-button-skeleton` - Loading skeleton for heart button
- `components/search-input` - Model search functionality with URL state
- `features/categories/components/categories-nav` - Category filtering sidebar (server component)
- `app/3d-models/@categories/error.tsx` - Error boundary for categories with built-in retry functionality
- `app/3d-models/@results/error.tsx` - Error boundary for search results with retry and error guidance
- `app/3d-models/@results/loading.tsx` - Loading state for search results
- `app/3d-models/categories/[categoryName]/error.tsx` - Error boundary for category pages with retry and error guidance
- `app/3d-models/categories/[categoryName]/loading.tsx` - Loading state for category pages
- `app/3d-models/[slug]/error.tsx` - Error boundary for model detail pages with retry and error guidance

#### Navigation Components
- `app/@navbar/default` - Navbar parallel route with auth integration
- `app/@navbar/error.tsx` - Error boundary for navbar with retry functionality
- `app/@footer/default` - Footer parallel route with copyright
- `components/nav-link` - `NavLink` (link with active state) and `NavLinkListItem` (`li` + `NavLink`); matching (`includes` or `endsWith`), border position (`bottom` or `left`) (client component)
- `components/top-link` - Top-of-page control used in layouts
- `features/auth/components/auth-buttons` - Authentication buttons with user avatar (GitHub image priority, icon fallback)
- `features/auth/components/auth-buttons-skeleton` - Navbar auth slot loading state
- `features/auth/components/avatar` - Avatar image with fallback

#### Shared Components
- `components/form/field-errors` - Field-level error display component with ViewTransition support
- `components/form/form-error` - Form-level error display component with ViewTransition support
- `components/not-found/unsuccessful-state` - Unified component for not-found and error states with conditional styling based on `isError` prop
- `components/not-found/unsuccessful-state-list-item` - List item component for unsuccessful state suggestions
- `components/pill` - Small label component
- `components/streamable` - Streaming utilities for progressive rendering
- `components/suspend` - Suspense helper component
- `components/generic-component` - Generic wrapper for collections

#### Authentication & Data Access
- `lib/auth` - Better Auth configuration with email/password and GitHub OAuth
- `lib/auth-client` - Better Auth client instance for client-side usage
- `features/auth/actions` - Sign-in, sign-up, and sign-out server actions with Valibot validation
- `features/auth/components/has-auth` - Generic auth component with session provider and Suspense wrapper
- `features/auth/constants` - Validation constants (password length, email length, name length limits)
- `features/auth/queries/get-user` - User query with cache directives (returns user from session)
- `features/auth/components/sign-in-button` - GitHub OAuth sign-in button
- `utils/to-action-state` - Action state utilities for consistent server action responses
- `components/form/field-errors` - Reusable field error component used in auth forms
- `components/form/form-error` - Reusable form-level error component used in auth forms

## 🔧 Development

### Code Quality Tools

- **Biome**: Linting and formatting
- **tsgo**: TypeScript type checking
- **TypeScript**: Static type checking

### Available Scripts

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

### Code Style

The project follows a consistent coding style with:
- ES modules (import/export syntax)
- TypeScript for type safety
- Tailwind CSS for styling
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

Ensure these are set in your deployment environment:
- `NEXT_PUBLIC_SITE_URL`: Your public application URL (e.g., `https://yourdomain.com`)
- `BETTER_AUTH_SECRET`: Main secret used by Better Auth and cookie cache
- `AUTH_DRIZZLE_URL`: Public app URL (required; validated with `DATABASE_URL` and auth secrets in `src/utils/env.ts`)
- `GITHUB_CLIENT_ID`: Your GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET`: Your GitHub OAuth client secret
- `DATABASE_URL`: Your Neon database connection string
- `REDIS_API_KEY` (optional): Redis connection string for remote cache handler, if used

Required secrets and URLs in `src/utils/env.ts` are validated at startup with Valibot. Also set `NEXT_PUBLIC_SITE_URL` for Better Auth and CORS (see `src/lib/auth.ts` and `src/app/api/[[...slugs]]/route.ts`).

## 📝 Data Management

### Adding New Models

1. Update `src/db/seed-data/models.ts` with new model data (note: `userId` and `likes` are omitted from seed data)
2. Run `bun run db:seed` to update the database (requires existing users in the database)

### Adding New Categories

1. Update `src/db/seed-data/categories.ts` with new category data
2. Run `bun run db:seed` to update the database

### Cache Management

- Use centralized cache invalidation utilities in `utils/cache-invalidation.ts`
- Functions: `invalidateAllModels()`, `invalidateModel(slug)`, `invalidateCategory(slug)`
- Cache tags provide granular control over what gets invalidated
- Automatic cache invalidation on data mutations (e.g., `toggleLike` invalidates model cache)
- Session cache uses `"use cache: private"` directive with `cacheTag("session")` for responsive auth state
- Like status uses `getHasLikedStatus` with `"use cache: private"` for user-specific cache

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
