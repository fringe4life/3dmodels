# Cursor pagination with uuidv7 ModelId

Listings used offset `page`. Offset scans grow with catalog size and a limit change had to reset the page. We paginate with an exclusive keyset on `(sortCol, ModelId)`, URL `cursor` + `direction` + `limit`, and keep `ModelSlug` as the public path so detail URLs stay `/3d-models/{slug}`.

Total `COUNT(*)` is dropped; next/prev flags come from `limit+1` and whether a cursor is set. The uuidv7 PK swap rebuilds `models` and **copies** existing rows (generated uuidv7 `id`, same `slug`); `likes` stay because they FK to `slug`. `db:seed` is the catalog wipe, not migrate. List view transitions use pager `forwards`/`backwards` types only—no React key, no RR-style epoch—so search/sort/limit are not page turns.

## Considered Options

- Keep slug as PK and add a uuidv7 column: still unique, but identity would stay split.
- Offset range copy (`1–10 of N`) or keep `COUNT(*)`: fights the migration; count is the slow part at scale.
- Drop-and-reseed the catalog in the PK migration: `drizzle-kit migrate` would erase models/likes on first apply. Copy instead; wipe stays on `db:seed` / `db:drop`.
- ViewTransition `key={cursor-direction}` or van-life page-epoch: Next already has `addTransitionType`; a key remount makes filter/sort look like paging.

## Consequences

- Likes still FK to `models.slug`. Detail lookup stays `WHERE slug = ?`.
- Equal likes / equal `dateAdded` order by ModelId, not name.
- Old `?page=` bookmarks land on the first slice.
- `db:seed` deletes models and likes then reinserts; auth tables stay. Migrate does not.
- **`sort=popular` is a live feed.** Cursor is ModelId only; the next slice rereads live `likes`. When likes change between requests, a model can skip or appear twice. That is accepted (low-stakes browsing, not a duplicate-free export). Frozen `(likes, id)` tokens, HMAC, OFFSET, and rank snapshots were considered and declined. Survey: [MUTABLE_SORT_KEYSET.md](../MUTABLE_SORT_KEYSET.md).
