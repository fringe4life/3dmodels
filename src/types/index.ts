import type { Model } from "@/db/schema/models";

/**
 * Generic type helper for adding like status to any model type
 * @template T - The base model type
 */
export type WithLike<T> = T & { hasLiked: boolean };

/**
 * Specific type for Model with like status
 * This can be used when you need the full Model type with like information
 */
export type ModelWithLike = WithLike<Model>;
