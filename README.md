# 3D Models Gallery

A modern web application for browsing and discovering 3D models, built with Next.js, TypeScript, and Drizzle ORM.

## 🚀 Features

- **Browse 3D Models**: View a curated collection of 3D models across various categories
- **Category Filtering**: Filter models by category (3D Printer, Art, Education, Fashion, etc.)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Type-Safe Database**: Full TypeScript support with Drizzle ORM
- **Performance Optimized**: Caching for frequently accessed data
- **Modern Stack**: Built with Next.js 16, TypeScript, and Tailwind CSS
- **Feature-Based Architecture**: Well-organized codebase with clear separation of concerns

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.17-38B2AC?logo=tailwind-css)
![Drizzle ORM](https://img.shields.io/badge/Drizzle-0.44.7-FFE66D?logo=postgresql)
![Better Auth](https://img.shields.io/badge/Better%20Auth-1.4.1-000000?logo=next.js)
![Biome](https://img.shields.io/badge/Biome-2.3.7-60A5FA?logo=biome)
[![Formatted with Biome](https://img.shields.io/badge/Formatted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev/)
[![Linted with Biome](https://img.shields.io/badge/Linted_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

- **Framework**: Next.js 16.0.3 with App Router, Cache Components, and PPR (Partial Prerendering)
- **Language**: TypeScript 5.9.3 with React 19.2.0
- **Styling**: Tailwind CSS v4.1.17
- **Database**: Neon (PostgreSQL) with Drizzle ORM 0.44.7
- **Authentication**: Better Auth 1.4.1 with email/password and GitHub OAuth
- **Search Params**: nuqs 2.8.1 for type-safe URL state management
- **Linting & Formatting**: Biome 2.3.7 with Ultracite 6.3.6 rules
- **Type Checking**: tsgo (TypeScript Native Preview)
- **Package Manager**: Bun
- **Build Tool**: Turbopack with view transitions and MCP server
- **Validation**: Valibot 1.1.0 for schema validation

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── _navigation/              # Private navigation components
│   │   ├── auth-buttons.tsx
│   │   └── nav-link.tsx
│   ├── @navbar/                  # Parallel route for navbar
│   │   └── default.tsx
│   ├── @footer/                  # Parallel route for footer
│   │   └── default.tsx
│   ├── 3d-models/                # 3D models routes
│   │   ├── @categories/          # Parallel route for categories nav
│   │   │   └── default.tsx
│   │   ├── @results/             # Parallel route for search results
│   │   │   ├── default.tsx
│   │   │   └── page.tsx
│   │   ├── [slug]/               # Individual model page
│   │   │   ├── not-found.tsx
│   │   │   └── page.tsx
│   │   ├── categories/           # Category-specific pages
│   │   │   └── [categoryName]/
│   │   │       ├── not-found.tsx
│   │   │       └── page.tsx
│   │   ├── layout.tsx            # Models layout
│   │   └── page.tsx              # Models listing page
│   ├── about/                    # About page
│   │   └── page.tsx
│   ├── (auth)/                   # Authentication group route
│   │   ├── layout.tsx            # Centered auth layout
│   │   ├── signin/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── api/                      # API routes
│   │   └── auth/
│   │       └── [...all]/
│   │           └── route.ts      # Better Auth API handler
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── assets/                       # Static assets
│   └── images/                   # Image files
│       ├── hero-image.png
│       ├── hero-image-square.png
│       └── placeholder.png
├── features/  
│   ├── auth/                     # Authentication feature
│   │   ├── actions/              # Server actions
│   │   │   ├── sign-in-action.ts
│   │   │   ├── sign-out-action.ts
│   │   │   └── sign-up-action.ts
│   │   ├── components/           # Auth components
│   │   │   └── sign-in-button.tsx
│   │   ├── queries/              # Auth queries
│   │   │   └── get-session.ts
│   │   └── types.ts              # Auth type definitions
│   ├── models/                   # Models feature
│   │   ├── actions/              # Server actions
│   │   │   ├── likes.ts
│   │   │   └── search-actions.ts
│   │   ├── components/           # Model-specific components
│   │   │   ├── heart-button-server.tsx
│   │   │   ├── heart-button-client.tsx
│   │   │   ├── heart-button-skeleton.tsx
│   │   │   ├── model-card.tsx
│   │   │   ├── model-detail.tsx
│   │   │   ├── models-grid.tsx
│   │   │   ├── models-grid-skeleton.tsx
│   │   │   ├── models-not-found.tsx
│   │   │   └── search-input.tsx
│   │   ├── queries/              # Model data queries
│   │   │   ├── get-all-model-slugs.ts
│   │   │   ├── get-model-by-slug.ts
│   │   │   ├── get-model-with-like-status.ts
│   │   │   ├── get-models-by-category.ts
│   │   │   └── search-models.ts
│   │   ├── schemas/              # Validation schemas (Valibot)
│   │   │   └── search-schemas.ts
│   │   └── search-params.ts       # Type-safe search params
│   └── categories/               # Categories feature
│       ├── components/           # Category-specific components
│       │   ├── categories-header.tsx
│       │   └── categories-nav-client.tsx
│       └── queries/              # Category data queries
│           ├── get-all-categories.ts
│           ├── get-all-category-slugs.ts
│           └── get-category-by-slug.ts
├── components/                   # Shared/generic components
│   ├── generic-component.tsx     # Generic wrapper component
│   ├── has-auth.tsx              # Generic auth component with Stream
│   ├── loading-dots.tsx          # Loading indicator component
│   ├── not-found-list-item.tsx   # List item component for not-found pages
│   ├── not-found.tsx             # Reusable not-found page component
│   ├── pill.tsx                  # Reusable pill component
│   └── streamable.tsx            # Streaming utilities
├── db/                          # Database configuration
│   ├── schema/                  # Database schema definitions
│   │   ├── auth.ts              # Authentication tables
│   │   ├── likes.ts             # Likes table
│   │   ├── models.ts            # Models and categories tables
│   │   └── relations.ts         # Table relations
│   ├── seed-data/               # Seed data
│   │   ├── categories.ts
│   │   └── models.ts
│   ├── seed.ts                  # Database seeding script
│   ├── drop-tables.ts           # Drop all tables script
│   └── index.ts                 # Database connection
├── lib/                         # Utility libraries
│   ├── auth.ts                  # Better Auth configuration
│   ├── auth-client.ts           # Better Auth client instance
│   └── date.ts                  # Date utilities
├── types/                       # Type definitions
│   └── index.ts                 # Shared types (Maybe<T>, WithLike<T>, ModelWithLike)
├── utils/                       # Utility functions
│   ├── cache-invalidation.ts    # Cache invalidation utilities
│   ├── to-action-state.ts       # Action state utilities for server actions
│   └── try-catch.ts             # Error handling utilities
└── proxy.ts                     # Next.js proxy middleware
```

## 🏗️ Architecture Overview

### Feature-Based Organization
The project follows a feature-based architecture where related functionality is co-located:

- **`features/models/`**: All model-related components, actions, queries, and search params
- **`features/categories/`**: All category-related components and data queries
- **`app/_navigation/`**: Private navigation components (not part of routing)

### Directory Conventions
- **`_` prefix**: Private folders that are not part of Next.js routing
- **`features/`**: Feature-based modules with their own components and queries
- **`components/`**: Shared/generic components used across features
- **`db/seed-data/`**: Explicitly named seed data files

### Performance Optimizations
- **NuqsAdapter**: Scoped to `/3d-models` layout only (not root layout) for reduced overhead on routes that don't use URL state management
- **Font Loading**: Only required font weights are loaded (Albert Sans: 400,500,600,700; Montserrat Alternates: 400,600,700)
- **Error Handling**: Centralized `tryCatch` utility for consistent error handling across database queries
- **Cache Components**: Uses "use cache" directive for persistent caching; React `cache()` is used only for functions called multiple times in the same render pass (e.g., `getModelBySlug` and `getCategoryBySlug` called in both `generateMetadata` and page components)
- **Type Safety**: `Maybe<T>` type helper used consistently across all query functions for nullable return types

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
   DATABASE_URL="your-neon-database-connection-string"
   GITHUB_CLIENT_ID="your-github-oauth-client-id"
   GITHUB_CLIENT_SECRET="your-github-oauth-client-secret"
   AUTH_URL="http://localhost:3000"  # or your production URL
   NEXT_PUBLIC_APP_URL="http://localhost:3000"  # or your production URL
   ```

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

### Cache Components
The application uses Next.js Cache Components for optimal performance:
- Static content is pre-rendered at build time
- Dynamic content (like authentication state) is rendered at request time
- Server components use `connection()` to opt into dynamic rendering when needed
- Cache invalidation handled by `cacheTag` utilities

### Caching Strategy

The application uses Next.js cache with granular cache tags for efficient invalidation:
- **Models**: Cached with `models`, `model-{slug}`, and `models-category-{slug}` tags
- **Categories**: Cached with `categories` tag
- **Cache Life**: 1 hour for most queries, weeks for static categories
- **Invalidation**: Centralized utilities in `features/models/utils/cache-invalidation.ts`

## 🎨 Styling & Components

### Design System
- **Colors**: Custom color palette with orange accent
- **Typography**: Consistent font hierarchy
- **Spacing**: Systematic spacing using Tailwind utilities
- **Responsive**: Mobile-first responsive design

### Key Components

#### Feature Components
- `features/models/components/model-card` - Individual model display card
- `features/models/components/model-detail` - Detailed model view page
- `features/models/components/models-grid` - Grid layout for model cards
- `features/models/components/models-not-found` - Cached component for displaying no search results with helpful suggestions
- `features/models/components/heart-button-server` - Server component for like/unlike (fetches auth & like status)
- `features/models/components/heart-button-client` - Client component for like interactions
- `features/models/components/search-input` - Model search functionality with URL state
- `features/categories/components/categories-nav-client` - Category filtering sidebar

#### Navigation Components
- `app/@navbar/default` - Navbar parallel route with auth integration
- `app/@footer/default` - Footer parallel route with copyright
- `app/_navigation/nav-link` - Navigation link with active state
- `app/_navigation/auth-buttons` - Authentication buttons

#### Shared Components
- `components/has-auth` - Generic auth component that handles authentication with Stream internally
- `components/not-found` - Reusable not-found page component with centered layout and context-specific messaging
- `components/not-found-list-item` - List item component for not-found page suggestions
- `components/pill` - Small label component
- `components/streamable` - Streaming utilities for progressive rendering
- `components/generic-component` - Generic wrapper for collections

#### Authentication & Data Access
- `lib/auth` - Better Auth configuration with email/password and GitHub OAuth
- `lib/auth-client` - Better Auth client instance for client-side usage
- `features/auth/actions` - Sign-in, sign-up, and sign-out server actions with Valibot validation
- `features/auth/queries/get-session` - Session query with cache directives
- `features/auth/components/sign-in-button` - GitHub OAuth sign-in button
- `utils/to-action-state` - Action state utilities for consistent server action responses

## 🔧 Development

### Code Quality Tools

- **Biome**: Linting and formatting
- **tsgo**: TypeScript type checking
- **TypeScript**: Static type checking

### Available Scripts

- `bun run dev` - Start development server with Turbopack
- `bun run build` - Build for production
- `bun run build:debug` - Build with debug prerender information
- `bun run start` - Start production server
- `bun run lint` - Run Biome linter
- `bun run lint:fix` - Fix linting issues automatically
- `bun run lint:unsafe` - Fix linting issues including unsafe fixes
- `bun run format` - Format code with Biome
- `bun run typegen` - Generate Next.js routes and run tsgo type checking
- `bun run db:generate` - Generate Drizzle migrations
- `bun run db:migrate` - Run Drizzle migrations
- `bun run db:push` - Push schema directly to database
- `bun run db:studio` - Open Drizzle Studio
- `bun run db:seed` - Seed database with initial data
- `bun run db:drop` - Drop all tables (development reset)

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

### Environment Variables

Ensure these are set in your deployment environment:
- `DATABASE_URL`: Your Neon database connection string
- `GITHUB_CLIENT_ID`: Your GitHub OAuth client ID
- `GITHUB_CLIENT_SECRET`: Your GitHub OAuth client secret
- `AUTH_URL`: Your application URL (e.g., `https://yourdomain.com`)
- `NEXT_PUBLIC_APP_URL`: Your public application URL

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
- Automatic cache invalidation on data mutations
- Session cache uses `"use cache: private"` directive with `cacheTag("session")` for responsive auth state

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
