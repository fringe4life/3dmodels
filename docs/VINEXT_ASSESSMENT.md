# Vinext migration assessment

**Branch:** `vinext`  
**Date:** After running `npx vinext check`  
**Overall compatibility:** 90% (17 supported, 2 partial, 1 issue)

## Verdict: **Migration is feasible**

The project is a good fit for Vinext. One config option must be adjusted; two items are partial support and optional to address.

---

## 1. Issues to address (blocking if kept)

| Item | Current usage | Action |
|------|----------------|--------|
| `experimental.typedRoutes` | `true` in `next.config.ts` | Vinext does not implement typed routes. Either disable it for the Vinext branch (`typedRoutes: false`) or accept untyped route params/links. |

Disabling `typedRoutes` is the minimal change; no app code changes required for Vinext itself.

---

## 2. Partial support (optional)

| Item | Effect |
|------|--------|
| **next/font/google** | Fonts are loaded from CDN in Vinext, not self-hosted at build time. Behavior is acceptable for most apps. |
| **ViewTransition (React canary)** | Vinext shims with a passthrough; view transitions will not animate. If you rely on them, you may need a different approach or to accept no animation under Vinext. |

No change required to proceed; only adjust if you care about self-hosted fonts or view-transition animation.

---

## 3. What’s fully supported

- **Imports:** `next/link`, `next/cache` (revalidateTag, revalidatePath, unstable_cache, cacheLife, cacheTag), `next/navigation`, `next/headers`, `server-only`, `next/server` (NextRequest/NextResponse shimmed).
- **Config:** `env` (and other options vinext reads from `next.config`).
- **Libraries:** nuqs, better-auth, tailwindcss (all compatible).
- **Structure:** App Router (`src/app/`), pages, layouts, route handler(s), loading/error boundaries, not-found pages.

These require no migration work beyond the package swap and Vite setup.

---

## 4. Recommended next steps

1. **Resolve the single issue:** In `next.config.ts` set `experimental.typedRoutes: false` (or remove it) so Vinext does not depend on unsupported behavior.
2. **Run Vinext init:** From project root run:
   ```bash
   npx vinext init
   ```
   This sets up the Vite-based build (e.g. `vite.config.ts`, dependency changes, `"type": "module"` if needed).
3. **Install deps and run dev:** e.g. `bun install` then `npx vinext dev` (or `npx vite dev` per vinext docs).
4. **Verify:** Smoke-test app and API routes; confirm auth (better-auth), search (nuqs), and cache behavior.
5. **(Optional)** Use `vinext deploy` for deployment when ready.

---

## 5. References

- Skill: `.agents/skills/migrate-to-vinext/SKILL.md`
- Compatibility: `.agents/skills/migrate-to-vinext/references/compatibility.md`
- Vinext check output: from `npx vinext check` (see above).
