# Varlock and this project (Next.js 16, Bun, Vercel)

This note summarizes how [Varlock](https://varlock.dev/) fits a Next.js app on **Bun**, deployed to **Vercel**, and calls out friction with **this repo’s** setup. Official docs are the source of truth; links are included below.

## Decisions for this repo

- **`experimental.typedEnv`:** **Off.** Next.js env IntelliSense from `.next/types` is not used. Types come from Varlock (**`@generateTypes`** in **`.env.schema`**) and **`import { ENV } from 'varlock/env'`** instead.
- **Env validation:** **Varlock only** — no Valibot (or other) duplicate schema in `src/utils/env.ts`; that module should be removed or reduced to re-exports once **`.env.schema`** is canonical.

## What Varlock adds

- **`.env.schema`** as a single, AI-safe description of config (names, types, validation) without exposing secret values.
- **Validation, optional type generation**, log redaction, `varlock scan` for leaks, and **`varlock run`** to inject resolved env into arbitrary commands.
- **Next.js**: replaces internal [`@next/env`](https://www.npmjs.com/package/@next/env) loading via **`@varlock/nextjs-integration`** plus a small **`next.config`** plugin.

## Recommended integration path (high level)

1. **Install** `varlock` and `@varlock/nextjs-integration` (see [Next.js integration](https://varlock.dev/integrations/nextjs/)).
2. Run **`varlock init`** and review the generated **`.env.schema`** against existing `.env` files.
3. Add a **package manager override** so `next` depends on `@varlock/nextjs-integration` instead of `@next/env` (required because Next does not expose hooks for env loading).
4. In **`next.config.ts`**, wrap the config with **`varlockNextConfigPlugin()`** from `@varlock/nextjs-integration/plugin` (see [Next.js integration](https://varlock.dev/integrations/nextjs/)).
5. Set **`experimental.typedEnv: false`** (or remove it) in **`next.config.ts`** so Next does not generate competing env types.
6. Use **`import { ENV } from 'varlock/env'`** for typed access; `process.env` continues to work after the override.

## Bitwarden (Secrets Manager) with Varlock

Varlock’s Bitwarden integration targets **Bitwarden Secrets Manager** (organization secrets accessed by **machine accounts**), not the personal password vault UI. See the [Bitwarden plugin](https://varlock.dev/plugins/bitwarden/) and [Varlock plugins guide](https://varlock.dev/guides/plugins/#installation).

### Why this fits CI and Vercel

- Authentication uses a **machine account access token** (shown once when created). You store **`BITWARDEN_ACCESS_TOKEN`** (or similar) in **Vercel Environment Variables** / local `.env.local`, not in git.
- Secrets are referenced by **UUID** in **`.env.schema`** via the **`bitwarden()`** resolver. At build or runtime, Varlock calls Bitwarden’s API using the token.

### `.env.schema` pattern (minimal)

```env
# @plugin(@varlock/bitwarden-plugin)
# @initBitwarden(accessToken=$BITWARDEN_ACCESS_TOKEN)
# ---
# @type=bitwardenAccessToken @sensitive
BITWARDEN_ACCESS_TOKEN=

# Example: load a DB URL from Secrets Manager by secret UUID
# DATABASE_URL=bitwarden("12345678-1234-1234-1234-123456789abc")
```

Install the package **`@varlock/bitwarden-plugin`** as a dependency, or load the plugin from the schema with a version per the [plugins installation](https://varlock.dev/guides/plugins/#installation) docs.

### Bitwarden org setup (high level)

1. In **Secrets Manager** → **Machine accounts** → create a machine account, **copy the access token** (one-time display).
2. **Grant** that account access: preferably via a **project** (add secrets to the project, grant the machine account access), or per-secret **Access** with **Can read** (or read/write if needed).
3. In Bitwarden, each secret has a **UUID**; use that UUID inside **`bitwarden("…")`** in **`.env.schema`**.

### Self-hosted and multiple orgs

- **Self-hosted:** pass **`apiUrl`** and **`identityUrl`** to **`@initBitwarden`** (see [Bitwarden plugin](https://varlock.dev/plugins/bitwarden/)).
- **Multiple instances:** use named inits, e.g. **`@initBitwarden(id=prod, accessToken=$PROD_ACCESS_TOKEN)`** and **`bitwarden(prod, "uuid")`** vs **`bitwarden(dev, "uuid")`**.

### Vercel

- Add **`BITWARDEN_ACCESS_TOKEN`** (and any other non-resolved bootstrap vars) in the Vercel project’s **Environment Variables** for Preview/Production as needed.
- Ensure the machine account can reach Bitwarden’s API from the build environment (default Bitwarden cloud endpoints unless self-hosted).

### Troubleshooting

Use Varlock’s [Bitwarden plugin troubleshooting](https://varlock.dev/plugins/bitwarden/) (wrong UUID, denied access, bad/expired token, self-hosted URL mistakes).

## Bun-specific issues

This repo runs Next via **`bun --bun`** in `package.json` scripts. Bun loads `.env` files automatically, which can **fight Varlock’s resolution order**.

Per [Varlock’s Bun docs](https://varlock.dev/integrations/bun/):

- Set **`env = false`** in **`bunfig.toml`** to disable Bun’s automatic `.env` loading, **or** use **`--no-env-file`** on `bun` invocations.
- Optionally set **`preload = ["varlock/auto-load"]`** in `bunfig.toml` so you do not need `import 'varlock/auto-load'` everywhere or `varlock run --` for every script—evaluate this against your test preload (`[test] preload` is already used here).

**Action:** Expect to adjust `bunfig.toml` once Varlock is added; retest `bun test`, `drizzle-kit`, and `next dev`/`build`.

## Vercel deployment

### What works

- Vercel injects env vars at build and runtime. Varlock still **loads and validates** that pipeline; you map platform vars in **`.env.schema`** (e.g. with **`fallback`**, **`remap`**, or explicit items).
- The [Next.js integration doc](https://varlock.dev/integrations/nextjs/) recommends tying **`APP_ENV`** to **`VERCEL_ENV`** so preview/production match Vercel’s notion of environment, for example:

  ```env
  # @currentEnv=$APP_ENV
  # ---
  # @type=enum(development, preview, production)
  VERCEL_ENV=
  # @type=enum(development, preview, production, test)
  APP_ENV=fallback($VERCEL_ENV, development)
  ```

  Adjust to match how you branch **development** vs **preview** vs **production** locally and on Vercel.

### Caveats

- **Bootstrap tokens** (e.g. **`BITWARDEN_ACCESS_TOKEN`**) must be present where Varlock runs (local shell, Vercel env, CI). They are not fetched from Bitwarden by magic without configuration.
- **`varlock run` in production**: The [standalone mode](https://varlock.dev/integrations/nextjs/) section notes that **standalone** output needs copying `.env.*` and running with the **varlock CLI** installed. This repo does **not** use `output: 'standalone'` today; if you add it later, follow Varlock’s standalone instructions.
- **Branch-based logic**: For finer control than `VERCEL_ENV`, the docs point at **`VERCEL_GIT_COMMIT_REF`** and similar—useful if schema composition depends on branch name.

## Friction with the **current** tech stack

### 1. `package.json` **overrides** already exist

The project uses a large top-level **`overrides`** block. The Varlock Next.js setup needs a **nested** override:

```json
"overrides": {
  "next": {
    "@next/env": "npm:@varlock/nextjs-integration"
  }
}
```

You must **merge** this with existing overrides without dropping security pins. Test **`bun install`** after the change and confirm **`process.env.__VARLOCK_ENV`** / Varlock’s troubleshooting steps if the [documented error](https://varlock.dev/integrations/nextjs/) appears.

### 2. **`NEXT_PUBLIC_` prefix and Varlock**

Public client vars use **`NEXT_PUBLIC_SITE_URL`** as the canonical app URL. Varlock can model **`NEXT_PUBLIC_`** sensitivity via **`@defaultSensitive=inferFromPrefix('NEXT_PUBLIC_')`** or explicit decorators ([Next.js integration](https://varlock.dev/integrations/nextjs/)).

### 3. **Tools outside Next: Drizzle, Playwright, scripts**

- **`drizzle.config.ts`** reads **`process.env.DATABASE_URL`** directly. Drizzle CLI does not use `next.config`; ensure **`DATABASE_URL`** is available when running **`drizzle-kit`** (shell env, `.env`, or `varlock run -- bun x drizzle-kit ...`).
- **`playwright.config.ts`** and **`tests/setup/test-preload.ts`** set or assume env. After Varlock + optional `bunfig` changes, re-verify **e2e** and **unit** runs.
- **`db:seed`**, **`db:drop`**, etc. use **`bun --conditions=react-server`**: confirm env loading matches expectations once Bun auto-env is disabled.

### 4. **`next.config.ts` export style**

Varlock’s doc shows wrapping the default export with **`varlockNextConfigPlugin()(nextConfig)`**. This repo’s config is a plain object today; you will need a small refactor to **compose** the plugin with existing **`cacheComponents`**, **`reactCompiler`**, **`experimental`**, etc., without breaking ordering.

### 5. **Security and compliance overhead**

`varlock scan` and stricter handling of secrets are positives, but they add **CI and contributor workflow** steps (e.g. documenting when to run `scan`, what is allowed in `.env.local`). Plan for that if you adopt Varlock org-wide.

## Quick reference links

| Topic | URL |
| --- | --- |
| Varlock home | [varlock.dev](https://varlock.dev/) |
| Next.js integration | [integrations/nextjs](https://varlock.dev/integrations/nextjs/) |
| Bun integration | [integrations/bun](https://varlock.dev/integrations/bun/) |
| Bitwarden plugin | [plugins/bitwarden](https://varlock.dev/plugins/bitwarden/) |
| Varlock plugins (install) | [guides/plugins](https://varlock.dev/guides/plugins/) |
| Introduction | [getting-started/introduction](https://varlock.dev/getting-started/introduction/) |
| Root decorators (e.g. `@generateTypes`, `@currentEnv`) | [reference/root-decorators](https://varlock.dev/reference/root-decorators/) |
| Next.js env variables (baseline behavior) | [Environment variables](https://nextjs.org/docs/app/guides/environment-variables) |
| Bitwarden Secrets Manager | [bitwarden.com/products/secrets-manager](https://bitwarden.com/products/secrets-manager/) |
| Machine accounts (Bitwarden help) | [Machine accounts](https://bitwarden.com/help/machine-accounts/) |

## Summary

Varlock is a strong fit for **schema-first, AI-safe config** and **Next.js** via **`@varlock/nextjs-integration`**. This repo will use **Varlock types only** (no Next **`typedEnv`**), **no Valibot** for env once migrated, **`@varlock/bitwarden-plugin`** for **Secrets Manager** secrets where desired, and should plan for **Bun `bunfig`**, **merged npm overrides**, and **Vercel**-injected tokens (e.g. **`BITWARDEN_ACCESS_TOKEN`**) alongside UUID-based **`bitwarden()`** references in **`.env.schema`**.
