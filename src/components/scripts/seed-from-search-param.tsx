/**
 * Inline script that copies a URL search param into a DOM control before paint.
 * Keeps write-only shell inputs/title in sync on cold loads without useSearchParams.
 *
 * @see https://aurorascharff.no/posts/experimenting-with-rsc-for-performance-and-ux-in-nextjs/#streaming-search-results
 */
interface SeedFromSearchParamProps {
  /** `value` sets input value; `text` sets `Results for "{param}"` textContent. */
  mode?: "value" | "text";
  param: string;
  targetId: string;
}

const seedScript = (
  targetId: string,
  param: string,
  mode: "value" | "text",
) => {
  const target = JSON.stringify(targetId);
  const key = JSON.stringify(param);
  if (mode === "text") {
    return `(function(){var el=document.getElementById(${target});if(!el)return;var v=new URLSearchParams(location.search).get(${key});if(v)el.textContent="Results for \\""+v+"\\"";})()`;
  }
  return `(function(){var el=document.getElementById(${target});if(!el)return;var v=new URLSearchParams(location.search).get(${key});if(v)el.value=v;})()`;
};

const SeedFromSearchParam = ({
  param,
  targetId,
  mode = "value",
}: SeedFromSearchParamProps) => (
  <script
    // text/plain on the client avoids re-running after hydration; SSR emits JS.
    // biome-ignore lint/security/noDangerouslySetInnerHtml: intentional pre-paint seed
    dangerouslySetInnerHTML={{ __html: seedScript(targetId, param, mode) }}
    suppressHydrationWarning
    type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
  />
);

export { SeedFromSearchParam };
