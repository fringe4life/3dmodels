# 3D Models Gallery

A modern web application for browsing and discovering 3D models, built with Next.js, TypeScript, and Drizzle ORM.

## 🚀 Features

- **Browse 3D Models**: View a curated collection of 3D models across various categories
- **Category Filtering**: Filter models by category (3D Printer, Art, Education, Fashion, etc.)
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Type-Safe Database**: Full TypeScript support with Drizzle ORM
- **Performance Optimized**: Caching for frequently accessed data
- **Modern Stack**: Built with Next.js 15, TypeScript, and Tailwind CSS

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Database**: Neon (PostgreSQL) with Drizzle ORM
- **Linting & Formatting**: Biome
- **Type Checking**: tsgo
- **Package Manager**: Bun

## 📁 Project Structure

```
├── app/
│   ├── 3d-models/
│   │   ├── [id]/           # Individual model page
│   │   ├── categories/     # Category-specific pages
│   │   └── page.tsx        # Models listing page
│   ├── components/         # Reusable UI components
│   ├── data/              # Static data files
│   ├── db/                # Database configuration
│   │   ├── schema.ts      # Drizzle schema definitions
│   │   ├── seed.ts        # Database seeding script
│   │   └── index.ts       # Database connection
│   ├── lib/               # Utility functions
│   │   ├── models.ts      # Model data fetching
│   │   ├── categories.ts  # Category data fetching
│   │   └── cache.ts       # Caching implementation
│   └── types/             # TypeScript type definitions
├── public/                # Static assets
├── drizzle/               # Database migrations
└── package.json
```

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

The application implements a simple in-memory cache for categories with a 1-hour TTL to reduce database queries for frequently accessed data that rarely changes.

## 🎨 Styling & Components

### Design System
- **Colors**: Custom color palette with orange accent
- **Typography**: Consistent font hierarchy
- **Spacing**: Systematic spacing using Tailwind utilities
- **Responsive**: Mobile-first responsive design

### Key Components
- `Navbar` - Main navigation
- `CategoriesNav` - Category filtering sidebar
- `ModelsGrid` - Grid layout for model cards
- `ModelCard` - Individual model display
- `NavLink` - Navigation link with active state
- `Pill` - Small label component

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

## 📝 Data Management

### Adding New Models

1. Update `app/data/models.ts` with new model data
2. Run `bun run db:seed` to update the database

### Adding New Categories

1. Update `app/data/categories.ts` with new category data
2. Run `bun run db:seed` to update the database

### Cache Management

- Categories are cached for 1 hour by default
- Use `clearCategoriesCache()` function to manually clear cache
- Cache is automatically invalidated when data is stale

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Check the documentation
- Review existing issues
- Create a new issue with detailed information
