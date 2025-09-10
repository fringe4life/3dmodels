# Using nuqs with React Server Components and useActionState

This guide demonstrates how to combine **nuqs** (URL state management) with **React Server Components (RSC)** and **useActionState** for powerful, type-safe search functionality.

## Overview

The combination provides:
- **URL State Management**: Search parameters persist in the URL for sharing and bookmarking
- **Server-Side Rendering**: SEO-friendly pages with server-side data fetching
- **Client-Side Interactivity**: Real-time updates with loading states
- **Type Safety**: Full TypeScript support across server and client

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Server Side   │    │   Client Side    │    │   URL State     │
├─────────────────┤    ├──────────────────┤    ├─────────────────┤
│ • RSC Pages     │    │ • useActionState │    │ • nuqs hooks    │
│ • Server Actions│    │ • useTransition  │    │ • URL params    │
│ • Data Fetching │    │ • Form handling  │    │ • History API   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 1. Server-Side Setup

### Search Parameters Configuration

```typescript
// src/features/models/search-params.ts
import { createSearchParamsCache, parseAsString, parseAsStringLiteral } from "nuqs/server";

// Define search parameters with type safety
export const modelsSearchParams = {
  query: parseAsString.withDefault(""),
  category: parseAsString.withDefault(""),
  sortBy: parseAsStringLiteral(['name', 'likes', 'date'] as const).withDefault('name')
};

// Create server-side cache for parsing
export const modelsSearchParamsCache = createSearchParamsCache(modelsSearchParams);
```

### Server Actions with useActionState

```typescript
// src/features/models/actions/search-actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { getModels } from '@/features/models/queries/models'

// Type for action state
export type SearchActionState = {
  message?: string
  error?: string
  results?: number
  query?: string
}

// Server action compatible with useActionState
export async function performSearch(
  prevState: SearchActionState,
  formData: FormData
): Promise<SearchActionState> {
  try {
    const query = formData.get('query') as string
    
    if (!query || query.trim().length === 0) {
      return {
        message: 'Please enter a search term',
        query: ''
      }
    }

    const allModels = await getModels()
    const filteredModels = allModels.filter(
      (model) =>
        model.name.toLowerCase().includes(query.toLowerCase()) ||
        model.description.toLowerCase().includes(query.toLowerCase())
    )

    revalidatePath('/3d-models')

    return {
      message: `Found ${filteredModels.length} models for "${query}"`,
      results: filteredModels.length,
      query: query.trim()
    }
  } catch {
    return {
      error: 'Failed to perform search. Please try again.',
      query: prevState.query || ''
    }
  }
}
```

### RSC Page Component

```typescript
// src/app/3d-models/page.tsx
import type { Metadata } from "next";
import ModelsGrid from "@/features/models/components/ModelsGrid";
import { getModels } from "@/features/models/queries/get-models";
import { modelsSearchParamsCache } from "@/features/models/search-params";

export const dynamic = "force-dynamic";

export async function generateMetadata({ searchParams }: PageProps<"/3d-models">): Promise<Metadata> {
  const { query, category, sortBy } = await modelsSearchParamsCache.parse(searchParams);

  const title = query ? `Search: ${query} | 3D Models` : "3D Models";
  const description = query 
    ? `Search results for "${query}" in our 3D printing model collection.`
    : "Browse our collection of 3D printing models. Find STL files for your next project.";

  return {
    title,
    description,
    openGraph: { title, description },
  };
}

export default async function Page({ searchParams }: PageProps<"/3d-models">) {
  const models = await getModels();
  const { query, category, sortBy } = await modelsSearchParamsCache.parse(searchParams);

  // Filter and sort models based on URL state
  let filteredModels = models;
  
  if (query) {
    filteredModels = filteredModels.filter(
      (model) =>
        model.name.toLowerCase().includes(query.toLowerCase()) ||
        model.description.toLowerCase().includes(query.toLowerCase())
    );
  }

  if (category) {
    filteredModels = filteredModels.filter(model => model.categorySlug === category);
  }

  // Sort models
  switch (sortBy) {
    case 'likes':
      filteredModels.sort((a, b) => b.likes - a.likes);
      break;
    case 'name':
      filteredModels.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case 'date':
      filteredModels.sort((a, b) => b.dateAdded.getTime() - a.dateAdded.getTime());
      break;
  }

  return (
    <>
      <ModelsGrid title="3D Models" models={filteredModels} />
    </>
  );
}
```

## 2. Client-Side Components

### Basic Search with nuqs + useActionState

```typescript
// src/features/models/components/EnhancedSearchInput.tsx
'use client'

import { useActionState, useTransition } from 'react'
import { useQueryState } from 'nuqs'
import { parseAsString } from 'nuqs'
import { performSearch, type SearchActionState } from '@/features/models/actions/search-actions'

const initialState: SearchActionState = {
  message: '',
  error: '',
  results: 0,
  query: ''
}

export function EnhancedSearchInput() {
  const [isPending, startTransition] = useTransition()
  const [state, formAction, pending] = useActionState(performSearch, initialState)
  
  // nuqs for URL state management
  const [query, setQuery] = useQueryState(
    'query',
    parseAsString.withDefault('').withOptions({
      history: 'push',
      shallow: true
    })
  )

  const handleSearch = (value: string) => {
    startTransition(() => {
      setQuery(value || null)
    })
  }

  const handleFormSubmit = (formData: FormData) => {
    const searchValue = formData.get('query') as string
    setQuery(searchValue || null)
    formAction(formData)
  }

  return (
    <div className="space-y-4">
      {/* Real-time search with nuqs */}
      <input
        type="text"
        placeholder="E.g. dragon"
        value={query || ''}
        onChange={(e) => handleSearch(e.target.value)}
        disabled={isPending}
      />
      
      {/* Form-based search with useActionState */}
      <form action={handleFormSubmit}>
        <input name="query" defaultValue={query || ''} />
        <button type="submit" disabled={pending}>
          {pending ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Action state feedback */}
      {state.message && <div className="success">{state.message}</div>}
      {state.error && <div className="error">{state.error}</div>}
    </div>
  )
}
```

### Advanced Search with Multiple Parameters

```typescript
// src/features/models/components/AdvancedSearchForm.tsx
'use client'

import { useActionState, useTransition } from 'react'
import { useQueryStates } from 'nuqs'
import { parseAsString, parseAsStringLiteral } from 'nuqs'
import { performAdvancedSearch, type SearchActionState } from '@/features/models/actions/search-actions'

const searchParams = {
  query: parseAsString.withDefault(''),
  category: parseAsString.withDefault(''),
  sortBy: parseAsStringLiteral(['name', 'likes', 'date'] as const).withDefault('name')
}

export function AdvancedSearchForm() {
  const [isPending, startTransition] = useTransition()
  const [state, formAction, pending] = useActionState(performAdvancedSearch, initialState)
  
  // nuqs for managing multiple URL parameters
  const [searchState, setSearchState] = useQueryStates(searchParams, {
    history: 'push',
    shallow: true
  })

  const handleInputChange = (field: keyof typeof searchState, value: string) => {
    startTransition(() => {
      setSearchState({ [field]: value || null })
    })
  }

  const handleFormSubmit = (formData: FormData) => {
    const query = formData.get('query') as string
    const category = formData.get('category') as string
    const sortBy = formData.get('sortBy') as string

    setSearchState({
      query: query || null,
      category: category || null,
      sortBy: sortBy || null
    })
    
    formAction(formData)
  }

  return (
    <div>
      {/* URL state display */}
      <div className="url-state">
        <p>Query: {searchState.query || 'none'}</p>
        <p>Category: {searchState.category || 'all'}</p>
        <p>Sort: {searchState.sortBy}</p>
      </div>

      {/* Search form */}
      <form action={handleFormSubmit}>
        <input name="query" defaultValue={searchState.query} />
        <select name="category" defaultValue={searchState.category}>
          <option value="">All Categories</option>
          <option value="figures">Figures</option>
          <option value="functional">Functional</option>
        </select>
        <select name="sortBy" defaultValue={searchState.sortBy}>
          <option value="name">Name</option>
          <option value="likes">Most Liked</option>
          <option value="date">Date Added</option>
        </select>
        <button type="submit" disabled={pending}>
          {pending ? 'Searching...' : 'Search'}
        </button>
      </form>

      {/* Quick filters using URL state */}
      <div className="quick-filters">
        <button onClick={() => handleInputChange('category', 'figures')}>
          Figures
        </button>
        <button onClick={() => handleInputChange('sortBy', 'likes')}>
          Most Liked
        </button>
      </div>

      {/* Action state feedback */}
      {state.message && <div className="success">{state.message}</div>}
      {state.error && <div className="error">{state.error}</div>}
    </div>
  )
}
```

## 3. Key Benefits

### URL State Management
- **Shareable URLs**: Users can share search results via URL
- **Browser History**: Back/forward navigation works correctly
- **Bookmarkable**: Search states can be bookmarked
- **SEO Friendly**: Search parameters are crawlable

### Server-Side Rendering
- **Initial Load**: Pages render with search results on first load
- **Metadata**: Dynamic meta tags based on search parameters
- **Performance**: Server-side filtering and sorting
- **Caching**: Efficient data fetching with React cache

### Client-Side Interactivity
- **Real-time Updates**: URL updates as user types
- **Loading States**: Visual feedback during operations
- **Error Handling**: Graceful error states
- **Optimistic Updates**: Immediate UI feedback

### Type Safety
- **Shared Types**: Same parsers for server and client
- **Type Inference**: Full TypeScript support
- **Runtime Validation**: Automatic parameter validation
- **IntelliSense**: Complete IDE support

## 4. Best Practices

### Performance
```typescript
// Use React cache for data fetching
export const getModels = cache(async (category?: string) => {
  // ... data fetching logic
})

// Use shallow updates for real-time search
const [query, setQuery] = useQueryState('query', {
  shallow: true,
  history: 'push'
})
```

### Error Handling
```typescript
// Return errors instead of throwing in server actions
export async function performSearch(prevState: SearchActionState, formData: FormData) {
  try {
    // ... search logic
    return { message: 'Success', results: count }
  } catch {
    return { error: 'Search failed', query: prevState.query }
  }
}
```

### Loading States
```typescript
// Combine useTransition with useActionState
const [isPending, startTransition] = useTransition()
const [state, formAction, pending] = useActionState(performSearch, initialState)

// Use both for different loading scenarios
const isLoading = isPending || pending
```

### URL Synchronization
```typescript
// Keep URL and form state in sync
const handleFormSubmit = (formData: FormData) => {
  const query = formData.get('query') as string
  setQuery(query || null) // Update URL
  formAction(formData)    // Trigger server action
}
```

## 5. Advanced Patterns

### Debounced Search
```typescript
import { useDebouncedCallback } from 'use-debounce'

const debouncedSearch = useDebouncedCallback((value: string) => {
  setQuery(value || null)
}, 300)

const handleSearch = (value: string) => {
  startTransition(() => {
    debouncedSearch(value)
  })
}
```

### Optimistic Updates
```typescript
import { useOptimistic } from 'react'

const [optimisticResults, addOptimisticResult] = useOptimistic(
  results,
  (state, newQuery: string) => {
    // Optimistically filter results
    return state.filter(model => 
      model.name.toLowerCase().includes(newQuery.toLowerCase())
    )
  }
)
```

### Custom Hooks
```typescript
export function useSearchState() {
  const [searchState, setSearchState] = useQueryStates(searchParams)
  const [state, formAction, pending] = useActionState(performSearch, initialState)
  
  const updateSearch = useCallback((updates: Partial<typeof searchState>) => {
    setSearchState(updates)
  }, [setSearchState])
  
  return {
    searchState,
    updateSearch,
    actionState: state,
    formAction,
    pending
  }
}
```

This architecture provides a powerful, type-safe, and performant solution for complex search functionality in Next.js applications.
