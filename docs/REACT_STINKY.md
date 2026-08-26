# React Stinky

Working checklist from a [React Stinky](https://saschb2b.com/ai/skills/react-stinky) repo sweep of `src` (2026-07-12).

## Scope

- Mode: repo sweep (`**/*.tsx`, hooks, `lib/`)
- Skip: `node_modules`, generated, `*.test.*`, `*.stories.*`
- Deferred siblings (not installed): `react-compiler` (memoization), `theme-colors` (color literals)
- Clean overall: almost no `useState` / `useEffect` / `useMemo` / `useCallback`; RSC + server-action boundaries look correct

## Ratings

| Rating | Meaning |
| --- | --- |
| **Rancid** | Bug / correctness / a11y break — fix now |
| **Funky** | Real maintainability drag — should fix |
| **Whiff** | Minor / stylistic — optional |

Mark items `[x]` when done. Note the fix under the item if useful.

---

## Priority order

1. Rancid a11y + async errors
2. Search Enter flush + pagination naming
3. Sort radio a11y + heart visual-state API
4. Auth form duplication
5. Whiffs

Note: dual heart wiring (list client vs detail server island) is **intentional** — not a smell.

---

## Rancid

### 1) Unlabeled pagination icon buttons — fixed

**Category:** a11y markup  
**Files:** `src/features/pagination/components/pagination-page-control.tsx`

Prev/next are icon-only `<PaginationButton>`s with no accessible name.

**Applied:** `aria-label="Previous page"` / `"Next page"`; chevrons `aria-hidden`.

**Source:** [MDN button role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role)

- [x] Add `aria-label`s (or visible text)

---

### 2) Disabled heart CTA promises sign-in — open

**Category:** a11y markup  
**Files:**
- `src/features/models/likes/components/heart-button-client.tsx`
- `src/features/models/likes/hooks/use-heart-like.ts`

Unauthenticated users get `aria-label="Sign in to like this model"` but the button is `disabled` (`isDisabled = isPending || !isAuthenticated`). Submit also early-returns. Dead control; AT promise is a lie.

**Fix options:**

1. Render a `<Link href="/signin">` (or enabled button that navigates) when `!isAuthenticated`
2. Keep heart visual but do not use `disabled` + “Sign in…” label together

**Source:** [WAI disabled controls](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_disabled_controls)

- [ ] Replace disabled unauth heart with navigable sign-in control
- [ ] Keep authenticated toggle path unchanged

---

### 3) Swallowed GitHub OAuth errors — open

**Category:** async handlers  
**File:** `src/features/auth/components/sign-in-button.tsx`

`tryCatch(...)` result is ignored. OAuth failure = silent dead click.

**Fix:** Check `{ error }`; show inline `FormError` / toast / `role="alert"`. Keep pending UI.

- [ ] Surface OAuth error to user
- [ ] Optional: disable double-submit already covered by `isPending`

---

### 4) Swallowed sign-out errors — open

**Category:** async handlers  
**File:** `src/features/auth/components/auth-buttons.tsx`

`await signOutAction()` discard result. Sign-out failure invisible; user may think they are logged out.

**Fix:** Await result; surface error state or toast.

- [ ] Surface sign-out failure
- [ ] (Related Funky) Prefer plain `Button` + pending over `SubmitButton` for non-submit sign-out

---

## Funky

### 5) Search Enter uses stale URL query — fixed

**Category:** state and data flow  
**File:** `src/components/search-input/search-input.tsx`

Enter handler called `setQuery(query || null)` from closed-over URL state, not the input value. Type + Enter before transition commit could submit the old query.

**Applied:** Capture `e.currentTarget.value` before `startTransition`, flush with `defaultRateLimit`. Renamed `handleKeyPress` → `handleKeyDown`.

- [x] Flush Enter from input value
- [x] Rename handler

---

### 6) Inverted `hasPreviousPage` naming — open

**Category:** component API  
**Files:**
- `src/features/pagination/components/pagination.tsx` (`hasPreviousPage = page < 1`)
- `src/features/pagination/components/pagination-page-control.tsx` (`disabled={hasPreviousPage}`)
- `src/features/pagination/types.ts` (if type exported)

Name means opposite of value; `disabled={hasPreviousPage}` only works because of the inversion.

**Fix:** `isFirstPage` / `canGoPrevious = page > 0`, then `disabled={!canGoPrevious}` (or `disabled={isFirstPage}`).

- [ ] Rename and flip call sites so name matches meaning

---

### 7) Incomplete ARIA radio group for sort — fixed

**Category:** a11y markup  
**File:** `src/features/models/components/models-sort-controls.tsx`

`role="radiogroup"` + `role="radio"` on `<Button>` without roving `tabIndex` or arrow-key behavior.

**Applied:** Native `<input type="radio">` (shared `name="sort"`) inside `<fieldset>` + `srOnly` legend. Labels reuse `buttonRecipe` (`pill` / `primary`|`outline`) so look stays the same. `fieldset disabled={isPending}` for pending. No shared `Radio` component yet (single call site).

- [x] Replace fake radios with native + recipe-styled labels

---

### 8) Heart visual boolean explosion — fixed

**Category:** component API / state  
**Files:**
- `src/features/models/likes/types.ts` (`HeartVisualState`)
- `src/features/models/likes/hooks/use-heart-like.ts`
- `src/features/models/likes/components/heart-button-client.tsx`

`isLiked` + `isNotLiked` + `isPending` were a redundant pair; impossible combos possible.

**Applied:** `HeartVisualState = "liked" | "unliked" | "pending"`. Hook derives one `visualState` (pending wins). Button maps via `Record<HeartVisualState, …>` with Panda `_icon` (`& :where(svg)`). `isPending` / `isDisabled` stay on hook for form/button; paint lives on button, not a separate icon component.

- [x] Introduce discriminated `visualState`
- [x] Update hook + client button (`_icon` colors; no `heart-icon`)

---

### 9) Form errors missing live regions — open

**Category:** a11y markup  
**Files:**
- `src/components/form/form-error.tsx`
- `src/components/form/field-errors.tsx`

Errors render in plain `<div>` / `<span>` with no `role="alert"` / `aria-live`.

**Fix:** Add `role="alert"` (or `aria-live="assertive"`) on error containers. Move heart field error outside the `<button>` (see Rancid #2 follow-up).

- [ ] `FormError` live region
- [ ] `FieldError` live region
- [ ] Heart: error outside button

---

### 10) Duplicated auth form shell — open

**Category:** cross-file duplication  
**Files:**
- `src/app/(auth)/signin/page.tsx`
- `src/app/(auth)/signup/page.tsx`

Near-copy of `useActionState` + `useTransition` + field layout.

**Fix:** Extract shared `AuthForm` / `useAuthFormAction`.

Also align signup `_groupDisabled: { display: "hidden" }` with sign-in’s `"none"` if `"hidden"` is not a valid Panda display token.

- [ ] Shared auth form module
- [ ] Align pending label hide token

---

### 11) Dual heart integration paths — not a smell (intentional fork)

**Category:** cross-file duplication (false positive)  
**Files:**
- `src/features/models/components/model-card.tsx` → `HeartButtonClient` + batched `hasLiked`
- `src/app/3d-models/[slug]/page.tsx` → `HeartButtonServer` + per-slug fetch
- `src/features/models/likes/components/heart-button-server.tsx`

**Why keep both:** Detail page uses `generateStaticParams` (static model shell). Auth + `hasLiked` are per-request and cannot bake into that shell — `HeartButtonServer` is the dynamic island (`HasAuthSuspense` → skeleton → client). List parent is already dynamic (`getModels`); auth + batched likes resolve once up-tree and pass into `HeartButtonClient`. Forcing list through `HeartButtonServer` would add N Suspense islands / N like queries unless batching moves inside the wrapper.

Shared leaf (`HeartButtonClient`) stays correct. Real heart work is elsewhere (Rancid #2, Funky #8 / #9).

- [x] Confirmed intentional — do not unify paths

---

### 12) Sign-out uses `SubmitButton` — open

**Category:** component API  
**File:** `src/features/auth/components/auth-buttons.tsx`

Covered under Rancid #4 follow-up. Track here so it is not lost after error surfacing.

- [ ] Replace with `Button` + explicit pending/spinner (or dedicated `SignOutButton`)

---

## Whiff (optional)

### 13) Pagination limit `as LimitItem` — open

**File:** `src/features/pagination/components/pagination-limit-control.tsx`  
Narrow with `LIMITS.includes(n)` before calling `onLimitChange`.

- [ ] Runtime guard

### 14) Avatar fallback icon unnamed — open

**File:** `src/features/auth/components/avatar.tsx`  
`aria-hidden="true"` if decorative, or name the wrapper.

- [ ] Fix icon a11y

### 15) `tryCatch` error cast — open

**File:** `src/utils/try-catch.ts`  
Default `E = unknown`; narrow at call site.

- [ ] Tighten types

### 16) Duplicated models error boundaries — open

**Files:** `src/app/3d-models/[slug]/error.tsx`, `@results/error.tsx`, `categories/[categoryName]/error.tsx`  
Same `UnsuccessfulState` + `ResetButton` shell.

- [ ] Shared factory / component (only if a fourth copy appears or copy drifts)

### 17) Duplicated minimal error UI — open

**Files:** `src/app/@navbar/error.tsx`, `src/app/3d-models/@categories/error.tsx`

- [ ] Shared `InlineErrorFallback` (same bar as #16)

### 18) nuqs hook pattern duplication — open

**Files:** `use-pagination-query.ts`, `use-sort-query.ts`  
Same transition + `useQueryStates` shape.

- [ ] Extract helper only if a third consumer appears

### 19) `likes` vs `likesCount` naming — open

**File:** `src/features/models/likes/types.ts`  
Pick one project-wide (`likesCount` preferred).

- [ ] Align names at boundaries

### 20) Index fallback key in `GenericComponent` — open

**File:** `src/components/generic-component.tsx`  
`item.id ?? (item.slug || index)` — fine for static lists; require stable id for mutable lists.

- [ ] Document or tighten API if mutable lists use it

---

## Not smells (verified — do not “fix”)

- No effects computing derived data; no conditional hooks; no components defined inside components
- No `{count && <JSX>}` zero leak; no `dangerouslySetInnerHTML` in `src`
- Server actions passed to client components — valid Next.js pattern
- Memoization deferred to `react-compiler` skill (not installed)
- Dual heart paths (list batched client vs SSG detail server island) — intentional cache-boundary split (see #11)

---

## Progress log

| Date | Item | Notes |
| --- | --- | --- |
| 2026-07-12 | Sweep | Initial React Stinky report written into this doc |
| 2026-07-12 | #11 | Demoted — intentional SSG shell + dynamic auth island vs dynamic list batching |
| 2026-07-12 | #1 | Fixed — pagination prev/next `aria-label`s |
| 2026-07-12 | #5 | Fixed — Enter flushes input value; rename `handleKeyDown` |
| 2026-07-12 | #7 | Fixed — native sort radios + `buttonRecipe` labels |
| 2026-07-12 | #8 | Fixed — `visualState: liked | unliked | pending` |
| 2026-07-12 | Re-sweep | Confirmed #1 #5 #7 #8 #11 clean; open #2–4 #6 #9 #10 #12 + whiffs |
