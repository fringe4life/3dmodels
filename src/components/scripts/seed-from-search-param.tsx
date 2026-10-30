/**
 * Inline script that copies a URL search param into a DOM control before paint.
 * Keeps write-only shell inputs/title in sync on cold loads without useSearchParams.
 *
 * Params live on `data-*` attributes (React HTML-escapes them). The script body is
 * a constant so we never interpolate values into executable source (CodeQL).
 *
 * @see https://aurorascharff.no/posts/experimenting-with-rsc-for-performance-and-ux-in-nextjs/#streaming-search-results
 */
interface SeedFromSearchParamProps {
  /** `value` sets input value; `text` sets `Results for "{param}"` textContent. */
  mode?: "value" | "text";
  param: string;
  targetId: string;
}

/** Runs on SSR HTML parse (`document.currentScript` is set). */
const SEED_FROM_SEARCH_PARAM_SCRIPT =
  '(function(){var s=document.currentScript;if(!s)return;var el=document.getElementById(s.getAttribute("data-target"));if(!el)return;var v=new URLSearchParams(location.search).get(s.getAttribute("data-param"));if(!v)return;if(s.getAttribute("data-mode")==="text"){el.textContent=\'Results for "\'+v+\'"\'}else{el.value=v}})()';

const SeedFromSearchParam = ({
  param,
  targetId,
  mode = "value",
}: SeedFromSearchParamProps) => (
  <script
    // text/plain on the client avoids re-running after hydration; SSR emits JS.
    // biome-ignore lint/security/noDangerouslySetInnerHtml: intentional pre-paint seed
    dangerouslySetInnerHTML={{ __html: SEED_FROM_SEARCH_PARAM_SCRIPT }}
    data-mode={mode}
    data-param={param}
    data-target={targetId}
    suppressHydrationWarning
    type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
  />
);

export { SeedFromSearchParam };
