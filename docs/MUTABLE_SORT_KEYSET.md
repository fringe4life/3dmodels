# Keyset pagination on a volatile sort (popular / likes)

Research note. Decision lives in [ADR 0001](./adr/0001-cursor-pagination.md): **`sort=popular` stays a live feed** (approach 4). Skip/dup when likes move between slices is accepted. No frozen `(likes, id)` token, HMAC, OFFSET, or rank snapshot.

Listings already use exclusive keyset on `(sortCol, ModelId)` with URL `cursor` + `direction` + `limit` ([ADR 0001](./adr/0001-cursor-pagination.md)). For `sort=popular`, `cursor` is only a uuidv7 `ModelId`; the next request rereads live `models.likes` to rebuild the keyset boundary (`getCursorRow` in `src/features/models/queries/get-models-list.ts`). Concurrent likes move that boundary. This note compares how vendors and SQL manuals treat that class of problem.

## Question

When the `ORDER BY` column is a counter that changes between page requests (`likes`, scores, view counts, “popular” rank), how do cursor / keyset / seek paginators keep a stable page break — and what do they still leak when *other* rows move?

## Vocabulary

These names are the same family **when the cursor is a sort tuple** (last-seen sort key + unique tie-breaker), not a page number:

| Name | Who uses it | What it is |
| --- | --- | --- |
| **Seek method** / **keyset pagination** | [Use The Index, Luke](https://use-the-index-luke.com/sql/partial-results/fetch-next-page) | `WHERE` that continues after the last `(sort, id)` pair; index seek, no `OFFSET` scan. Same article also uses “seek method” as the primary name. |
| **Keyset pagination** | [Use The Index, Luke — “We need tool support”](https://use-the-index-luke.com/no-offset); [MariaDB pagination optimization](https://mariadb.com/docs/server/ha-and-performance/optimization-and-tuning/query-optimizations/pagination-optimization) (points at Luke) | Same as seek: remember where you left off; pass the keyset, not a page index. |
| **Cursor pagination** | [GraphQL](https://graphql.org/learn/pagination/); [Relay connections](https://relay.dev/graphql/connections.htm); [Drizzle](https://orm.drizzle.team/docs/guides/cursor-based-pagination); [Prisma](https://www.prisma.io/docs/orm/v8/fundamentals/reading-data); [Stripe](https://docs.stripe.com/api/pagination); [Slack](https://docs.slack.dev/apis/web-api/pagination) | Client gets an opaque (or ID) token; next request says “after this”. Implementation is often keyset. |
| **Exclusive start key** | [DynamoDB Query](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html) (`ExclusiveStartKey` / `LastEvaluatedKey`) | Resume after the last evaluated item’s key; that item is excluded. Same exclusive-boundary idea as this repo’s keyset. |
| **`search_after`** | [Elasticsearch paginate](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/paginate-search-results.html) | Pass the previous hit’s **sort values** (frozen at page time) as the next boundary. |
| **Row values** / **tuple comparison** | [SQL:92 via Luke](https://use-the-index-luke.com/sql/partial-results/fetch-next-page); [PostgreSQL row constructors](https://www.postgresql.org/docs/current/functions-comparisons.html); [SQLite row values](https://www.sqlite.org/rowvalue.html) | `(likes, id) < (?, ?)` is lexicographic “sorts before”; the SQL spelling of a composite keyset. |

**Not** the same family: `LIMIT`/`OFFSET`, page numbers, Elasticsearch `from`/`size`. Those skip N rows from a freshly numbered list ([PostgreSQL LIMIT/OFFSET](https://www.postgresql.org/docs/current/queries-limit.html); [MariaDB](https://mariadb.com/docs/server/ha-and-performance/optimization-and-tuning/query-optimizations/pagination-optimization)).

Relay / GraphQL still call the token a **cursor** even when the server encodes an offset inside it ([GraphQL: “by making the cursor the offset or the ID”](https://graphql.org/learn/pagination/)). Opacity hides the strategy; it does not freeze a mutable sort.

## What breaks (live reread of likes)

**Paging needs a deterministic `ORDER BY`.** [Luke](https://use-the-index-luke.com/sql/partial-results/fetch-next-page): without a unique order, the database may shuffle ties; extend the key with a unique column (`SALE_ID` in that example). [Prisma](https://www.prisma.io/docs/orm/v8/fundamentals/reading-data): a cursor on a non-unique field alone “can skip or repeat records that share the boundary value.” [Drizzle](https://orm.drizzle.team/docs/guides/cursor-based-pagination): “cursor should be unique and sequential”; for a non-unique column, pass multiple columns.

This repo already ties with `ModelId` (`orderByForSort` for popular is `likes DESC, id DESC`). Uniqueness of the **tuple** is not the popular bug.

**The popular bug is that the sort *component* is reread live.** Next page does:

1. Parse URL `cursor` as `ModelId` only (`parsePaginationCursor`).
2. `SELECT likes FROM models WHERE id = cursor`.
3. Seek with that **current** `likes` plus `id` (`createKeysetCursorPredicate`).

Vendors warn about **mutable / changing order keys**, even when they do not use the word “likes”:

- [Django REST framework](https://www.django-rest-framework.org/api-guide/pagination/): cursor ordering “Should be an **unchanging** value, such as a timestamp, slug, or other field that is only set once, on creation.” A field that “can change” is called out as buggy; failures “might manifest as either **missing records or duplicate records**.”
- [Elasticsearch `search_after`](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/paginate-search-results.html): “If a **refresh** occurs between these requests, the order of your results may change, causing **inconsistent results** across pages.”
- [MariaDB (offset)](https://mariadb.com/docs/server/ha-and-performance/optimization-and-tuning/query-optimizations/pagination-optimization): insert/delete between pages → “miss an item, or see an item duplicated.”
- [GraphQL (offset)](https://graphql.org/learn/pagination/): new records after a request make “offset calculations for subsequent pages” “ambiguous.”
- [Luke (offset)](https://use-the-index-luke.com/no-offset): insert between pages → duplicates; “the idea to use the number of rows seen to skip over them later is simply wrong” unless the data did not change.

**Gap:** Stripe, Slack, GitHub GraphQL, DynamoDB Query, Prisma, and Drizzle **do not** document “the sort column was `UPDATE`d between pages.” Stripe lists by reverse-chronological object id ([pagination](https://docs.stripe.com/api/pagination)). Prisma/Drizzle discuss **non-unique** order and **insert/delete** drift, not counter updates. DynamoDB `ExclusiveStartKey` is the last item’s **primary key** as returned ([Query.Pagination](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.Pagination.html)); GSI docs do not spell out skip/dup when a GSI sort key is rewritten.

### Numeric example (live reread duplicate)

Popular: `ORDER BY likes DESC, id DESC`. Page size 2.

| id | name | likes (page 1) |
| --- | --- | --- |
| `D` | Dragon | 10 |
| `H` | Helmet | 10 |

Page 1 last row = Helmet. URL `cursor=H` (id only).

Someone likes Helmet: `10 → 11`. Next request rereads Helmet `likes = 11`. Forward seek:

`likes < 11 OR (likes = 11 AND id < H)`

Dragon still has 10, so `likes < 11` is true → **Dragon appears again**. Frozen tuple `(likes=10, id=H)` would have sought `likes < 10 OR (likes = 10 AND id < H)` and would **not** re-select Dragon.

Skip is the inverse: Helmet was last at 11; unlike to 10; live reread seeks `likes < 10 OR (likes = 10 AND id < H)` and **drops** any following row that still has 11 likes.

Frozen boundary does **not** freeze the rest of the catalog. Other models can still walk across that cut (next section).

## Approaches

### 1. Live reread of the cursor row (current 3dmodels)

**What:** Token is a unique id. Server loads the row and uses **today’s** sort value as the keyset bound. Stripe’s list API is this shape for a **stable** order: `starting_after` / `ending_before` are object ids; lists are reverse chronological ([Stripe API pagination](https://docs.stripe.com/api/pagination)). This repo uses the same id-only URL for **unstable** `likes`.

**Solves:** Short URL; nuqs can parse a uuidv7 (`cursorPaginationParsers`); canonical URLs stay simple ([listing-canonical](../src/features/models/listing/listing-canonical.ts) + [nuqs SEO](https://nuqs.dev/docs/seo)).

**Does not:** Survive `UPDATE` of the cursor row’s sort column (Helmet/Dragon). Stripe never claims this for a mutable rank; their documented order is created-time via object id.

**Complexity:** Low (already built). Extra `SELECT` of the cursor row.

**URL / cache / SEO:** `cursor` is a public ModelId. Listing is `"use cache: remote"` + `cacheTag("models")`; like toggle `updateTag("models")` ([MODEL_CACHE_SPLIT](./MODEL_CACHE_SPLIT.md)). Cache keys include the id cursor, not the likes bound, so two users with the same `?cursor=H` share a page even if Helmet’s likes moved (after invalidation they rebuild with live likes).

**Forgeability:** Guessable if ids leak (they do: next/prev write last/first id). Attacker can start after any model they know. No integrity check.

**Fit:** Matches `recent` / name (immutable enough). For `popular`, accepted as a live feed (decision: approach 4).

### 2. Frozen composite cursor `(sortValue_at_page_time, uniqueId)` — unsigned

**What:** Encode the **page-time** tuple in the token. Next query uses that tuple, not a reread of `likes`.

This is the seek method with row values:

- [Luke](https://use-the-index-luke.com/sql/partial-results/fetch-next-page): `WHERE (sale_date, sale_id) < (?, ?)` — “you use the last value of the previous page.”
- [SQLite](https://www.sqlite.org/rowvalue.html) “Scrolling Window Queries”: bind last `(lastname, firstname)` and `WHERE (lastname, firstname) > (?1, ?2)`.
- [PostgreSQL](https://www.postgresql.org/docs/current/functions-comparisons.html): row constructors compare left-to-right (`<`, `>`).
- [Drizzle](https://orm.drizzle.team/docs/guides/cursor-based-pagination): `or(gt(firstName), and(eq(firstName), gt(id)))` — same exclusive tuple, spelled without row values.
- [Prisma](https://www.prisma.io/docs/orm/v8/fundamentals/reading-data): `.cursor({ createdAt: last.createdAt, id: last.id })` after matching `orderBy`.
- [Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/paginate-search-results.html): take the last hit’s `sort` array (`[1463538857, "654323"]`) and pass it as `search_after`. Those values are **from the previous response**, not re-fetched from a live document.
- [Shopify GraphQL](https://shopify.dev/docs/api/usage/pagination-graphql): `PageInfo.endCursor` examples decode as JSON `last_id` + `last_value` (base64). The products docs show the same payload in an `after` cursor ([products query](https://shopify.dev/docs/api/admin-graphql/latest/queries/products)).

SQLite 3.15+ compares row values left-to-right ([rowvalue.html](https://www.sqlite.org/rowvalue.html)); Turso is SQLite-compatible, so `(likes, id)` comparison is available. This repo currently expands the tuple into `OR`/`AND` in Drizzle instead of SQL row values — equivalent predicate ([Luke “Indexing Equivalent Logic”](https://use-the-index-luke.com/sql/partial-results/fetch-next-page); [SQLite forum](https://sqlite.org/forum/forumpost/13da9d0b625bc9cf): `(a,b) < (2,3)` ≡ `a<2 OR (a=2 AND b<3)`).

**Solves:** Cursor-row like-count change (Helmet 10→11 no longer rewrites the bound). Duplicate/skip from **that** row’s counter is gone.

**Does not:** Other rows still sort on **live** `likes`. A model below the cut that gains likes can jump onto the next page; one above the cut that loses likes can reappear. Elasticsearch says this class of inconsistency happens whenever the index refreshes between `search_after` calls, and recommends a **point in time** to freeze the whole set ([paginate-search-results](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/paginate-search-results.html); [PIT API](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/point-in-time-api.html)).

**Complexity:** Medium. Token is two fields; parser must reject partial/invalid tuples; `direction` still reverses comparisons ([Luke](https://use-the-index-luke.com/sql/partial-results/fetch-next-page): reverse all comparisons and sort to browse backwards).

**URL / cache / SEO:** Longer `cursor`. If readable (`likes=10&id=H` or JSON), crawlers and cache keys encode a **historical** likes bound. Canonicalization ([nuqs](https://nuqs.dev/docs/seo)) must decide whether that bound is “content-defining.” Opaque base64 is still in the query string.

**Forgeability:** Unsigned composite is trivially forgeable: client sets `(likes=999999, id=…)` and walks the catalog from an invented rank. Shopify’s base64 `last_id`/`last_value` is this class (decode, edit, re-encode). GraphQL only suggests base64 so clients treat the string as opaque, **not** as an integrity check ([GraphQL pagination](https://graphql.org/learn/pagination/)).

**Fit:** Direct match for the frozen `(likes, id)` experiment. SQLite row values or existing Drizzle `OR`/`AND`. Still live likes for displayed counts and for non-cursor rows.

### 3. Frozen composite cursor — HMAC / signed

**What:** Same tuple as (2), plus a server MAC so clients cannot mint bounds.

**Vendor gap:** Fetched pagination specs do **not** require HMAC:

- [Relay](https://relay.dev/graphql/connections.htm): cursor “should be considered **opaque** by the client.”
- [GraphQL](https://graphql.org/learn/pagination/): “we suggest **base64** encoding them” as a reminder not to depend on format.
- [DRF `CursorPagination` source](https://raw.githubusercontent.com/encode/django-rest-framework/master/rest_framework/pagination.py): `b64encode` of a query string (`offset`, `reverse`, `position`) — **no signer**.
- [Slack](https://docs.slack.dev/apis/web-api/pagination): opaque `next_cursor`; `invalid_cursor` for gibberish; “Cursors **expire**.” Expiry ≠ HMAC in the docs.
- Stripe list: raw object ids, not signed payloads ([Stripe](https://docs.stripe.com/api/pagination)).

Signing is an **application** layer on top of opacity. Nothing in the sources above specifies an algorithm.

**Solves:** Forged high-rank seeks (and casual tampering of readable `likes` in the URL).

**Does not:** Other-row motion. Key rotation / clock skew if you add expiry (Slack-style). Shared `"use cache: remote"` entries still keyed by the full token.

**Complexity:** Higher: secret, verification failure path, maybe version prefix. Breaks “user can edit the URL by hand” (nuqs-friendly today).

**URL / cache / SEO:** Opaque, longer, not human-bookmark-stable across key rotation. `clearOnDefault` still drops default cursor; non-default signed blobs look like random query noise to crawlers — nuqs says query strings that **define content** belong in canonical URLs, local-only state should be omitted ([nuqs SEO](https://nuqs.dev/docs/seo)). A signed popular cursor is closer to “pager state” than to YouTube `v=`.

**Forgeability:** Low if MAC + secret hold. Id-only tokens (1) stay forgeable unless you sign those too.

**Fit:** Public catalog does not need anti-enumeration as much as a private API; likes are already on the page. Signing mainly stops people from crafting `(likes, id)` shortcuts. Extra infra (secret) for a listing that is already public.

### 4. Accept skip/dup as inherent

**What:** Keep live keyset (or offset). Document that popular pages are a **best-effort feed**, not a partition of a frozen list.

[Luke](https://use-the-index-luke.com/no-offset) treats skip/dup under **offset** as a design bug, not a feature. For **keyset**, Luke’s guarantee is “doesn’t select already shown **values**” given a **stable** keyset. If the keyset values move, that guarantee does not apply.

[Elasticsearch](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/paginate-search-results.html): pagination without PIT is **stateless**; “search result order may change when navigating between pages.” They still ship `search_after` without requiring PIT.

[GraphQL](https://graphql.org/learn/pagination/) prefers cursors over offset for stability, then says opaque cursors let you **change** the backend later — not that mutable ranks are solved.

**Solves:** Zero extra encoding, indexes, or jobs. Honest UX (“popular right now”).

**Does not:** Helmet/Dragon. Cache correctness across users (same `cursor=H`, different likes).

**Complexity:** Lowest.

**URL / cache / SEO:** Status quo. Invalidating `"models"` on like ([MODEL_CACHE_SPLIT](./MODEL_CACHE_SPLIT.md)) makes the **next** hit fresh, which can **increase** skip/dup vs a stale cached bound.

**Forgeability:** Same as (1).

**Fit:** Fine if popular is a feed and catalog is small. Conflicts with treating pager `forwards`/`backwards` as a stable window.

### 5. Offset / page numbers for the volatile ranking only

**What:** `ORDER BY likes DESC, id DESC LIMIT n OFFSET m` or `?page=`. [PostgreSQL](https://www.postgresql.org/docs/current/queries-limit.html): skipped rows “still have to be computed”; unique `ORDER BY` required or pages are an “unpredictable subset.” [MariaDB](https://mariadb.com/docs/server/ha-and-performance/optimization-and-tuning/query-optimizations/pagination-optimization): deep `OFFSET` is a crawler/timeout hazard; insert/delete → miss/dup. [Elasticsearch `from`/`size`](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/paginate-search-results.html): each shard loads this page **and previous pages**; default cap 10 000 hits (`index.max_result_window`). [DRF `PageNumberPagination`](https://www.django-rest-framework.org/api-guide/pagination/) is this UX. [Slack “classic”](https://docs.slack.dev/apis/web-api/pagination) still has `page`/`count` on some methods; newer methods moved to cursors.

**Solves:** Jump to page N (Luke lists this as what keyset **cannot** do). Familiar UI. No cursor-row reread.

**Does not:** Skip/dup when **any** row’s likes change (whole list is re-ranked, then N rows are dropped). Deep-page cost. This repo dropped `COUNT(*)` and `?page=` ([ADR 0001](./adr/0001-cursor-pagination.md)); offset does not restore a total without a count or an estimate ([MariaDB](https://mariadb.com/docs/server/ha-and-performance/optimization-and-tuning/query-optimizations/pagination-optimization) suggests “out of Many” or a periodic count table).

**Complexity:** Low code, bad at scale. Mixing offset **only** for `sort=popular` and keyset for `recent`/`name` splits the pager.

**URL / cache / SEO:** `?page=2&sort=popular` is stable to bookmark and easy to canonicalize; content **drifts**. Crawlers walking page numbers is exactly MariaDB’s 125 M-touch example.

**Forgeability:** Page index is not a secret.

**Fit:** Catalog is small enough that OFFSET cost is academic; skip/dup and the ADR migration are the real costs. Reintroduces `page` that ADR 0001 retired.

### 6. Snapshot / materialized popularity

**What:** Freeze **rank**, not just the cursor tuple.

- **Search snapshot:** Elasticsearch [point in time](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/point-in-time-api.html): “lightweight view into the state of the data as it existed when initiated.” Refreshes between `search_after` requests otherwise make pages inconsistent. PIT keeps old segments alive (`keep_alive`); must be closed. They no longer recommend scroll for this; `search_after` + PIT is the replacement ([paginate-search-results](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/paginate-search-results.html)).
- **Denormalized score at index time:** [Static relevance signals](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/static-scoring-signals.html) (PageRank-style field combined with BM25 via `rank_feature` / `script_score`). The number in the index is what you sort/score until you reindex.
- **Periodic rank table:** MariaDB explicitly **rejects** “Build another table saying where the pages start” as a maintenance nightmare for **page breaks**. A **count** table recomputed daily/hourly is offered only for “out of about 49,000” ([pagination optimization](https://mariadb.com/docs/server/ha-and-performance/optimization-and-tuning/query-optimizations/pagination-optimization)). Different problem, same ops shape: background job, stale by design.

**Solves:** Other-row motion **during one browse session** (PIT) or **until rebuild** (materialized score). Closest to “popular as of T.”

**Does not:** Live hearts on the cards vs frozen order (split-brain unless the snapshot also freezes displayed counts). PIT-style state is **server session**, not a bookmarkable URL. SQLite/Turso has no ES PIT; you’d emulate with `popularity_frozen` column or a rank snapshot table.

**Complexity:** High. Job or search cluster. Invalidation: like toggle vs snapshot lag ([MODEL_CACHE_SPLIT](./MODEL_CACHE_SPLIT.md) already wants a short-lived popular-order tag).

**URL / cache / SEO:** Snapshot id in the URL (session) or omitted (always “current materialization”). Canonical popular URL without snapshot = crawlers see a moving list.

**Forgeability:** Snapshot tokens can be capability URLs (see Slack expiry). A public rank column is just data.

**Fit:** Heavier than a catalog this size. Aligns with “popular order is its own short-lived cache” in MODEL_CACHE_SPLIT, if that cache is a **rank snapshot** rather than a live `ORDER BY likes`.

### 7. Stable proxy sort

**What:** Do not keyset on the volatile counter. Sort on something immutable (or rebuilt in batch):

- [DRF](https://www.django-rest-framework.org/api-guide/pagination/): timestamp/slug “only set once, on creation”; default `CursorPagination.ordering = '-created'`.
- [Stripe](https://docs.stripe.com/pagination): “reverse chronological order, meaning the most recently created object is the first one.” Cursor = object id, which encodes that order.
- This repo: `sort=recent` already keysets `(dateAdded, id)`; uuidv7 ids correlate with insert time ([ADR 0001](./adr/0001-cursor-pagination.md)).
- [Drizzle](https://orm.drizzle.team/docs/guides/cursor-based-pagination): if PK is UUIDv4 (not sequential), add `created_at` and use a **multiple** cursor.
- Elasticsearch [rank_feature](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/static-scoring-signals.html): static signal updated when **you** write the field, not on every query.

**Solves:** Skip/dup from likes. Keyset stays valid. Cache of page identity can be long-lived ([MODEL_CACHE_SPLIT](./MODEL_CACHE_SPLIT.md) “recent / name”).

**Does not:** “Popular” as live rank. A nightly `popularity_rank` column is a **proxy that updates on rebuild** — hybrid with (6).

**Complexity:** Low if you drop live popular, or one extra column + job if you snapshot rank.

**URL / cache / SEO:** `sort=recent` already. Changing what `sort=popular` **means** is a product change, not a pager change.

**Forgeability:** Id cursor as (1).

**Fit:** Correct for feeds; incorrect if the UI promise is live like-rank.

### 8. Keyset on `(likes, id)` with live likes for other rows, frozen boundary only

**What:** Approach (2) without a snapshot. Predicate uses **token** `(likes_at_click, id)`; `ORDER BY models.likes, models.id` still reads **current** likes for every candidate.

This is Elasticsearch `search_after` **without** PIT: sort values in the token are frozen; the index is not ([paginate-search-results](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/paginate-search-results.html)).

**Solves:** Helmet/Dragon **cursor-row** rewrite.

**Does not:** Phoenix (not on page 1) going 9→12 likes can appear on page 2 even though it “passed” Helmet. Dragon unlike’d off page 1 can fall into page 2. Residual skip/dup is **other-row** only.

**Complexity:** Same as (2).

**URL / cache / SEO:** Same as (2). Displayed `likes` on cards stay live (toggle still invalidates `"models"`).

**Forgeability:** Same as (2) or (3) depending on encoding.

**Fit:** The smallest change that matches “frozen `(likes, id)` composite cursor” in the listing DAL. Residual feed-like motion remains; document it.

### 9. Bidirectional cursors (`before`/`after`) vs `direction` + exclusive cursor

**Relay** ([connections spec](https://relay.dev/graphql/connections.htm)):

- Forward: `first` + `after` (exclusive of `after` edge).
- Backward: `last` + `before` (exclusive of `before` edge).
- **Edge order is not reversed** for `last`/`before`. Closest-to-cursor is last (`before`) or first (`after`).
- `PageInfo`: `hasNextPage`, `hasPreviousPage`, `startCursor`, `endCursor`.
- Algorithm `ApplyCursorsToEdges` **drops the cursor edge** (exclusive). Same exclusive idea as DynamoDB `ExclusiveStartKey` ([API_Query](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html): last evaluated key is inclusive of the previous page, excluded on the next).

**This repo:** one `cursor` (exclusive start) + `direction=forward|backward` which **reverses** `ORDER BY` and comparison, then `toReversed()` in `toPagination`. [Luke](https://use-the-index-luke.com/sql/partial-results/fetch-next-page): “you need to reverse all comparison and sort operations to change the browsing direction.” [Stripe](https://docs.stripe.com/api/pagination): `starting_after` **or** `ending_before`, mutually exclusive; `ending_before` is “objects listed before the named object.” Auto-pagination with `ending_before` is chronological, opposite of the default reverse-chrono list ([How pagination works](https://docs.stripe.com/pagination)).

**Shopify** ([GraphQL pagination](https://shopify.dev/docs/api/usage/pagination-graphql)): `first`/`after` and `last`/`before`; pass `endCursor` as `after`, `startCursor` as `before`.

**GitHub GraphQL** ([pagination guide](https://docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api)): same Relay args; `first`/`last` capped 1–100.

**Slack** ([pagination](https://docs.slack.dev/apis/web-api/pagination)): usually **forward-only** `cursor` = previous `next_cursor`. Empty `next_cursor` ends. Do not infer end from `limit` vs result size. Some history methods also use `oldest`/`latest` timestamps (exclusive unless `inclusive=true`) ([conversations.history](https://docs.slack.dev/reference/methods/conversations.history.md)).

**Disqus** ([cursors API](https://disqus.com/api/docs/cursors/); [cra.mr write-up](https://cra.mr/2011/03/08/building-cursors-for-the-disqus-api/)): `next`/`prev` strings; directional flag + range + small OFFSET for timestamp ties. “Think of it like a snapshot” in prose; implementation is still range + offset, not a MVCC snapshot.

**Solves:** UX of prev/next without page numbers. Exclusive cursors avoid re-including the boundary row **if the bound is the same tuple**.

**Does not:** Mutable sort. Reversed `ORDER BY` + exclusive live reread can skip/dup in **both** directions. Relay’s “ordering must be consistent from page to page” ([§4.3](https://relay.dev/graphql/connections.htm)) is a **requirement**, not a mechanism for likes.

**Complexity:** This repo’s `direction` is fewer URL keys than `before`/`after` but easier to desync from cursor (canonicalizer already drops `direction` when cursor is absent).

**URL / cache / SEO:** `direction` is pager state; omit on first page (already). Relay opaque `after` is not meant to be user-edited.

**Forgeability:** Depends on token contents, not on before vs direction.

**Fit:** Keep `direction` + exclusive cursor; changing to Relay args does not fix popular. Frozen tuple must reverse as a unit (`(likes, id)` both flipped).

### 10. Relay opaque cursors vs readable nuqs params

[GraphQL](https://graphql.org/learn/pagination/): opaque cursors so the backend can change; base64 as social signal. [Relay](https://relay.dev/graphql/connections.htm): client must not interpret the string. [nuqs SEO](https://nuqs.dev/docs/seo): if the query string **defines displayed content**, put it on the canonical URL; if it is local UI state, canonical **without** it.

This app treats `query`, `sort`, `cursor`, `direction`, `limit` as listing state with `clearOnDefault` ([listing-canonical.ts](../src/features/models/listing/listing-canonical.ts)). Readable uuidv7 `cursor` is shareable and cache-key-friendly. Opaque/signed blobs work in nuqs as `parseAsString` but:

- Invalid tokens fail closed (Slack `invalid_cursor`) vs today’s `parseModelId` → treat as first page (`toEffectivePagination`).
- Canonical popular URLs with opaque cursors are ugly and session-like.
- Crawlers: MariaDB warns spiders + offset; opaque keyset is harder to brute-force page N, easier to ignore as duplicate content unless canonicalized to the no-cursor URL.

**Solves (opaque):** Ability to add likes into the token later without breaking clients who never decoded it.

**Does not:** Mutability, unless the opaque payload actually contains the frozen tuple (2/3).

**Fit:** nuqs + public catalog favors **readable** params for `recent`/`name`. Popular might be the one sort that wants opacity (likes bound + maybe MAC). Hybrid: readable id for stable sorts, opaque for popular — two parsers.

### 11. First-party DB: tuple comparison / row values

| Engine | Documented behavior |
| --- | --- |
| **PostgreSQL** | [Row constructor comparison](https://www.postgresql.org/docs/current/functions-comparisons.html): `<`/`>` left-to-right; NULL in a compared pair yields unknown. B-tree opclass required. Luke: PG uses row-value predicates as **index access** since 8.4. |
| **SQLite** | [Row values](https://www.sqlite.org/rowvalue.html) since 3.15.0 (2016-10-14). Explicit **scrolling window** recipe vs `OFFSET` (OFFSET is `LIMIT x+y` then discard y). |
| **MariaDB** | [Pagination optimization](https://mariadb.com/docs/server/ha-and-performance/optimization-and-tuning/query-optimizations/pagination-optimization): “left off” on unique `id`; `INDEX(topic, id)`; `LIMIT 11` for next-page detection. Composite `(datetime, id)` when datetime duplicates. Points to Luke for seek/keyset. |
| **SQL standard** | Luke quotes SQL:92 / ISO/IEC 9075-2 row-value `<`: equal prefixes then first difference. `OFFSET` defined as drop N after sort ([SQL:2023 §4.17.3 via Luke](https://use-the-index-luke.com/no-offset)). |

**Drizzle** documents the expanded `OR`/`AND` form and composite indexes; it claims “no skipped or duplicated rows due to **insert or delete**” ([cursor guide](https://orm.drizzle.team/docs/guides/cursor-based-pagination)). **Gap:** no UPDATE-of-sort-key discussion.

**Prisma** composite `.cursor({ createdAt, id })` is PostgreSQL-only in the v8 reading-data doc; MongoDB is offset. **Gap:** no mutable `createdAt`.

None of these manuals say “store the old likes in the client token.” They say “bind the last **displayed** values.” That sentence **is** frozen composite if the app binds what it showed, and **is** live reread if the app reloads the row by id.

## Comparison

| approach | skip/dup on cursor-row change | skip/dup on other-row change | URL | extra infra | notes |
| --- | --- | --- | --- | --- | --- |
| 1. Live reread (id cursor) | Yes | Yes | Short uuidv7; nuqs-native | None | Current popular. Stripe-like token, not Stripe-like stability. |
| 2. Frozen tuple, unsigned | No | Yes | Longer; readable or base64 | None | ES `search_after` without PIT; Shopify `last_id`/`last_value`; SQLite row values. Forgeable rank. |
| 3. Frozen tuple, HMAC | No | Yes | Opaque blob | Secret, verify path | **Not** in Relay/Stripe/Slack/DRF/ES pagination specs. Opacity ≠ MAC. |
| 4. Accept skip/dup | Yes (if live) | Yes | Status quo | None | ES stateless pagination. Product: feed vs ledger. |
| 5. OFFSET / page N | Yes (whole list re-ranked) | Yes | `page` / `offset` | Optional COUNT job | PG/MariaDB/ES cost + crawler hazard. Conflicts ADR 0001. |
| 6. Snapshot / PIT / materialized rank | No (within snapshot) | No (within snapshot) | Session id or none | PIT/search or rank table + job | ES PIT cost (segments, heap). MariaDB against page-break tables. |
| 7. Stable proxy (`dateAdded`, uuidv7, batch rank) | No | No (until rebuild if batch) | Same as 1 | None or rebuild job | DRF “unchanging” field. Drops live popular or delays it. |
| 8. Frozen bound, live other rows | No | Yes | Same as 2/3 | None | Named subset of 2. Residual popular motion. |
| 9. `before`/`after` vs `direction` | (orthogonal) | (orthogonal) | Two cursors or cursor+direction | None | Relay exclusive edges; Luke reverse sort. Does not freeze likes. |
| 10. Opaque Relay vs nuqs | (orthogonal) | (orthogonal) | Opaque vs uuid | Parser choice | GraphQL base64; nuqs canonical rules. |
| 11. SQL row values | (mechanism) | (mechanism) | n/a | Index on `(likes, id)` | PG/SQLite/MariaDB+Luke. Bind **shown** vs **reread** is the app choice. |

## Fit to 3dmodels

Stack facts that constrain the choice (not a decision):

- **Public catalog**, App Router, nuqs URL state, canonical listing URLs omit default `cursor`/`direction`/`limit`/`sort`.
- **`"use cache: remote"`** on `searchModels` (`cacheTag("models")`, `cacheLife("hours")`). Like toggle **`invalidateAllModels()` → `updateTag("models")`**. Popular order and like counts share that tag today ([MODEL_CACHE_SPLIT](./MODEL_CACHE_SPLIT.md)).
- **SQLite/Turso**, Drizzle keyset already exclusive on `(sortCol, id)` via `OR`/`AND`. SQLite row values exist if you want `(likes, id) < (?, ?)`.
- **No `COUNT(*)`.** Next/prev from `limit+1` and whether a cursor is set ([ADR 0001](./adr/0001-cursor-pagination.md)). OFFSET “page 4 of N” fights that.
- **Bidirectional pager** already: `direction` + exclusive cursor + reverse `ORDER BY`. Frozen tuple must reverse as a pair (Relay keeps visual order; this app reverses then unreverses items).
- **`sort=recent` / name** already match DRF “unchanging” + unique id. Only **`sort=popular`** rereads a counter.
- **Forgeability** of an unsigned `(likes, id)` URL is real and cheap; impact is low (public list). HMAC is unspecified by vendors; Slack-style expiry is closer to their docs than HMAC.
- **Residual other-row skip/dup** remains for any live `ORDER BY likes` unless you snapshot (PIT/rank table). Elasticsearch is the vendor that states that remaining hole and the PIT fix. SQLite has no PIT; snapshot ⇒ column or table.

**Chosen:** approach **4** (accept skip/dup) on top of **1** (id cursor, live reread). Popular is “hot now,” not a duplicate-free traversal. Frozen tuple (2/8) still leaves other-row motion; snapshot (6) is heavier than this catalog. Revisit only if the product promise becomes a ledger (each model exactly once).

Implementation comparison the team asked for was **(1) vs (8)/(2)**, with (3)(5)(6)(7) as the surrounding design space. (9)(10)(11) are encoding/API/SQL spellings, not competing answers to volatile likes.

## Sources

- [Use The Index, Luke — Fetching the Next Page (seek / keyset, row values, reverse direction)](https://use-the-index-luke.com/sql/partial-results/fetch-next-page)
- [Use The Index, Luke — We need tool support for keyset pagination (OFFSET drift, SQL:2023 OFFSET)](https://use-the-index-luke.com/no-offset)
- [MariaDB Server — Pagination Optimization (left-off, LIMIT 11, insert/delete skip/dup, no page-start table)](https://mariadb.com/docs/server/ha-and-performance/optimization-and-tuning/query-optimizations/pagination-optimization)
- [PostgreSQL 18 — LIMIT and OFFSET](https://www.postgresql.org/docs/current/queries-limit.html)
- [PostgreSQL 18 — Row and Array Comparisons (row constructors)](https://www.postgresql.org/docs/current/functions-comparisons.html)
- [SQLite — Row Values (scrolling windows vs OFFSET)](https://www.sqlite.org/rowvalue.html)
- [SQLite forum — tuple comparison ≡ `a<x OR (a=x AND b<y)`](https://sqlite.org/forum/forumpost/13da9d0b625bc9cf)
- [GraphQL.org — Pagination (offset vs cursor, opaque/base64)](https://graphql.org/learn/pagination/)
- [Relay — GraphQL Cursor Connections Specification (`after`/`before`, exclusive edges, consistent order)](https://relay.dev/graphql/connections.htm)
- [Stripe API — Pagination (`starting_after` / `ending_before`, object ids)](https://docs.stripe.com/api/pagination)
- [Stripe — How pagination works (reverse chronological lists, search `page`/`next_page`)](https://docs.stripe.com/pagination)
- [AWS DynamoDB — Paginating Query results (`LastEvaluatedKey` → `ExclusiveStartKey`)](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Query.Pagination.html)
- [AWS DynamoDB — Query API (`ExclusiveStartKey` definition)](https://docs.aws.amazon.com/amazondynamodb/latest/APIReference/API_Query.html)
- [Elasticsearch 8.19 — Paginate search results (`from`/`size`, `search_after`, refresh inconsistency, PIT)](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/paginate-search-results.html)
- [Elasticsearch 8.19 — Point in time API](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/point-in-time-api.html)
- [Elasticsearch 8.19 — Static relevance signals (indexed rank / PageRank-style fields)](https://www.elastic.co/guide/en/elasticsearch/reference/8.19/static-scoring-signals.html)
- [Drizzle ORM — SQL Cursor-based pagination (unique cursor, composite `OR`/`AND`, insert/delete consistency)](https://orm.drizzle.team/docs/guides/cursor-based-pagination)
- [Prisma ORM v8 — Reading data (composite `.cursor`, skip/repeat on non-unique orderBy)](https://www.prisma.io/docs/orm/v8/fundamentals/reading-data)
- [Slack — Web API pagination (opaque `next_cursor`, expiry, `invalid_cursor`)](https://docs.slack.dev/apis/web-api/pagination)
- [Slack — conversations.history (cursor + exclusive timestamp bounds)](https://docs.slack.dev/reference/methods/conversations.history.md)
- [Shopify — Paginating results with GraphQL (`first`/`after`, `last`/`before`, `last_id`/`last_value` cursors)](https://shopify.dev/docs/api/usage/pagination-graphql)
- [Shopify Admin GraphQL — products (example `after` cursor)](https://shopify.dev/docs/api/admin-graphql/latest/queries/products)
- [GitHub Docs — Using pagination in the GraphQL API](https://docs.github.com/en/graphql/guides/using-pagination-in-the-graphql-api)
- [Django REST framework — Pagination (unchanging unique ordering; skip/dup if violated; PageNumber vs Cursor)](https://www.django-rest-framework.org/api-guide/pagination/)
- [DRF `pagination.py` (base64 cursor encode/decode, no HMAC)](https://raw.githubusercontent.com/encode/django-rest-framework/master/rest_framework/pagination.py)
- [Disqus API — Cursors](https://disqus.com/api/docs/cursors/)
- [Adam Baldwin / Disqus — Building Cursors for the Disqus API (range + small OFFSET for ties)](https://cra.mr/2011/03/08/building-cursors-for-the-disqus-api/)
- [nuqs — SEO (canonical URLs vs content-defining query strings)](https://nuqs.dev/docs/seo)

Repo context (not vendor claims): [ADR 0001](./adr/0001-cursor-pagination.md), [MODEL_CACHE_SPLIT](./MODEL_CACHE_SPLIT.md), `src/features/models/queries/get-models-list.ts`, `src/lib/pagination/utils/create-keyset-cursor.ts`.
