# How to Request a README Update (AI Runnable)

Provide ONLY this file in future sessions to have the AI re-scan and update `README.md` without giving full repo context.

## What the AI will do

- Re-scan these sources: `package.json`, `drizzle.config.ts`, `next.config.ts`, `src/db/schema/`, `src/db/seed.ts`, `src/lib/auth.ts`, `src/app/**/layout.tsx`, `src/app/**/page.tsx`.
- Update sections in `README.md`:
  - Prerequisites and Getting Started
  - Environment variables block (DATABASE_URL, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET)
  - Database setup commands (Drizzle generate, db push, seed)
  - Available scripts from `package.json`
  - Tech stack and configuration notes (Next.js 15, Turbopack, PPR, Drizzle ORM, NextAuth, Neon)
  - Project structure overview
- Keep wording concise, match existing style, do not over-explain.

## Rules

- Use Bun commands where possible; prefer `bunx drizzle-kit` for CLI tasks.
- Reflect the CSS and linting standards from `biome.json` and Tailwind v4.
- Mention `nuqs` for type-safe search params.
- Mention centralized auth types in `src/features/auth/` folder.
- Preserve existing README headings and tone, only patch relevant sections.
- Do not change license wording.

## Quick prompt you can paste

Copy this into the chat with this file attached:

```
Please update README.md based on the codebase. Keep sections accurate and concise, sync env vars with DATABASE_URL and AUTH_GOOGLE_* variables, prefer Bun commands (bunx drizzle-kit ...), include Neon database and NextAuth notes, and ensure scripts from package.json are reflected. Keep headings and tone.
```

## Post-update

- Run Biome format: `bun run format`
- Generate commit message: see `git-commit-msg.md` and run AI to produce message under 140 chars.
