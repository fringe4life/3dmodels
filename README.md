# 3D Models Gallery

A modern web application for browsing and discovering 3D models, built with Next.js, TypeScript, and Drizzle ORM.

## 🚀 Features

- **Browse 3D Models**: View a curated collection of 3D models across various categories
- **Category Filtering**: Filter models by category (3D Printer, Art, Education, Fashion, etc.)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Type-Safe Database**: Full TypeScript support with Drizzle ORM
- **Performance Optimized**: Caching for frequently accessed data
- **Modern Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS
- **Feature-Based Architecture**: Well-organized codebase with clear separation of concerns

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router and PPR (Partial Prerendering)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Neon (PostgreSQL) with Drizzle ORM
- **Authentication**: NextAuth.js v5 with Google OAuth
- **Search Params**: nuqs for type-safe URL state management
- **Linting & Formatting**: Biome
- **Type Checking**: tsgo
- **Package Manager**: Bun
- **Build Tool**: Turbopack

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── _navigation/              # Private navigation components
│   │   ├── AuthButtons.tsx
│   │   ├── Navbar.tsx
│   │   └── NavLink.tsx
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
├── features/  
│   ├── models/                   # Models feature
│   │   ├── actions/              # Server actions
│   │   │   ├── likes.ts
│   │   │   └── search-actions.ts
│   │   ├── components/           # Model-specific components
│   │   │   ├── AdvancedSearchForm.tsx
│   │   │   ├── EnhancedSearchInput.tsx
│   │   │   ├── HeartButton.tsx
│   │   │   ├── LikeStatus.tsx
│   │   │   ├── ModelCard.tsx
│   │   │   ├── ModelsGrid.tsx
│   │   │   └── SearchInput.tsx
│   │   ├── queries/              # Model data queries (split files)
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
│       │   ├── CategoriesNav.tsx
│       │   └── CategoriesNavClient.tsx
│       └── queries/              # Category data queries (split files)
│           ├── get-all-categories.ts
│           ├── get-category-by-slug.ts
│           └── get-display-name-from-slug.ts
├── components/                   # Shared/generic components
│   └── Pill.tsx                  # Reusable pill component
├── db/                          # Database configuration
│   ├── schema/                  # Database schema definitions
│   │   ├── auth.ts              # Authentication tables
│   │   ├── likes.ts             # Likes table
│   │   ├── models.ts            # Models and categories tables
│   │   ├── relations.ts         # Table relations
│   │   └── index.ts             # Schema exports
│   ├── schema.ts                # Schema exports
│   ├── seed.ts                  # Database seeding script
│   └── index.ts                 # Database connection
├── lib/                         # Utility functions
│   ├── auth.ts                  # NextAuth configuration
│   └── date.ts                  # Date utilities
├── types/                       # Type definitions
│   └── index.ts                 # Shared types
└── middleware.ts                # Next.js middleware
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
   # Generate and run migrations
   bun run db:generate
   bun run db:push
   
   # Seed the database with initial data
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
- `likes`: Number of likes
- `image`: Image URL
- `categorySlug`: Foreign key to categories.slug
- `dateAdded`: Timestamp when model was added

## 🗄️ Database Operations

### Available Scripts

- `bun run db:generate` - Generate new migration files
- `bun run db:migrate` - Run pending migrations
- `bun run db:push` - Push schema changes directly to database
- `bun run db:studio` - Open Drizzle Studio for database management
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
- `features/models/components/ModelCard` - Individual model display
- `features/models/components/ModelsGrid` - Grid layout for model cards
- `features/models/components/HeartButton` - Like/unlike functionality
- `features/models/components/SearchInput` - Model search functionality
- `features/categories/components/CategoriesNav` - Category filtering sidebar

#### Navigation Components
- `app/_navigation/Navbar` - Main navigation
- `app/_navigation/NavLink` - Navigation link with active state

#### Shared Components
- `components/Pill` - Small label component

#### Authentication
- `lib/auth` - NextAuth configuration with Google OAuth

## 🔧 Development

### Code Quality Tools

- **Biome**: Linting and formatting
- **tsgo**: TypeScript type checking
- **TypeScript**: Static type checking

### Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Run Biome linter
- `bun run lint:fix` - Fix linting issues
- `bun run format` - Format code with Biome
- `bun run type` - Run TypeScript type checking

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
