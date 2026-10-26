# Models listing query performance (Drizzle + Turso/libSQL)

Research note, not an ADR. Listing already uses exclusive keyset pagination and dropped `COUNT(*)` ([ADR 0001](./adr/0001-cursor-pagination.md)). This note answers whether drizzle-orm `1.0.0-rc.5` makes it safe to restore prepared list/count queries with optional search/category, and which SQLite/libSQL levers actually move this query shape.

**Short answer:** RC.5’s `EmptyFilter` and Placeholder typing fixes do **not** restore optional `.prepare()` + `sql.placeholder` for this listing. Official Drizzle guidance for optional filters is still “omit the clause at SQL-build time” (`and()` drops `undefined`; push into an `SQL[]`). A single prepared statement cannot express optional search, optional category, optional keyset predicate, and three sorts without dummy predicates or a family of statements. On remote `@libsql/client`, Drizzle `.prepare()` still sends `{ sql, args }` on every execute — it does not keep a server-side `sqlite3_stmt`. The next experiment should be **EXPLAIN QUERY PLAN + category-prefixed keyset indexes**, not re-preparing the old flag/`%%`/`""` query.

## Context (current query behavior)

Stack (verified): Next.js App Router, `drizzle-orm@1.0.0-rc.5`, `@libsql/client`, Turso SQLite. Client is `drizzle({ client, relations })` in `src/db/index.ts` (`jit` is **not** set).

Hot path:

1. `searchModels` (`src/features/models/dal/search-models.ts`) wraps `getModelsList` in `"use cache: remote"` + `cacheTag("models")`. Search pattern is `%${query}%` or omitted.
2. `getModelsList` (`src/features/models/queries/get-models-list.ts`) builds `filter = buildModelsWhere(...)`, optionally loads the cursor row (`getCursorRow`), builds a keyset predicate (`createKeysetCursorPredicate`), then `db.select().from(models).where(and(filter, keyset) | filter).orderBy(...orderByForSort).limit(take)` with `take = limit + 1`.
3. `buildModelsWhere` (`src/features/models/queries/build-models-where.ts`) returns `SQL | undefined`: optional `or(like(name COLLATE NOCASE), like(description COLLATE NOCASE))`, optional `eq(categorySlug, category)`.
4. Sorts (`src/features/models/sort/order-for-sort.ts`): alphabetic `(name, id)`, popular `(likes, id)`, recent `(dateAdded, id)`, reversed when `direction === "backward"`.
5. Schema indexes (`src/db/schema/models.ts`): `models_date_added_id_idx`, `models_likes_id_idx`, `models_name_id_idx`. **No index on `category_slug`.** `select()` is full-row.

`COUNT(*)` is gone: next/prev come from `limit+1` and whether a cursor is set ([ADR 0001](./adr/0001-cursor-pagination.md)). `paginateItems` is a try/catch wrapper around one page fetch, not list+count in parallel ([PERFORMANCE_IMPROVEMENTS.md](./PERFORMANCE_IMPROVEMENTS.md) still describes the older parallel list+count pattern). Mutable popular keyset is documented in [MUTABLE_SORT_KEYSET.md](./MUTABLE_SORT_KEYSET.md).

**History (this repo):** `e8cf862` prepared `get_models_list` / `get_models_count` with boolean `hasSearch` / `hasCategory` placeholders and dummies `searchPattern ?? "%%"`, `category ?? ""`, plus `ilike` (Postgres) and `OFFSET`. `5fa2249` replaced that with `buildModelsWhere` when `category_slug` became a Postgres enum (`""` was invalid even when `hasCategory=false`). The project later moved to Turso/SQLite (`54e919e`); category is now `text(..., { enum })` — empty string would bind, but the SQL shape is no longer one statement.

SQL variants today (combinatorial): search on/off × category on/off × cursor on/off × 3 sorts × 2 directions.

---

## 1. Prepared statements with optional filters (Drizzle)

### What official docs say about `.prepare()` + `sql.placeholder`

[Query performance](https://orm.drizzle.team/docs/perf-queries) describes three steps on each unprepared run: concatenate the query builder to SQL, send SQL+params to the driver, driver compiles to executable form. `.prepare()` is how you concatenate **once** and reuse. Placeholders are **named runtime values inside a fixed SQL string**:

```ts
eq(customers.id, sql.placeholder("id"));
sql`lower(${customers.name}) like ${sql.placeholder("name")}`;
prepared.execute({ id: 10 });
```

The SQL text is fixed at prepare time. [SQL comments](https://orm.drizzle.team/docs/sql-comments) state the same: you cannot change a prepared query afterwards.

[RQB prepared statements](https://orm.drizzle.team/docs/rqb) show placeholders in object `where` / `limit` / `offset`, then `.prepare("query_name").execute({ ... })`. Every example still has a **fixed** filter tree (the `id` comparison is always present). There is no documented “optional placeholder” or `ignore_undefined` on `.prepare()`.

[`$dynamic()`](https://orm.drizzle.team/docs/dynamic-query-building) only relaxes “call `.where()` once” so helpers can append clauses **before** execute. It does not make a prepared SQL string grow or shrink at execute time.

`and()` / `or()` **drop `undefined` at compile time** ([`conditions.ts` `and`](https://github.com/drizzle-team/drizzle-orm/blob/v1.0.0-rc.5/drizzle-orm/src/sql/expressions/conditions.ts)): “Conditions that are equal `undefined` are automatically ignored.” That changes the SQL string. It is the right tool for **unprepared** optional filters (this repo’s `buildModelsWhere`). It is the opposite of a single prepared statement.

Official maintainers, on optional filters ([issue #720](https://github.com/drizzle-team/drizzle-orm/issues/720)): Andrii Sherman’s pattern is `const where: SQL[] = []; if (…) where.push(eq(…)); db.select().where(and(...where))`. A later comment on the same issue: “this pattern won’t work in prepared statements” — you need `CASE` / `COALESCE(col = :cond, :cond IS NULL)` (or equivalent) so the SQL stays fixed.

Community pattern for **prepared** optional equality is a **always-present** predicate with a typed null bind, Postgres-only as written ([discussion #3890](https://github.com/drizzle-team/drizzle-orm/discussions/3890)): `($slug::text IS NULL OR col = $slug::text)`. Uncast `$1 IS NULL` on Postgres fails with “could not determine data type of parameter” ([issue #709](https://github.com/drizzle-team/drizzle-orm/issues/709)). SQLite is dynamically typed ([datatypes](https://www.sqlite.org/datatype3.html)); `? IS NULL OR col = ?` does not need `::text`, but the predicate is still in the plan even when the bind is null (index-unfriendly vs omitting the clause).

### What RC.5 actually changed

Source: [drizzle-orm `v1.0.0-rc.5` release notes](https://github.com/drizzle-team/drizzle-orm/releases/tag/v1.0.0-rc.5) (2026-10-21).

| RC.5 item | What it is | Listing path? |
| --- | --- | --- |
| **`EmptyFilter`** | RQB `db.query.*.findMany({ where: { field: params.x ?? EmptyFilter } })`. `undefined` in RQB filters now **throws**. `EmptyFilter` means “skip this field at **SQL-build** time.” Import: `drizzle-orm/relations` in the tag notes (DevRel checklist also shows `drizzle-orm`). | **No.** Listing uses SQL builder `db.select().from(models).where(SQL \| undefined)`, not RQB object filters. Skipping a field still **changes SQL**, so it cannot sit behind one `.prepare()`. |
| Empty `{}` relation filters skipped; `true`/`false` for presence | RQB relation existence | Unused here. |
| **`mapper` caching for queries reused without `.prepare()`** | JS row-mapper reuse when the same query shape is executed without calling `.prepare()` | **Yes, already available** for repeated `select()` of `models` if the selection is stable. Not a DB prepared statement. Release notes do not document the cache key; treat as “same mapper work as `.prepare()` without pinning SQL.” |
| **Placeholder `value` / `name` / deprecated `getSQL`** | Typing/autocomplete so Placeholder fields do not bleed into RQB filters | Does **not** add optional placeholders. |
| Optimized query building / mapper generation; `jit` mappers (from earlier RCs, documented at [JIT mappers](https://orm.drizzle.team/docs/sqlite/jit-mappers)) | `drizzle({ jit: true })` compiles a per-selection mapper. Default **off**. | App does not enable `jit`. Per-row mapping of a small `LIMIT` page is unlikely to dominate Turso RTT. |
| `$withCache` / query result cache | Optional result cache on the Drizzle `Cache` plugin, distinct from Next `"use cache: remote"` | Listing already uses Next cache tags. |

RQB `.prepare()` + `EmptyFilter` together: `EmptyFilter` is evaluated when the query object is built. A prepared RQB query still needs a **stable** `where` tree of `sql.placeholder`s. You cannot pass `EmptyFilter` at `.execute()` time to drop a clause. So RQB prepare does **not** help `getModelsList`.

### libSQL / Drizzle `.prepare()` on this driver

[`LibSQLSession.prepareQuery`](https://github.com/drizzle-team/drizzle-orm/blob/v1.0.0-rc.5/drizzle-orm/src/libsql/session.ts) implements `all` / `get` / `run` as:

`client.execute({ sql: query.sql, args: params })`.

The `prepare` boolean argument is unused (`_prepare`). There is no `client.prepare()` and no named PostgreSQL-style statement. Every execution ships the full SQL string over the wire.

Turso’s [`@libsql/client` reference](https://docs.turso.tech/sdk/ts/reference) documents `execute({ sql, args })` and `batch([...])` with `?` / `:name` / `@` / `$` placeholders. The **local** `@tursodatabase/database` API has `db.prepare()` (in-process `sqlite3_stmt`). This repo’s remote client is the execute/pipeline model ([SQL over HTTP](https://docs.turso.tech/sdk/http/reference) also sends `stmt.sql` + `args` per request).

So “restore `.prepare()`” here mainly saves **Drizzle SQL concatenation + mapper setup**, not a persistent server-side compiled statement. RC.5 mapper caching without `.prepare()` targets that same JS cost.

SQLite’s own prepared statements ([`sqlite3_prepare_v2`](https://www.sqlite.org/c3ref/prepare.html)) **do** matter **inside** the Turso primary: each inbound SQL is compiled (and may recompile when a `LIKE` bind changes — see §3). Client-side `.prepare()` does not skip that compile on HTTP.

---

## 2. Known patterns for optional prepared predicates

| Pattern | Primary source | Postgres vs SQLite here |
| --- | --- | --- |
| **Omit clause; do not prepare** | Sherman in [#720](https://github.com/drizzle-team/drizzle-orm/issues/720); `and()` ignores `undefined` ([conditions.ts](https://github.com/drizzle-team/drizzle-orm/blob/v1.0.0-rc.5/drizzle-orm/src/sql/expressions/conditions.ts)); `$dynamic()` only for chaining ([docs](https://orm.drizzle.team/docs/dynamic-query-building)) | **Current code.** Correct for optional search/category/keyset. |
| **Boolean guard flags** (`hasSearch = false OR like …`) | This repo `e8cf862` (`get-models-list` / `get-models-count`) | Works on SQLite (bool is 0/1, [datatype3](https://www.sqlite.org/datatype3.html) §2.1). Planner still sees `OR` / `LIKE` (bad for indexes — [queryplanner OR](https://www.sqlite.org/queryplanner.html#or_connected_terms_in_the_where_clause)). |
| **Always-bind dummies** (`%%`, `""`) | Same historical queries | SQLite TEXT accepts `""`. Postgres enum did not. `LIKE '%%'` matches all ASCII-capable text; combined with a false flag it is dead work. Leading `%` **disables** SQLite LIKE index optimization ([optoverview §5](https://www.sqlite.org/optoverview.html#the_like_optimization)). |
| **`IS NULL OR col = ?`** (always bind `null` when unused) | [#3890](https://github.com/drizzle-team/drizzle-orm/discussions/3890) (`::text` / `::integer` casts); [#709](https://github.com/drizzle-team/drizzle-orm/issues/709) | Casts are **Postgres**. SQLite: bind null without `::`. Residual predicate still in the plan. |
| **`CASE` / `COALESCE(col = :cond, :cond IS NULL)`** | arily on [#720](https://github.com/drizzle-team/drizzle-orm/issues/720) | Fixed SQL for MySQL/Postgres prepared; SQLite equivalent exists but is index-hostile vs omitting. |
| **Family of prepared variants** keyed by which clauses exist | Implied by “SQL is fixed at prepare” ([perf-queries](https://orm.drizzle.team/docs/perf-queries), [sql-comments](https://orm.drizzle.team/docs/sql-comments)) | Fits 3 sorts × cursor × filters if you accept ~dozens of statements. Weak payoff on HTTP libsql. |
| **RQB `EmptyFilter`** | [rc.5 notes](https://github.com/drizzle-team/drizzle-orm/releases/tag/v1.0.0-rc.5) | Build-time omit only; not `.execute()` optional. |

**Do not restore the old prepared query as-is** just because SQLite has no enum: `ilike` is not SQLite (`like` is already ASCII-case-insensitive by default, [lang_expr LIKE](https://www.sqlite.org/lang_expr.html#like)); OFFSET is retired; keyset + sort are extra SQL shapes the old statement never had.

---

## 3. Performance levers for this query shape (SQLite / libSQL)

### Indexes vs current predicates

SQLite uses an index when WHERE terms match a **left prefix** of the index, with equality (or IN/IS) on leading columns and optional inequality on the last used column ([optimizer overview §2](https://www.sqlite.org/optoverview.html)). Keyset `(sortCol, id)` plus `ORDER BY sortCol, id` is exactly “search and sort with a multi-column index” ([queryplanner §3.1](https://www.sqlite.org/queryplanner.html)). Existing `(date_added, id)`, `(likes, id)`, `(name, id)` indexes match **unfiltered** (or search-free) keyset for those sorts.

**Category** is `eq(category_slug, ?)` with no supporting index. A useful index is `(category_slug, sortCol, id)` so equality on category plus keyset/order share one btree ([queryplanner §3.1](https://www.sqlite.org/queryplanner.html)). Three sorts ⇒ three composites (or accept worse plans on two of them).

**Covering indexes** avoid the table lookup when the index holds every selected column ([queryplanner §1.7](https://www.sqlite.org/queryplanner.html)). `select()` of full `models` rows makes a covering index essentially a second copy of the table. Low value until the catalog is huge; SQLite itself calls covering a constant-factor refinement, not a million-fold win.

### `LIKE` + `COLLATE NOCASE` vs FTS5

Default SQLite `LIKE` is case-insensitive for **ASCII** only ([lang_expr](https://www.sqlite.org/lang_expr.html#like)). `COLLATE NOCASE` is a separate collation (uppercase ASCII folding, [datatype3 §7](https://www.sqlite.org/datatype3.html)). This app applies `LIKE` to `models.name COLLATE NOCASE` and `models.description COLLATE NOCASE` (`buildModelsWhere`) with pattern `%query%`.

LIKE **index** optimization requires the pattern **not** to start with a wildcard, and a `NOCASE` index when `case_sensitive_like` is off ([optoverview §5](https://www.sqlite.org/optoverview.html#the_like_optimization)). Leading `%` ⇒ linear scan of matching rows (or the whole table if unfiltered). Expression `col COLLATE NOCASE` is also not the same as an indexed column with that collation.

**FTS5 trigram** is SQLite’s documented way to index substring `LIKE '%…%'` ([FTS5 trigram tokenizer](https://www.sqlite.org/fts5.html)): `tokenize="trigram"` (default case-insensitive) supports `WHERE col LIKE '%cdefg%'`. Tokens shorter than 3 unicode characters do not match in MATCH mode; LIKE/GLOB without a 3-char non-wildcard run falls back to a scan.

**Turso Cloud + `@libsql/client`:** FTS5 is a **preloaded SQLite extension** ([SQLite extensions](https://docs.turso.tech/features/sqlite-extensions)). That is the relevant FTS for this codebase.

**Do not confuse** with Turso Database’s Tantivy FTS (`CREATE INDEX … USING fts`, `fts_match`) in [FTS functions](https://docs.turso.tech/sql-reference/functions/fts) — that engine is `@tursodatabase/database` / serverless, not this Drizzle `libsql` client.

### Prepared statements / statement cache on Turso

- Remote: bind parameters on `execute` / HTTP pipeline ([TS reference](https://docs.turso.tech/sdk/ts/reference), [HTTP](https://docs.turso.tech/sdk/http/reference)).
- `client.batch(stmts, "read")` runs several statements in **one** round trip / implicit transaction. Listing cannot batch cursor lookup + page unless rewritten as **one** SQL (page depends on live likes/`dateAdded`/`name` from the cursor row).
- Concurrency default 20 on the client ([TS reference](https://docs.turso.tech/sdk/ts/reference)).
- SQLite recompiles prepared `LIKE`/`GLOB` when the bound pattern changes (`sqlite3_prepare_v2` behavior, [optoverview §5](https://www.sqlite.org/optoverview.html#the_like_optimization) / [prepare](https://www.sqlite.org/c3ref/prepare.html)). Search strings change constantly; a prepared `LIKE ?` is not a stable plan.

### Mapper cache vs `.prepare()` vs JIT

- RC.5: mapper cache without `.prepare()` ([release notes](https://github.com/drizzle-team/drizzle-orm/releases/tag/v1.0.0-rc.5)).
- `.prepare()` on libsql: concatenate SQL once per process; still `execute({ sql, args })`.
- `jit: true`: generate a function per selection ([JIT mappers](https://orm.drizzle.team/docs/sqlite/jit-mappers)). Page size is small (`limit + 1`); network and scans dominate.

### List + count batching

ADR 0001 already dropped count as “the slow part at scale.” Reintroducing `COUNT(*)` (prepared or not) fights that. If a total is ever required, MariaDB’s pagination note (see [MUTABLE_SORT_KEYSET.md](./MUTABLE_SORT_KEYSET.md) sources) prefers estimates / periodic count tables over per-request `COUNT(*)`. `Promise.all([list, count])` only hides latency if both round-trips run; `client.batch` on **read** would be the libSQL-native way to fuse them.

### OFFSET

Already avoided. OFFSET still computes skipped rows ([SQLite row values / scrolling windows](https://www.sqlite.org/rowvalue.html); [ADR 0001](./adr/0001-cursor-pagination.md)). Do not bring it back for prepare convenience.

### Extra round trip: `getCursorRow`

Popular/recent/name keyset rereads the cursor row before the page query (`getModelsList`). That is a second `execute` on the same request (accepted for live likes in [MUTABLE_SORT_KEYSET.md](./MUTABLE_SORT_KEYSET.md)). Folding it into one SQL (join/subquery) would cut RTT; it is independent of prepare.

---

## 4. Ranked options (this codebase)

| # | Option | Expected win | Complexity | Keyset + multi-sort | Risks |
| --- | --- | --- | --- | --- | --- |
| **A** | Restore prepared **count-only** or **fixed-sort** paths | Count: none today (no `COUNT(*)`). Fixed-sort first page: small JS concat/mapper save; **no** saved Turso compile/HTTP. | Low for a no-filter alphabetic first page; medium if flags/`%%` return. | Count ignores keyset. Fixed-sort prepare **breaks** as soon as cursor/search/category/sort/direction differ. | Repeats enum-era dummy-bind bugs if any typed column appears. `ilike` must not return. OFFSET must not return. |
| **B** | Keep dynamic `where` + RC.5 mapper cache + **indexes** | **Largest realistic win:** category listings can seek `(category, sortCol, id)` instead of scan. Unfiltered keyset already has indexes. Mapper cache is already in rc.5. | Low–medium (schema + migrate + `EXPLAIN QUERY PLAN`). | Designed for this. | Write amplification on likes/`dateAdded`. Covering indexes of `SELECT *` are fat. |
| **C** | SQLite **FTS5 trigram** (or FTS5 MATCH) for search | Indexed substring search; only matters if `%query%` scans hurt. Catalog is a seed-sized 3D model list — likely premature. | High: virtual table, triggers to sync `name`/`description`, Drizzle/SQL raw, query rewrite, keep keyset on `models` via `rowid`/`id` join. | Keyset stays on `models`; FTS is a prefilter. Joining FTS + category + keyset is easy to plan poorly. | Trigger lag; short queries (<3 chars); Turso FTS5 vs Tantivy confusion; operational cost vs cache. |
| **D** | Multiple prepared variants (sort × cursor × filters) | JS concat once per variant. HTTP still sends SQL. | High (dozens of statements or a generator). | Compatible if every variant is complete SQL. | Maintenance; LIKE recompile; libsql `prepare` flag unused. |
| **E** | Boolean-flag / `IS NULL OR` **one** mega-statement | One object to call. Planner sees always-on `OR`/`LIKE`. | Medium. | Keyset still needs optional predicate or more flags. | Index-unfriendly; dummy binds. |
| **F** | `drizzle({ jit: true })` | Faster row mapping on large result sets. | Trivial. | Orthogonal. | `Function` constructor / CSP; need to verify runtime ([JIT docs](https://orm.drizzle.team/docs/sqlite/jit-mappers)). Tiny `LIMIT`. |
| **G** | Fuse `getCursorRow` + page into one statement; or `batch` only independent reads | One less RTT when paginating. | Medium (SQL). | Must preserve live likes reread ([MUTABLE_SORT_KEYSET.md](./MUTABLE_SORT_KEYSET.md)). | Harder to test; still two logical predicates. |
| **H** | Turso Tantivy `USING fts` | N/A on `@libsql/client`. | — | — | Wrong engine. |

**Rank for this repo:** **B first**, then **G** if EXPLAIN is already using the sort indexes and RTT shows up, then **F** as a cheap probe, then **C** only after search scans are measured, **D/A/E last**.

---

## 5. Recommendation

**Next experiment: measure plans, then add category-prefixed keyset indexes. Do not restore prepared list/count.**

1. **Baseline (no schema change).** Log `toSQL()` from the listing query (or `EXPLAIN QUERY PLAN` via `db.all(sql\`explain query plan ${qb.getSQL()}\`)` / Turso console) for:
   - first page, no search, no category, each `sort`
   - first page, category only, each `sort`
   - first page, search `%foo%`, with and without category
   - second page (cursor + keyset) for `recent` and `popular`
2. **Confirm** unfiltered keyset uses `models_*_id_idx`; category-only uses **SCAN** (expected: no `category_slug` index); search uses SCAN because of leading `%`.
3. **If category SCAN is real traffic**, add:
   - `index("models_category_name_id_idx").on(categorySlug, name, id)`
   - `index("models_category_likes_id_idx").on(categorySlug, likes, id)`
   - `index("models_category_date_added_id_idx").on(categorySlug, dateAdded, id)`
   Re-run EXPLAIN. Expect search to **still** scan (do not “fix” that with prepare or `COLLATE NOCASE` btree indexes).
4. **How to measure:** compare EXPLAIN (scan vs search), Turso/query duration (Drizzle `logger: true` or Sentry SQL spans if enabled), and listing TTFB with Next cache **bypassed** (otherwise `"use cache: remote"` hides DB time). Use a copy of production-sized data, not the tiny test seed, or the indexes will look free and scans will look cheap.

Prepared statements stay off the listing path until a **fixed** SQL (e.g. `getCursorRow` by id) is worth concatenating once — and even then libsql will resend SQL. `EmptyFilter` is unrelated. FTS5 is a later search-specific project, using Turso’s **FTS5 extension**, not Tantivy.

---

## 6. Measured baseline (Turso MCP, 2026-10-26)

Database: `3d-models` (52 models, 10 categories, ~5–6 rows per category). Probe branch `3d-models-idx-probe` for index A/B only.

### Production `EXPLAIN QUERY PLAN` (before category indexes)

| Shape | Plan detail |
| --- | --- |
| Unfiltered alphabetic `ORDER BY name, id LIMIT 11` | `SCAN models USING INDEX sqlite_autoindex_models_2` (UNIQUE `name`) |
| Unfiltered popular / recent | `SCAN … USING INDEX models_likes_id_idx` / `models_date_added_id_idx` |
| Category only, any sort | Same as unfiltered sort indexes — **category is a residual filter**, not a seek |
| Search `%stand%` (± category) | `SCAN … sqlite_autoindex_models_2` (leading `%` → no LIKE opt) |
| Recent / popular keyset (no category) | `SEARCH … models_date_added_id_idx (date_added<?)` / `models_likes_id_idx (likes<?)` |
| Category + recent keyset | Still `SEARCH … models_date_added_id_idx (date_added<?)` — category residual |
| `getCursorRow` by `id` | `SEARCH … sqlite_autoindex_models_1 (id=?)` |

Alphabetic keyset (`name > ?`) also uses UNIQUE `name`, not `models_name_id_idx` — unique names make the composite mostly redundant for that sort today.

### Turso analytics (live `3d-models`, MCP `database_analytics`)

| Query (normalized) | count | elapsed_ms | rows_read |
| --- | --- | --- | --- |
| List by `category_slug = ?` `ORDER BY name, id` `LIMIT ?` | 6 | 426.8 | **312** (~52/query) |
| Unfiltered list `ORDER BY name, id` `LIMIT ?` | 1 | 13.0 | **11** |
| Detail by `slug` | 24 | 3827.4 | 24 (~1/query; RTT-dominated) |

Category listing already reads the whole table per page on this tiny catalog. That matches “walk sort index, filter category.”

### Probe after `(category_slug, sortCol, id)` indexes

Created on `3d-models-idx-probe` only:

- `models_category_name_id_idx`
- `models_category_likes_id_idx`
- `models_category_date_added_id_idx`

| Shape | Plan after |
| --- | --- |
| Category + alphabetic / popular / recent | `SEARCH … models_category_*_id_idx (category_slug=?)` |
| Category + recent keyset | `SEARCH … models_category_date_added_id_idx (category_slug=? AND date_added<?)` |
| Search + category | `SEARCH … models_category_name_id_idx (category_slug=?)` then residual `LIKE` |

**Verdict:** Recommendation §5 confirmed on real Turso. The three category-prefixed indexes shipped in schema + migration `20261026104846_mixed_marrow` and were applied to production `3d-models` (verified `SEARCH … models_category_*_id_idx`). Probe branch `3d-models-idx-probe` deleted. Leave prepared list/count alone.

---

## Sources

### Official / first-party

- [Drizzle — Query performance (`.prepare`, `sql.placeholder`)](https://orm.drizzle.team/docs/perf-queries)
- [Drizzle — Relational query builder prepared statements](https://orm.drizzle.team/docs/rqb)
- [Drizzle — Dynamic query building (`$dynamic`)](https://orm.drizzle.team/docs/dynamic-query-building)
- [Drizzle — SQL comments (prepared SQL is fixed)](https://orm.drizzle.team/docs/sql-comments)
- [Drizzle — SQLite JIT mappers](https://orm.drizzle.team/docs/sqlite/jit-mappers)
- [drizzle-orm `v1.0.0-rc.5` release notes](https://github.com/drizzle-team/drizzle-orm/releases/tag/v1.0.0-rc.5)
- [drizzle-orm `and()` / `or()` ignore `undefined`](https://github.com/drizzle-team/drizzle-orm/blob/v1.0.0-rc.5/drizzle-orm/src/sql/expressions/conditions.ts)
- [drizzle-orm `LibSQLSession.prepareQuery` → `client.execute({ sql, args })`](https://github.com/drizzle-team/drizzle-orm/blob/v1.0.0-rc.5/drizzle-orm/src/libsql/session.ts)
- [Andrii Sherman — optional `SQL[]` + `and()` (#720)](https://github.com/drizzle-team/drizzle-orm/issues/720)
- [Optional prepared filters / PG casts (#3890)](https://github.com/drizzle-team/drizzle-orm/discussions/3890)
- [Prepared `IS NULL` needs a PG type (#709)](https://github.com/drizzle-team/drizzle-orm/issues/709)
- [Turso TypeScript reference (`@libsql/client` execute, placeholders, batch, concurrency)](https://docs.turso.tech/sdk/ts/reference)
- [Turso SQL over HTTP (stmt.sql + args)](https://docs.turso.tech/sdk/http/reference)
- [Turso preloaded SQLite extensions (FTS5)](https://docs.turso.tech/features/sqlite-extensions)
- [Turso Tantivy FTS (different engine; `USING fts`)](https://docs.turso.tech/sql-reference/functions/fts)
- [SQLite query planner (indexes, covering, OR, search+sort)](https://www.sqlite.org/queryplanner.html)
- [SQLite optimizer overview (LIKE optimization)](https://www.sqlite.org/optoverview.html#the_like_optimization)
- [SQLite LIKE](https://www.sqlite.org/lang_expr.html#like)
- [SQLite datatypes / COLLATE](https://www.sqlite.org/datatype3.html)
- [SQLite FTS5 (trigram + LIKE)](https://www.sqlite.org/fts5.html)
- [SQLite `sqlite3_prepare_v2` (recompile on LIKE bind)](https://www.sqlite.org/c3ref/prepare.html)
- [SQLite row values / vs OFFSET](https://www.sqlite.org/rowvalue.html)

### This repo

- `src/features/models/queries/get-models-list.ts` — `getModelsList`, `getCursorRow`, `whereClause`
- `src/features/models/queries/build-models-where.ts` — `buildModelsWhere`
- `src/features/models/queries/get-models-list.ts` history `e8cf862` — prepared `hasSearch` / `hasCategory` / `%%` / `""`
- `src/db/schema/models.ts` — `models` indexes
- `src/db/index.ts` — `drizzle({ client, relations })`
- `src/features/models/sort/order-for-sort.ts` — `orderByForSort`
- `src/lib/pagination/utils/create-keyset-cursor.ts` — `createKeysetCursorPredicate`
- `src/features/models/dal/search-models.ts` — remote cache + `%query%`
- [ADR 0001 — cursor pagination, no `COUNT(*)`](./adr/0001-cursor-pagination.md)
- [MUTABLE_SORT_KEYSET.md](./MUTABLE_SORT_KEYSET.md)
- [PERFORMANCE_IMPROVEMENTS.md](./PERFORMANCE_IMPROVEMENTS.md) (React/Next waterfalls, not SQL plans)
