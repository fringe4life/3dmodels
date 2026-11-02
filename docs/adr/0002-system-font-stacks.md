# System font stacks instead of Google webfonts

Two variable Google fonts (Albert Sans for body, Montserrat for headings) shipped through `next/font`, which preloaded one latin woff2 each — 67,516 B total — plus two `@font-face` rules and a `display: swap` window where the fallback face paints first. The type is set at 13–68px on a site that sells nothing but browsing, so the fonts were the largest avoidable download on the critical path and the only source of text CLS.

We now ship no webfonts. Four role buckets live in `tokens.fonts` (`theme/tokens.ts`) and are applied through `theme/global-styles.ts` and component `css()` calls: `sans` for prose and UI, `display` for headings, `mono` for counts and tabular figures, `serif` for dates. Each token is a full `font-family` list, so a swap is a one-line token edit and no component references a family.

| bucket | Apple | Windows 11 | Windows 10 | Android | Linux |
| --- | --- | --- | --- | --- | --- |
| `sans` | SF Pro (`system-ui`) | Segoe UI Variable Text | Segoe UI | Roboto | Ubuntu / Cantarell / Noto Sans |
| `display` | Avenir Next | Segoe UI Variable Display | Segoe UI | Roboto | system-ui |
| `mono` | SF Mono (`ui-monospace`) | Cascadia Mono | Consolas | Roboto Mono | DejaVu Sans Mono |
| `serif` | New York (`ui-serif`) | Sitka Text | Cambria | Noto Serif | Liberation Serif |

Montserrat was pulled in at `-0.06em`; system display faces carry their own optical tightening (and Segoe UI Variable / SF Pro apply an `opsz` axis), so the display tracking was halved to `-0.03 / -0.032em` and the smaller headings to `-0.014em`–`-0.02em`. System display faces are also narrower than Montserrat, so display sizes stay as they were and line breaks were verified on the hero and About hero.

## Considered Options

- Keep Google fonts and subset further: Montserrat and Albert Sans are already `latin`-only variable files; the remaining 66 KB is the latin charset itself, not a weight or glyph surplus.
- Self-host the same two fonts: removes the build step, not the bytes.
- One `system-ui` stack for everything: most consistent, but throws away Avenir Next and the Windows Display optical master, and leaves headings and body distinguished by size alone.
- Apple-only geometric chain with `Futura` or `Century Gothic` ahead of `system-ui`: Futura's small x-height breaks at 68px, and Century Gothic ships with Office rather than Windows.
- Keep `var(--font-*)` CSS variables and point them at system stacks: the variable would carry no fallback chain, so a missing family would resolve to the browser default instead of the next name in the list.

## Consequences

- Resolution diverges per OS by design. A system stack cannot be identical everywhere; the goal is the best face each platform has, not a single face.
- Headline tracking is now sized for faces that are tighter than Montserrat. Re-check `letter-spacing` whenever `display` changes.
- Weight 600 renders from a 600 component where one exists (SF Pro, Segoe UI Variable, Roboto variable) and snaps to 700 on platforms without it. Weights below 500 on `serif` metadata can synthesise.
- No `@font-face` means no swap window, no preload hint and no font `src` to invalidate; `next/font` is no longer imported anywhere, so a webfont reintroduction needs a deliberate edit here.
