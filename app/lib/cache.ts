import type { Category } from "../db/schema";

class CategoriesCache {
  private cache: Category[] | null = null;
  private lastFetch: number = 0;
  private readonly TTL = 60 * 60 * 1000; // 1 hour in milliseconds

  isStale(): boolean {
    return this.cache === null || Date.now() - this.lastFetch > this.TTL;
  }

  get(): Category[] | null {
    if (this.isStale()) {
      return null;
    }
    return this.cache;
  }

  set(categories: Category[]): void {
    this.cache = categories;
    this.lastFetch = Date.now();
  }

  clear(): void {
    this.cache = null;
    this.lastFetch = 0;
  }
}

// Export a singleton instance
export const categoriesCache = new CategoriesCache();
