import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";
import { Suspense } from "react";

interface NuqsAdapterBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * nuqs reads `usePathname` / `useSearchParams` / `useRouter` in its Next adapter.
 * Mount only on listing routes (inside Suspense), not on shared `/3d-models/[slug]` layout.
 */
const NuqsAdapterBoundary = ({
  children,
  fallback = null,
}: NuqsAdapterBoundaryProps) => (
  <Suspense fallback={fallback}>
    <NuqsAdapter>{children}</NuqsAdapter>
  </Suspense>
);

export { NuqsAdapterBoundary };
