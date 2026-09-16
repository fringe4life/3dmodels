# Cursor pagination with uuidv7 ModelId

Listings used offset `page`. Offset scans grow with catalog size and a limit change had to reset the page. We paginate with an exclusive keyset on `(sortCol, ModelId)`, URL `cursor` + `direction` + `limit`, and keep `ModelSlug` as the public path so detail URLs stay `/3d-models/{slug}`.

Total `COUNT(*)` is dropped; next/prev flags come from `limit+1` and whether a cursor is set. Existing catalog rows are reseeded rather than backfilled so the SQLite PK swap stays a table rebuild. List view transitions use pager `forwards`/`backwards` types only—no React key, no RR-style epoch—so search/sort/limit are not page turns.

## Considered Options

- Keep slug as PK and add a uuidv7 column: still unique, but identity would stay split.
- Offset range copy (`1–10 of N`) or keep `COUNT(*)`: fights the migration; count is the slow part at scale.
- Timestamp-preserving uuidv7 backfill: listing order already uses `dateAdded` in the keyset; disposable DB made reseed enough.
- ViewTransition `key={cursor-direction}` or van-life page-epoch: Next already has `addTransitionType`; a key remount makes filter/sort look like paging.

## Consequences

- Likes still FK to `models.slug`. Detail lookup stays `WHERE slug = ?`.
- Equal likes / equal `dateAdded` order by ModelId, not name.
- Old `?page=` bookmarks land on the first slice.
- Reseed deletes models and likes; auth tables stay.
