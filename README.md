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

- **Framework**: Next.js 16 with App Router, Cache Components, and PPR (Partial Prerendering)
- **Language**: TypeScript with React 19
- **Styling**: Tailwind CSS v4
- **Database**: Neon (PostgreSQL) with Drizzle ORM
- **Authentication**: NextAuth.js v5 with Google OAuth
- **Search Params**: nuqs for type-safe URL state management
- **Linting & Formatting**: Biome with Ultracite rules
- **Type Checking**: tsgo
- **Package Manager**: Bun
- **Build Tool**: Turbopack with view transitions

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── _navigation/              # Private navigation components
│   │   ├── auth-buttons.tsx
│   │   ├── navbar.tsx
│   │   └── nav-link.tsx
│   ├── 3d-models/                # 3D models routes
│   │   ├── @categories/          # Parallel route for categories nav
│   │   ├── @results/             # Parallel route for search results
│   │   ├── [id]/                 # Individual model page
│   │   ├── categories/           # Category-specific pages
│   │   ├── layout.tsx            # Models layout
│   │   └── page.tsx              # Models listing page
│   ├── about/                    # About page
│   ├── auth/                     # Authentication routes
│   ├── api/                      # API routes
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── dal/                          # Data access layer
│   └── auth-helpers.ts           # Authentication utilities
├── features/  
│   ├── models/                   # Models feature
│   │   ├── actions/              # Server actions
│   │   │   ├── likes.ts
│   │   │   └── search-actions.ts
│   │   ├── components/           # Model-specific components
│   │   │   ├── heart-button-server.tsx # Server component
│   │   │   ├── heart-button-client.tsx # Client component
│   │   │   ├── heart-button-skeleton.tsx
│   │   │   ├── model-card.tsx
│   │   │   ├── models-grid.tsx
│   │   │   └── search-input.tsx
│   │   ├── queries/              # Model data queries
│   │   │   ├── get-all-models.ts
│   │   │   ├── get-model-by-id.ts
│   │   │   ├── get-model-with-like-status.ts
│   │   │   ├── get-models-by-category.ts
│   │   │   └── search-models.ts
│   │   ├── schemas/              # Validation schemas
│   │   │   └── search-schemas.ts
│   │   ├── utils/                # Model utilities
│   │   │   └── cache-invalidation.ts
│   │   └── search-params.ts      # Type-safe search params
│   └── categories/               # Categories feature
│       ├── components/           # Category-specific components
│       │   ├── categories-nav.tsx
│       │   └── categories-nav-client.tsx
│       └── queries/              # Category data queries
│           ├── get-all-categories.ts
│           ├── get-category-by-slug.ts
├── components/                   # Shared/generic components
│   ├── pill.tsx                  # Reusable pill component
│   ├── streamable.tsx            # Streaming utilities
│   └── generic-component.tsx     # Generic wrapper component
├── db/                          # Database configuration
│   ├── schema/                  # Database schema definitions (split files)
│   │   ├── auth.ts              # Authentication tables
│   │   ├── likes.ts             # Likes table
│   │   ├── models.ts            # Models and categories tables
│   │   └── relations.ts         # Table relations
│   ├── seed-data/               # Seed data
│   │   ├── categories.ts
│   │   └── models.ts
│   ├── seed.ts                  # Database seeding script
│   └── index.ts                 # Database connection (merges schemas)
├── lib/                         # Utility functions
│   ├── auth.ts                  # NextAuth configuration
│   └── date.ts                  # Date utilities
└── types/                       # Type definitions
    └── index.ts                 # Shared types
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
   AUTH_GOOGLE_ID="your-google-oauth-client-id"
   AUTH_GOOGLE_SECRET="your-google-oauth-client-secret"
   ```

4. **Database Setup**
   ```bash
   # Push schema to Neon database
   bunx drizzle-kit push
   
   # Seed the database with initial data
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
- `id`: Primary key (auto-increment)
- `name`: Model name
- `description`: Model description
- `likes`: Number of likes (counter)
- `image`: Image URL
- `categorySlug`: Foreign key to categories.slug
- `dateAdded`: Timestamp when model was added

### Likes Table
- `id`: Primary key (auto-increment)
- `userId`: Foreign key to users.id (cascade delete)
- `modelId`: Foreign key to models.id (cascade delete)
- `createdAt`: Timestamp when like was created
- Unique constraint on `(userId, modelId)` pair

### Authentication Tables (NextAuth.js)
- `users`: User accounts
- `accounts`: OAuth provider accounts
- `sessions`: User sessions
- `verificationTokens`: Email verification tokens
- `authenticators`: WebAuthn authenticators

## 🗄️ Database Operations

### Available Scripts

- `bunx drizzle-kit generate` (or `bun run db:generate`) - Generate new migration files
- `bunx drizzle-kit migrate` (or `bun run db:migrate`) - Run pending migrations
- `bunx drizzle-kit push` (or `bun run db:push`) - Push schema changes directly to database
- `bunx drizzle-kit studio` (or `bun run db:studio`) - Open Drizzle Studio for database management
- `bun run db:seed` - Seed database with initial data

### Caching Strategy

The application uses Next.js cache with granular cache tags for efficient invalidation:
- **Models**: Cached with `models`, `model-{id}`, and `models-category-{slug}` tags
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
- `features/models/components/model-card` - Individual model display
- `features/models/components/models-grid` - Grid layout for model cards
- `features/models/components/heart-button` - Server component for like/unlike (fetches auth & like status)
- `features/models/components/heart-button-client` - Client component for like interactions
- `features/models/components/search-input` - Model search functionality
- `features/categories/components/categories-nav` - Category filtering sidebar

#### Navigation Components
- `app/_navigation/navbar` - Main navigation
- `app/_navigation/nav-link` - Navigation link with active state
- `app/_navigation/auth-buttons` - Authentication buttons

#### Shared Components
- `components/pill` - Small label component
- `components/streamable` - Streaming utilities for progressive rendering
- `components/generic-component` - Generic wrapper for collections

#### Authentication & Data Access
- `lib/auth` - NextAuth v5 configuration with Google OAuth
- `dal/auth-helpers` - Authentication utilities and helpers

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
- `bun run typegen` - Generate types with Next.js and tsgo
- `bun run db:generate` - Generate Drizzle migrations
- `bun run db:migrate` - Run Drizzle migrations
- `bun run db:push` - Push schema directly to database
- `bun run db:studio` - Open Drizzle Studio
- `bun run db:seed` - Seed database with initial data

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
- `AUTH_GOOGLE_ID`: Your Google OAuth client ID
- `AUTH_GOOGLE_SECRET`: Your Google OAuth client secret

## 📝 Data Management

### Adding New Models

1. Update `src/db/seed-data/models.ts` with new model data
2. Run `bun run db:seed` to update the database

### Adding New Categories

1. Update `src/db/seed-data/categories.ts` with new category data
2. Run `bun run db:seed` to update the database

### Cache Management

- Use centralized cache invalidation utilities in `features/models/utils/cache-invalidation.ts`
- Functions: `invalidateAllModels()`, `invalidateModel(id)`, `invalidateCategory(slug)`
- Cache tags provide granular control over what gets invalidated
- Automatic cache invalidation on data mutations

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
