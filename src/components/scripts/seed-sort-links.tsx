/**
 * Pre-paint: rewrite `a[data-sort]` hrefs from `location.search` and mark the
 * active sort. Keeps cold-load / no-JS sort Links aligned with query/limit.
 * Constant script + no interpolated values (CodeQL-safe).
 */
const SEED_SORT_LINKS_SCRIPT =
  '(function(){var s=document.currentScript;if(!s)return;var root=s.parentElement;if(!root)return;var base=new URLSearchParams(location.search);var active=base.get("sort")||"alphabetic";base.delete("cursor");base.delete("direction");base.delete("sort");var links=root.querySelectorAll("a[data-sort]");for(var i=0;i<links.length;i++){var a=links[i];var sort=a.getAttribute("data-sort");if(!sort)continue;var p=new URLSearchParams(base);if(sort!=="alphabetic")p.set("sort",sort);var q=p.toString();a.setAttribute("href",q?location.pathname+"?"+q:location.pathname);if(sort===active)a.setAttribute("aria-current","true");else a.removeAttribute("aria-current")}})()';

const SeedSortLinks = () => (
  <script
    // biome-ignore lint/security/noDangerouslySetInnerHtml: intentional pre-paint seed
    dangerouslySetInnerHTML={{ __html: SEED_SORT_LINKS_SCRIPT }}
    suppressHydrationWarning
    type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
  />
);

export { SeedSortLinks };
