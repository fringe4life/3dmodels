import { NuqsAdapter } from "nuqs/adapters/next/app";
import { defaultOptions } from "@/lib/url";
import type { Children } from "@/types";

interface NuqsAdapterBoundaryProps extends Children {}

/**
 * nuqs reads `usePathname` / `useSearchParams` / `useRouter` in its Next adapter.
 * Mount only on listing routes, not on shared `/3d-models/[slug]` layout.
 *
 * Suspense wrap removed — consumers (`SearchInput`, pagination) already have
 * their own boundaries. Re-wrap with `<Suspense fallback={fallback}>` if build
 * fails missing-suspense-with-csr-bailout again.
 */
const NuqsAdapterBoundary = ({ children }: NuqsAdapterBoundaryProps) => (
  <NuqsAdapter defaultOptions={defaultOptions}>{children}</NuqsAdapter>
);

export { NuqsAdapterBoundary };
