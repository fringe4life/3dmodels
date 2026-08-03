# Model cache: likes vs stable content

## Current behavior

Model list data (`searchModels`) and detail data (`getModelBySlug`) share the `"models"` cache tag. A like/unlike calls `invalidateAllModels()` → `updateTag("models")`, which expires every entry tagged `"models"`.

Rebuild is **lazy**: Next.js only re-runs a cache entry when something requests it again. Invalidation itself is cheap; cost shows up as fresher DB work + RSC serialization on the next hit of each expired key (each query/page/sort/category combo is its own entry).

This is intentional for now: likes affect both displayed counts and `sort=popular` ordering, so list-level invalidation keeps rankings and counts consistent for the next request (read-your-own-writes via `updateTag`).

## Longer-term: split long-lived and short-lived caches

Today one cached blob mixes fields that change at different rates:

| Layer | Fields | Change rate | Suggested life / tags |
|-------|--------|-------------|------------------------|
| **Stable content** | `slug`, `name`, `description`, `image`, `categorySlug`, `dateAdded` | Rare (edit/create) | Long `cacheLife` (`max` / days); tags like `model-content-${slug}`, `model-content` |
| **Volatile counters** | `likes` | Every toggle | Short life or per-slug tags `model-likes-${slug}`; optional soft tag `model-likes` with `revalidateTag(..., "max")` for other users |
| **Per-user** | `hasLiked` | Per user | Already request-scoped / private (not in shared `"models"` list cache) |

### What gets cheaper

Invalidating only the likes layer avoids re-fetching and re-serializing stable content (titles, descriptions, image props) on every heart click. Toggle should prefer `updateTag(\`model-likes-${slug}\`)` so one counter entry expires, not every content entry.

### Sorting impact (the hard part)

Splitting **counts** from **content** does not fully solve list caching:

- **`sort=recent` / name**: Order does not depend on likes. A long-lived “page of slugs + content” cache can stay warm; only the likes overlay refreshes.
- **`sort=popular`**: `ORDER BY likes DESC` means **which models appear on a page** depends on likes. That ordering key is volatile. Options:
  1. Accept eventual consistency (short `cacheLife` or SWR on popular page keys only).
  2. Tag popular order separately (e.g. `models-order-popular`) and revalidate that on toggle without touching content caches.
  3. Keep today’s broad `"models"` invalidation for popular correctness (**chosen for now**).

Until popular order is its own short-lived cache (or staleness is accepted), “invalidate all models on like” remains the simple correctness choice. `invalidateModel` was removed; only `invalidateAllModels()` remains.

### Suggested end state

```
search / list (stable fields + slug order for non-popular sorts)
  → long cache

popular slug pages
  → short cache / dedicated order tags

per-model likes (and detail likes)
  → per-slug likes tags on toggle

model content by slug
  → long cache; invalidate only on content edits
```

Wire invalidation in `src/utils/cache-invalidation.ts` and call sites (e.g. `toggleLike`) once those layers exist.

## Related code

- `src/utils/cache-invalidation.ts` — `invalidateAllModels` only (simple broad `"models"` tag)
- `src/features/models/likes/actions/toggle-like.ts` — like/unlike invalidation
- `src/features/models/dal/search-models.ts` — `cacheTag("models")`
- `src/features/models/queries/get-model-by-slug.ts` — `cacheTag("models", \`model-${slug}\`)`
- `src/features/models/sort/order-for-sort.ts` — popular orders by `models.likes`
