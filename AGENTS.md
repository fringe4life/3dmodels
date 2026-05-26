<!-- BEGIN:nextjs-agent-rules -->
 
# Next.js: ALWAYS read docs before coding
 
Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.
 
<!-- END:nextjs-agent-rules -->

**Listing URLs & SEO:** For routes that use [nuqs](https://nuqs.dev) query state (`query`, `page`, `limit`), canonical URLs are built with `createLoader` + `createSerializer` from `nuqs/server` (see `src/features/pagination/listing-canonical.ts`), matching `clearOnDefault` client behavior. Wire them in `generateMetadata` as `alternates.canonical` per Next.js [`generateMetadata`](node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md) / [`alternates`](node_modules/next/dist/docs/01-app/03-api-reference/04-functions/generate-metadata.md#alternates). nuqs docs: [SEO](https://nuqs.dev/docs/seo).

Lint/format standards: see .cursor/rules/ultracite.mdc