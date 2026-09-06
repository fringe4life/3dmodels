# React Stinky

Working checklist from a [React Stinky](https://saschb2b.com/ai/skills/react-stinky) repo sweep of `src` (origin 2026-07-12; re-swept 2026-09-06).

## Scope

- Mode: repo sweep (`src/**/*.tsx`, hooks `use-*.ts`, `lib/`)
- Skip: `node_modules`, generated (`styled-system`, `.next`), `*.test.*`, `*.spec.*`, `*.stories.*`
- Deferred siblings (not installed): `react-compiler` (memoization), `theme-colors` (color literals)
- Clean overall: almost no `useState` / `useEffect` / `useMemo` / `useCallback`; RSC + server-action boundaries look correct
- Fallow (`fallow@3.22.0`) is a first-pass signal for duplication and health. It does not replace reading files. See **Fallow** under Progress log.

## Ratings

| Rating | Meaning |
| --- | --- |
| **Rancid** | Bug / correctness / a11y break — fix now |
| **Funky** | Real maintainability drag — should fix |
| **Whiff** | Minor / stylistic — optional |

Mark items `[x]` when done. Note the fix under the item if useful.

---

## Priority order

1. Wait-for-copy (#16, #18, #22)

Note: dual heart wiring (list client vs detail server island) is **intentional** — not a smell.

---

## Rancid

### 1) Unlabeled pagination icon buttons — fixed

**Category:** a11y markup  
**Files:** `src/features/pagination/components/pagination-page-control.tsx`

Prev/next are icon-only `<PaginationButton>`s with no accessible name.

**Applied:** `aria-label="Previous page"` / `"Next page"`; chevrons `aria-hidden`. Re-sweep 2026-09-06: still present.

**Source:** [MDN button role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role)

- [x] Add `aria-label`s (or visible text)

---

### 2) Disabled heart CTA promises sign-in — fixed

**Category:** a11y markup  
**Files:**
- `src/features/models/likes/components/heart-button-client.tsx`
- `src/features/models/likes/components/heart-button-recipe.ts`
- `src/features/models/likes/components/heart-sign-in-hint.tsx`
- `src/features/models/likes/hooks/use-heart-like.ts`

**Applied:** Guest heart is `<Link href="/signin">` (`aria-label="Sign in to like this model"`), not a disabled button. Colors via `heartButtonRecipe({ visual, guest })` composed with `buttonRecipe({ size: "bare", variant: "ghost" })`. Guest liked/unliked omit hover cue. Unauth: `popover="hint"` tooltip (`HeartSignInHint`) on hover/focus-visible via sibling CSS; unique `--model-heart-*` anchor per slug. Hint sits `position-area: top` with `position-try-fallbacks: flip-block, flip-inline`; `position-visibility: anchors-visible` hides when heart fully off-screen. Auth path stays form + submit (`aria-label="Like this model"`), no popover. `isDisabled` is pending-only. Tests: `heart-button-client.spec.tsx`, `model-card.spec.tsx`.

**Source:** [WAI disabled controls](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_disabled_controls)

- [x] Replace disabled unauth heart with navigable sign-in control
- [x] Keep authenticated toggle path unchanged
- [x] Guest hint popover (CSS hover/focus, Link still `/signin`)

---

### 3) Swallowed GitHub OAuth errors — fixed

**Category:** async handlers  
**Files:**
- `src/features/auth/actions/sign-in-github-action.ts`
- `src/features/auth/components/sign-in-button.tsx`

**Applied:** Server action `signInGithubAction` — `auth.api.signInSocial` + `headers()`, URL → `throw redirect`, no URL / `APIError` → `fromErrorToActionState`. `unstable_rethrow` lets `NEXT_REDIRECT` fly. Client: `<form action={formAction}>` + `useActionState`; `FormError` under button. Post-GitHub callback still `/api/auth/callback/github`. Tests: `tests/components/auth/sign-in-button.spec.tsx`.

- [x] Surface OAuth error to user
- [x] Optional: disable double-submit already covered by `isPending`

---

### 4) Swallowed sign-out errors — fixed

**Category:** async handlers  
**File:** `src/features/auth/components/auth-buttons.tsx`

**Applied:** `signOutAction` matches `useActionState` (`prevState`, `FormData`) — success `throw redirect`, errors `fromErrorToActionState` + `unstable_rethrow`. Client: `<form action={formAction}>` + `useActionState`; ghost `PendingButton` (`aria-label="Sign out"`) + `FormError` beside control. Tests in `tests/components/auth/signout-button.spec.tsx`.

- [x] Surface sign-out failure
- [x] (Related Funky) Use shared `PendingButton` — see #12

---

### 21) Pending `SubmitButton` loses accessible name — fixed

**Category:** a11y markup  
**Files:**
- `src/components/pending-button.tsx`
- `src/features/auth/components/auth-form.tsx`

**Applied:** Renamed/moved to `PendingButton` (pending chrome, not form-only). Children wrap in a span with Panda `srOnly: isPending` (not `display: none`). `aria-busy={isPending}`; spinner `aria-hidden`. `AuthForm` passes `"Sign in"` / `"Sign up"`. Tests: `tests/components/pending-button.spec.tsx`.

Sign-out uses ghost `PendingButton` with `aria-label="Sign out"` (#12 / #4), so the control keeps a name while pending.

- [x] Preserve accessible name while pending
- [x] `aria-hidden` on spinner (or name the pending state)
- [x] Rename to `PendingButton` outside `src/components/form/`

---

## Funky

### 5) Search Enter uses stale URL query — fixed

**Category:** state and data flow  
**File:** `src/components/search-input/search-input.tsx`

Enter handler called `setQuery(query || null)` from closed-over URL state, not the input value. Type + Enter before transition commit could submit the old query.

**Applied:** Capture `e.currentTarget.value` before `startTransition`, flush with `defaultRateLimit`. Renamed `handleKeyPress` → `handleKeyDown`. Re-sweep 2026-09-06: still flushes from `e.currentTarget.value`.

- [x] Flush Enter from input value
- [x] Rename handler

---

### 6) Inverted `hasPreviousPage` naming — fixed

**Category:** component API  
**Files:**
- `src/features/pagination/components/pagination.tsx`
- `src/features/pagination/components/pagination-page-control.tsx`

Origin report had `hasPreviousPage = page < 1` with `disabled={hasPreviousPage}` (name opposite of value).

**Applied (verified 2026-09-06):** `hasPreviousPage = page > 0`; `disabled={!hasPreviousPage}` / `disabled={!hasNextPage}`. Name matches meaning.

- [x] Rename and flip call sites so name matches meaning

---

### 7) Incomplete ARIA radio group for sort — fixed

**Category:** a11y markup  
**File:** `src/features/models/components/models-sort-controls.tsx`  
**Also:** `src/features/models/sort/components/sort-option.tsx`

`role="radiogroup"` + `role="radio"` on `<Button>` without roving `tabIndex` or arrow-key behavior.

**Applied:** Native `<input type="radio">` (shared `name="sort"`) inside `<fieldset>` + `srOnly` legend. Labels reuse `buttonRecipe`. Re-sweep 2026-09-06: radios live in `SortOption`.

- [x] Replace fake radios with native + recipe-styled labels

---

### 8) Heart visual boolean explosion — fixed

**Category:** component API / state  
**Files:**
- `src/features/models/likes/types.ts` (`HeartVisualState`)
- `src/features/models/likes/hooks/use-heart-like.ts`
- `src/features/models/likes/components/heart-button-client.tsx`

`isLiked` + `isNotLiked` + `isPending` were a redundant pair; impossible combos possible.

**Applied:** `HeartVisualState = "liked" | "unliked" | "pending"`. Hook derives one `visualState` (pending wins). Re-sweep 2026-09-06: still this union.

- [x] Introduce discriminated `visualState`
- [x] Update hook + client button (`heartButtonRecipe` `_icon` colors; no `heart-icon`)

---

### 9) Form errors missing live regions — fixed

**Category:** a11y markup  
**Files:**
- `src/components/form/form-error.tsx`
- `src/components/form/field-errors.tsx`
- `src/features/models/likes/components/heart-button-client.tsx`

**Applied:** `role="alert"` on `FormError` `<div>` and `FieldError` `<span>`. Empty/null/success/pending still render nothing. Heart `FieldError` sits after the like `<button>`, still inside the `<form>`. Tests: `form-error.spec.tsx`, `field-errors.spec.tsx`, `heart-button-client.spec.tsx`.

- [x] `FormError` live region
- [x] `FieldError` live region
- [x] Heart: error outside button

---

### 10) Duplicated auth form shell — fixed

**Category:** cross-file duplication  
**Files:**
- `src/features/auth/hooks/use-auth-form-action.ts`
- `src/features/auth/components/auth-form.tsx`
- `src/app/(auth)/signin/page.tsx`
- `src/app/(auth)/signup/page.tsx`

**Applied:** `useAuthFormAction(action)` wraps `useActionState` + `useTransition`. `AuthForm` takes `fields` + `submitLabel`; GitHub is sign-in-only `children`. Pages are Server Components (hooks live in `AuthForm`). Tests: `signin-page.spec.tsx`, `signup-page.spec.tsx`.

- [x] Shared auth form module
- [x] Align pending label hide token (`"none"` on both) — superseded by #21 `srOnly`
- [x] Align pending field disable (`disabled={isPending}`)

---

### 11) Dual heart integration paths — not a smell (intentional fork)

**Category:** cross-file duplication (false positive)  
**Files:**
- `src/features/models/components/model-card.tsx` → `HeartButtonClient` + batched `hasLiked`
- `src/app/3d-models/[slug]/page.tsx` → `HeartButtonServer` + per-slug fetch
- `src/features/models/likes/components/heart-button-server.tsx`

**Why keep both:** Detail page uses `generateStaticParams` (static model shell). Auth + `hasLiked` are per-request and cannot bake into that shell — `HeartButtonServer` is the dynamic island (`HasAuthSuspense` → skeleton → client). List parent is already dynamic (`getModels`); auth + batched likes resolve once up-tree and pass into `HeartButtonClient`. Forcing list through `HeartButtonServer` would add N Suspense islands / N like queries unless batching moves inside the wrapper.

Shared leaf (`HeartButtonClient`) stays correct. Real heart work is elsewhere (Rancid #2, Funky #9). Re-sweep 2026-09-06: both paths still present.

- [x] Confirmed intentional — do not unify paths

---

### 12) Sign-out uses `SubmitButton` — fixed

**Category:** component API
**File:** `src/features/auth/components/auth-buttons.tsx`

**Applied:** Ghost `PendingButton` with `aria-label="Sign out"`, `type="submit"` (default), `inlineSize: fit-content` override for navbar chrome. Icon child + shared pending spinner/`srOnly` name behavior (#21). Wired via `useActionState` form (#4).

- [x] Replace with shared `PendingButton` (ghost + `aria-label`)

---

## Whiff (optional)

### 13) Pagination limit `as LimitItem` — fixed

**Files:** `src/features/pagination/schema.ts`, `src/features/pagination/components/pagination-limit-control.tsx`  
**Applied:** valibot `fallback(picklist(LIMITS), DEFAULT_LIMIT)` as `limitItemSchema`. Select `parse`s `Number(event.target.value)` — invalid → `DEFAULT_LIMIT`. nuqs URL still `parseAsNumberLiteral(LIMITS)` (`createStandardSchemaV1` not in nuqs 2.10.1). Tests: `pagination-limit-control.spec.tsx`, `tests/unit/pagination/schema.spec.ts`.

- [x] Runtime guard

### 14) Avatar fallback icon unnamed — fixed

**File:** `src/features/auth/components/avatar.tsx`  
**Applied:** `aria-hidden="true"` on decorative `FaUserCircle`. Image alt unchanged (`user.name ?? "User avatar"`). Test: `tests/components/auth/avatar.spec.tsx`.

- [x] `aria-hidden="true"` if decorative, or name the wrapper

### 15) `tryCatch` error cast — fixed

**File:** `src/utils/try-catch.ts`  
**Applied:** `tryCatch<T>(operation): Promise<Result<T>>`. Catch stores `error` as `unknown` (no `as E`). `Result`/`Failure` still default `E = unknown`. Sign-in OAuth path discriminates `result.data === null` then `fromErrorToActionState(result.error)`. Test: `tests/unit/utils/try-catch.spec.ts`.

- [x] Tighten types

### 16) Duplicated models error boundaries — open

**Files:** `src/app/3d-models/[slug]/error.tsx`, `@results/error.tsx`, `categories/[categoryName]/error.tsx`  
Same `UnsuccessfulState` + `ResetButton` shell. Fallow clone `dup:c77b3abb6f87acd9-4` (also reported as `-26` at lower token threshold).

- [ ] Shared factory / component (only if a fourth copy appears or copy drifts)

### 17) Duplicated minimal error UI — fixed

**Files:** `src/components/inline-error-fallback.tsx`, `src/app/@navbar/error.tsx`, `src/app/3d-models/@categories/error.tsx`  
**Applied:** Shared `InlineErrorFallback` (`message` + `retry`). Color unified to `gray.600` (match `UnsuccessfulState` / `global-error`). Error files stay client default exports. Test: `tests/components/inline-error-fallback.spec.tsx`.

- [x] Shared `InlineErrorFallback` (same bar as #16)

### 18) nuqs hook pattern duplication — open

**Files:**
- `src/features/pagination/hooks/use-pagination-query.ts`
- `src/features/models/sort/hooks/use-sort-query.ts`

Same `useTransition` + `useQueryStates` shape. Sort hook path moved under `sort/hooks/` since origin sweep. Still only two consumers.

- [ ] Extract helper only if a third consumer appears

### 19) `likes` vs `likesCount` naming — fixed

**Files:** `src/features/models/likes/types.ts`, DAL/action/optimistic/count UI.  
**Applied:** Drop `LikesCount`. Count is `likes` end-to-end (Drizzle `models.likes`). DAL returns `{ likes: updated?.likes ?? 0 }`. `LikesCountTransition` stays the ViewTransition wrapper; prop is `likes`. Tests already pass `likes` on heart props.

- [x] Align names at boundaries

### 20) Index fallback key in `GenericComponent` — documented

**File:** `src/components/generic-component.tsx`  
`item.id ?? (item.slug || index)` remains. JSDoc on `GenericListItemKey` now states the fallback. Fine for static lists; require stable id for mutable lists.

- [x] Documented index fallback (tighten later only if mutable lists use it)

### 22) Duplicated not-found `UnsuccessfulState` shells — open

**Category:** cross-file duplication  
**Files:**
- `src/app/3d-models/[slug]/not-found.tsx`
- `src/app/3d-models/categories/[categoryName]/not-found.tsx`
- `src/features/models/components/models-not-found.tsx`

Same primary `Link` + `UnsuccessfulState` action block. Headings/list copy differ (true not-found vs empty search). Fallow `dup:c77b3abb6f87acd9-2` / `-17`. Same bar as #16: extract only if a fourth copy appears or copy drifts.

- [ ] Shared factory / component (same bar as #16)

### 23) Search pending spinner not announced — fixed

**File:** `src/components/search-input/search-input.tsx`  
**Applied:** `aria-busy={isPending}` on the search input; spinner `aria-hidden="true"`. Tests: idle not busy; pending `aria-busy="true"` while debounce transition.

- [x] `aria-busy` on the search control while pending
- [x] Mark spinner decorative

---

## Not smells (verified — do not “fix”)

- No effects computing derived data; no conditional hooks; no components defined inside components (tiny RSC children in `HeartButtonServer` / `HasAuthSuspense` are render callbacks, not nested component declarations)
- No `{count && <JSX>}` zero leak; no `dangerouslySetInnerHTML` in `src`
- Server actions passed to client components — valid Next.js pattern
- Memoization deferred to `react-compiler` skill (not installed)
- Dual heart paths (list batched client vs SSG detail server island) — intentional cache-boundary split (see #11)
- `NavbarAuthSlot` desktop vs `MobileAuthAction` — different unauthenticated UI; not a unify target
- Skeleton vs live `models-grid-header` layout clones — intentional loading mirror
- Fallow schema clones (`src/db/schema/*`), auth server-action valibot blocks, and `isListingRoute` / `isModelDetailRoute` URL-parse helpers — not React component duplication
- Fallow CRAP on `useHeartLike` (estimated coverage) — add tests if wanted; not a React Stinky god-hook (cyclomatic 7)

---

## Progress log

| Date | Item | Notes |
| --- | --- | --- |
| 2026-07-12 | Sweep | Initial React Stinky report written into this doc |
| 2026-07-12 | #11 | Demoted — intentional SSG shell + dynamic auth island vs dynamic list batching |
| 2026-07-12 | #1 | Fixed — pagination prev/next `aria-label`s |
| 2026-07-12 | #5 | Fixed — Enter flushes input value; rename `handleKeyDown` |
| 2026-07-12 | #7 | Fixed — native sort radios + `buttonRecipe` labels |
| 2026-07-12 | #8 | Fixed — `visualState: liked \| unliked \| pending` |
| 2026-07-12 | Re-sweep | Confirmed #1 #5 #7 #8 #11 clean; open #2–4 #6 #9 #10 #12 + whiffs |
| 2026-09-06 | Re-sweep | Full `src` pass + fallow. Closed #6 (name matches `page > 0`) and #20 (JSDoc). Added #21 (pending submit name), #22 (not-found clones), #23 (search `aria-busy`). #10 hide-token aligned; signup still missing field `disabled`. |
| 2026-09-06 | #9 live | `FormError` / `FieldError` `role="alert"`. Heart error still inside button. |
| 2026-09-06 | #4 #12 | Sign-out `FormError` on ActionState ERROR; ghost `Button` + spinner, no `SubmitButton`. |
| 2026-09-06 | #2 #9 | Guest heart is `/signin` Link; FieldError outside like button. |
| 2026-09-06 | #2 | `heartButtonRecipe` CVA (`visual` × `guest`); unauth `popover="hint"` on hover/focus. |
| 2026-09-06 | #3 | GitHub OAuth throw + `{ error }` both surface via `FormError`. |
| 2026-09-06 | #3 | GitHub OAuth: server action `signInSocial` + `useActionState`; URL `redirect`, errors `FormError`. |
| 2026-09-06 | #21 | Pending submit keeps name via `srOnly`; spinner `aria-hidden` + `aria-busy`. #10 field `disabled` aligned. |
| 2026-09-06 | #21 | `SubmitButton` → `PendingButton` at `src/components/pending-button.tsx`. |
| 2026-09-06 | #10 | `AuthForm` + `useAuthFormAction`. Pages RSC; GitHub stays sign-in children. |
| 2026-09-06 | #14 | Avatar fallback `FaUserCircle` `aria-hidden`. |
| 2026-09-06 | #13 | Limit select: `isLimitItem` guard before `onLimitChange`. |
| 2026-09-06 | #13 | Limit select: valibot `limitItemSchema` (`picklist`); drop `isLimitItem`. |
| 2026-09-06 | #23 | Search `aria-busy` while pending; spinner decorative. |
| 2026-09-06 | #15 | `tryCatch` catch is `unknown`; drop unbound `E` cast. |
| 2026-09-06 | #17 | `InlineErrorFallback`; navbar/categories errors pass copy; color `gray.600`. |
| 2026-09-06 | #19 | Drop `LikesCount`; count is `likes` from DAL through optimistic UI. |

### Fallow (2026-09-06)

MCP namespace `project-0-3dmodels-fallow` was **not** loaded on the first pass; CLI ran first. MCP was enabled mid-sweep; MCP equivalents were re-run. No `fix_apply` / `fallow fix`.

**CLI** (`FALLOW_AGENT_SOURCE=cursor bun x fallow … --format json --quiet`):

- `dupes` — default config (`minOccurrences: 3`, `minLines: 15`) → 0 reported groups, 2 below threshold
- `dupes --min-tokens 20 --min-lines 3` — 6+ React-relevant groups (errors, not-found, auth pages)
- `dupes --trace dup:c77b3abb6f87acd9-2` — not-found `UnsuccessfulState` trio
- `health --hotspots --targets` — 0 functions over cyclomatic/cognitive; churn hotspots only
- `audit --explain --gate-marker agent` — `verdict: pass` vs `origin/main`; 0 introduced issues
- `dead-code --unused-exports --production` — 0 unused production exports (auth/not-found clones are live)

**MCP** (`project-0-3dmodels-fallow`):

- `find_dupes` (default) — same as CLI default: 0 groups, 2 below `minOccurrences`
- `find_dupes` (`min_tokens: 20`, `min_lines: 3`, `min_occurrences: 2`) — 37 groups; React ones folded into #10, #16, #17, #22
- `trace_clone` fingerprint `dup:c77b3abb6f87acd9-2` and `error.tsx:8` → `dup:c77b3abb6f87acd9-4`
- `check_health` (`hotspots: true`, `targets: true`, `production: true`) — churn hints, not automatic smells
- `check_health` (`complexity: true`, `production: true`) — one high finding: `useHeartLike` CRAP 56 from estimated coverage (ignored as React smell)
- `audit` (`base: origin/main`, `gate: new-only`) — `verdict: pass`; do not treat inherited issues as new smells

Fallow confirmed syntactic clones that React Stinky already tracked (#10, #16, #17) and surfaced the not-found trio (#22). It could not judge disabled-heart a11y, swallowed async errors, live regions, or inverted-then-fixed pagination naming — those needed file reads. Ignored: DB schema timestamp/`userId` clones, `with-abort` settle blocks, about-page marketing JSX, skeleton/header layout mirrors, server-action valibot copies.
