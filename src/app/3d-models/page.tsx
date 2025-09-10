import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchInput } from "@/features/models/components/SearchInput";

export const metadata: Metadata = {
  title: "3d-Models",
  description:
    "Browse and search 3D printable models with fast server-side results.",
  openGraph: {
    title: "3d-Models",
    description:
      "Browse and search 3D printable models with fast server-side results.",
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="py-4">Loading search…</div>}>
      <SearchInput />
    </Suspense>
  );
}
