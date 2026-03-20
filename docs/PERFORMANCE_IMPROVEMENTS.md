# Performance Improvements

This note summarizes performance-related findings from the Vercel React best-practices ruleset and a focused scan for `tryCatch()` usage that could hide waterfalls.

## Scope

- Rules: Vercel React best-practices ruleset (e.g. `.agents/skills/vercel-react-best-practices` or the Cursor **vercel-react-best-practices** skill).
- Focus: React/Next.js best practices, especially waterfalls, server fetch patterns, and bundle size.
- Extra check: `src/utils/try-catch.ts` usage for implicit sequential `await` patterns.

## Findings

### 1) Server-side waterfall in `getModels` (fixed)

**Rule:** `async-parallel`, `server-parallel-fetching`  
**File:** `src/features/models/dal/get-models.ts`

`searchModels()` and `getUser()` are independent but are awaited sequentially. This adds a full round trip on the critical path.

**Current pattern:**
```ts
const result = await searchModels(...);
// ...
const user = await getUser();
```

**Improvement:** start both promises and `await` together (or start `getUser()` before `searchModels()`). This has been applied in `get-models.ts`.

---

### 2) Better Auth + Bun build status (beta)

**Status:** `better-auth/minimal` v1.5 beta builds successfully when using Bun with webpack.  
**Configuration:** `bun --bun run next build --webpack` (and `bun --bun run next dev --webpack` for dev).

**Notes:**
- This avoids Turbopack issues in Bun and is stable with Cache Components locally.
- `vercel.json` now sets `bunVersion: "1.x"`. Vercel manages minor/patch releases, but is still on Bun v1.3.6, which is not compatible with Cache Components; builds still fail there until their runtime is >= 1.3.7 (or the build uses Node.js instead of Bun).

---

### 3) N+1 like-status queries in `getModels` (fixed)

**Rule:** `server-parallel-fetching` (hot-path I/O / DB efficiency)  
**Files:** `src/features/models/dal/get-models.ts`, `src/features/models/queries/get-model-with-like-status.ts`

Previously each list item triggered its own `getHasLikedStatus` call (N DB round trips for a logged-in user).

**Applied:** `getLikedSlugsForUser(userId, slugs)` runs **one** query with `modelSlug in (...)`, then each model gets a `hasLiked` boolean. `searchModels` and `getUser()` remain parallel via `Promise.all`; the batch runs only after a successful page of items exists.

**UI shell:** List rendering no longer uses a client `models-content.tsx` + `use(modelsPromise)`; `models-view.tsx` uses an async server child + `Suspense`, with `PaginationOffsetTransition` (page `key`) unchanged for directional View Transitions.

---

### 4) Sequential OpenAPI setup in API route (open)

**Rule:** `async-parallel`, `async-api-routes`  
**File:** `src/app/api/[[...slugs]]/route.ts`

`openapi({ documentation: { components: await OpenAPI.components, paths: await OpenAPI.getPaths() } })` awaits `components` and `paths` **in series**. If they are independent, use `Promise.all` so setup does not wait on both serially.

**Caveat:** confirm in `better-auth-openapi` (or equivalent) that neither import has ordering side effects before parallelizing.

---

### 5) Per-card `useSession()` on the models grid (fixed)

**Rule:** `rerender-defer-reads` (avoid redundant client subscriptions)  
**Files:** `src/features/models/dal/get-models.ts`, `src/features/models/components/models-view.tsx`, `src/features/models/components/heart-button/heart-button-client.tsx`

Previously each `ModelCard` heart button called `authClient.useSession()` to derive `isAuthenticated`.

**Applied:** `getModels()` returns `{ result, isAuthenticated }` using the same `getUser()` result used for batched like status. `ModelsGrid` → `ModelCard` → `HeartButtonClient` receive `isAuthenticated` as a prop. The detail page passes it from `HasAuthSuspense` into `HeartButtonServer` → `HeartButtonClient`.

---

### 6) `react-icons` imports and bundle size (verify)

**Rule:** `bundle-barrel-imports`  
**Files:** e.g. `src/features/auth/components/auth-buttons.tsx`, `src/features/models/components/heart-button/heart-button-client.tsx`, `src/features/pagination/components/pagination.tsx`, `src/components/top-link.tsx`

Named imports from `react-icons/fa` / `react-icons/fa6` may be fine if tree-shaking is aggressive; the ruleset often recommends **narrower import paths** if analysis shows large icon chunks.

**Improvement:** run `bun run next:analyze` (or `next experimental-analyze`) and switch to per-icon paths only if FA chunks show up as a meaningful cost.

---

### 7) Long model lists (optional)

**Rule:** `rendering-content-visibility`  
**Files:** `src/components/generic-component.tsx`, grid usage in `models-grid.tsx`

The grid maps all items with no `content-visibility` or virtualization. Acceptable for **small page limits**; if limits grow, consider `content-visibility: auto` on card wrappers or list virtualization.

---

## Patterns already in good shape (audit)

- **`server-cache-react`:** `getModelBySlug`, `getCategoryBySlug`, and `getUser` use React `cache()`, so duplicate calls from `generateMetadata` + page dedupe per request.
- **`async-suspense-boundaries`:** `ModelsView` + `HasAuthSuspense` use Suspense with skeleton fallbacks.
- **`paginate-items.ts`:** list + count use `Promise.all` with `tryCatch` (no hidden sequential waterfall).

---

## tryCatch() Waterfall Scan

`tryCatch()` always awaits its callback, so it can hide waterfalls when used to wrap one async task that could have been started earlier. The following usages were reviewed:

- `src/app/api/[[...slugs]]/route.ts`
- `src/features/models/actions/likes.ts`
- `src/features/models/queries/get-model-with-like-status.ts`
- `src/features/auth/actions/sign-in-action.ts`
- `src/features/auth/actions/sign-up-action.ts`
- `src/features/auth/actions/sign-out-action.ts`
- `src/features/auth/queries/get-user.ts`
- `src/features/pagination/dal/paginate-items.ts`
- `src/features/categories/queries/get-all-categories.ts`
- `src/features/categories/queries/get-all-category-slugs.ts`
- `src/features/categories/queries/get-category-by-slug.ts`
- `src/features/models/queries/get-model-by-slug.ts`
- `src/features/models/queries/get-model-by-slug-api.ts`
- `src/features/auth/components/sign-in-button.tsx`

**Result:** No concrete hidden waterfalls were found where `tryCatch()` forces sequential work that could be parallelized. Most usages are single async operations or already inside `Promise.all()` (e.g., `paginate-items.ts`).

### Guidance to avoid future hidden waterfalls

- If you need multiple independent async results, start the promises first and then `await` them together.
- Use `tryCatch(() => promise)` on already-started promises only when you can pass the promise directly (or wrap the minimal unit of work).
- Prefer this pattern in async routes/actions:
  ```ts
  const userPromise = getUser();
  const dataPromise = fetchData();
  const [{ data: user }, { data: data }] = await Promise.all([
    tryCatch(() => userPromise),
    tryCatch(() => dataPromise),
  ]);
  ```

## Optional next steps

**Priority (performance impact):**

1. ~~Batch like-status reads in `get-models.ts` (remove N+1).~~ **Done** (see finding 3).
2. Parallelize OpenAPI `components` + `paths` in the API route if safe.
3. Reduce per-card `useSession()` by passing auth from the server or a single parent.
4. Confirm `react-icons` cost with bundle analyze; tighten imports only if needed.
5. Re-test Vercel deploys once Bun >= 1.3.7 is available, or switch the Vercel project to the Node.js build pipeline.

