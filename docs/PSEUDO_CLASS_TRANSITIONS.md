# Interactive pseudo-classes without transition timing

This document lists places where Tailwind **state variants** (`hover:`, `focus:`, `disabled:hover:`, etc.) appear on an element that does **not** also declare **`transition-*`**, **`duration-*`**, or **`ease-*`** on that same element.

**Search scope:** `src/**/*.tsx` and `src/**/*.css` (March 2025).

**Interpretation:** If any of `transition-*`, `duration-*`, or `ease-*` is present on the same `className` as the pseudo-class, the line was treated as covered. Inherited transitions from a parent were not assumed.

---

## 1. No transition, duration, or ease on the element

These are the clearest gaps: interactive styles change **instantly** because there is no transition utility on that node.

| Location | Pseudo-classes | Notes |
| -------- | -------------- | ----- |
| [`src/components/search-input.tsx`](../src/components/search-input.tsx) (line 49) | `focus:border-search-input`, `focus:outline-none`, `focus:ring-0` | Search field focus ring/border. |
| [`src/app/(auth)/signin/page.tsx`](../src/app/(auth)/signin/page.tsx) (lines 43, 61) | `focus:border-orange-accent`, `focus:outline-none`, `focus:ring-orange-accent` | Email/password inputs. |
| [`src/app/(auth)/signin/page.tsx`](../src/app/(auth)/signin/page.tsx) (line 102) | `hover:text-orange-accent/80` | “Sign up” link at bottom of form. |
| [`src/app/(auth)/signup/page.tsx`](../src/app/(auth)/signup/page.tsx) (lines 43, 62, 81) | Same focus pattern as sign-in | Name, email, password inputs. |
| [`src/app/(auth)/signup/page.tsx`](../src/app/(auth)/signup/page.tsx) (line 103) | `hover:text-orange-accent/80` | “Sign in” link at bottom of form. |

**Suggested fix:** Add something like `transition-colors duration-200` (and optionally `ease-out`) on those inputs/links, matching [`nav-link` in `globals.css`](../src/app/globals.css) (`transition-colors duration-200`).

---

## 2. Has `transition-*` but no explicit `duration-*` or `ease-*`

These elements **do** use `transition-colors` (or similar), so they are **not** in section 1. They still rely on Tailwind’s **default** duration/easing rather than an explicit `duration-*` / `ease-*`, which may feel inconsistent next to components that spell out timing (for example [`src/app/page.tsx`](../src/app/page.tsx) line 31, [`src/components/top-link.tsx`](../src/components/top-link.tsx), [`src/features/models/components/model-card.tsx`](../src/features/models/components/model-card.tsx)).

Roughly the same orange **Retry** / **CTA** button pattern appears in multiple error and not-found files; [`src/features/auth/components/auth-buttons.tsx`](../src/features/auth/components/auth-buttons.tsx), [`src/features/auth/components/sign-in-button.tsx`](../src/features/auth/components/sign-in-button.tsx), [`src/features/pagination/components/pagination.tsx`](../src/features/pagination/components/pagination.tsx), and auth **Submit** buttons on sign-in/signup also follow this pattern.

If you want one consistent rule app-wide, consider adding explicit `duration-200` (and optionally `ease-out`) wherever `transition-colors` is paired with `hover:` / `focus:`.

---

## 3. Already in good shape (reference)

Examples that **do** pair interactive pseudo-classes with explicit timing on the same element:

- [`src/app/globals.css`](../src/app/globals.css) — `@utility nav-link` uses `hover:text-orange-accent/75 transition-colors duration-200`.
- [`src/app/page.tsx`](../src/app/page.tsx) — `transition-colors duration-200` with `hover:`.
- [`src/components/top-link.tsx`](../src/components/top-link.tsx) — `transition-transform duration-200 ease-out` with `hover:`.
- [`src/features/models/components/model-card.tsx`](../src/features/models/components/model-card.tsx) — `transition-transform duration-300 ease-out` with `hover:` / `hover:after:`.
- [`src/features/models/components/heart-button/heart-button-client.tsx`](../src/features/models/components/heart-button/heart-button-client.tsx) — `FaHeart` uses `transition-colors duration-200` with `not-group-disabled:hover:text-red-500/50`.

---

## 4. Out of scope for this pass

- **CSS `@keyframes` / `animation`**: not pseudo-class transition timing.
- **View transitions** in `globals.css` (`::view-transition-*`): separate mechanism.
- **Parent `transition`**: children do not inherit `transition`; only explicitly listed elements were evaluated.
