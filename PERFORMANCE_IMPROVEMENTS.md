# Performance Improvements

This note summarizes performance-related findings from the Vercel React best-practices ruleset and a focused scan for `tryCatch()` usage that could hide waterfalls.

## Scope

- Rules: `/home/cc/.agents/skills/vercel-react-best-practices`
- Focus: React/Next.js best practices, especially waterfalls and bundle size
- Extra check: `src/utils/try-catch.ts` usage for implicit sequential `await` patterns

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

### 2) Better Auth build workaround (applied)

**Context:** `better-auth/react` ESM build can fail during `next build` with React 19/Next.js.  
**Issue:** React hook imports (e.g., `useRef`, `useSyncExternalStore`) failing to resolve in ESM builds.  
**Applied fix:** Alias `better-auth/react` to the CJS build.

**File:** `next.config.ts`
```ts
webpack: (config) => {
  config.resolve.alias = {
    ...(config.resolve.alias ?? {}),
    "better-auth/react$": path.resolve(
      process.cwd(),
      "node_modules/better-auth/dist/client/react/index.cjs",
    ),
  };
  return config;
},
```

References:
- https://github.com/better-auth/better-auth/issues/2310
- https://github.com/better-auth/better-auth/issues/5458

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

- If the CJS alias workaround becomes unnecessary, remove the `better-auth/react` alias once the ESM build is confirmed stable.

