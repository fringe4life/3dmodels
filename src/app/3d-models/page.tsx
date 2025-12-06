import type { Metadata } from "next";
import { Suspense } from "react";
import { SearchInput } from "@/components/search-input";

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

const Page = () => (
  <div className="relative h-10 w-full px-4 md:max-w-xl">
    <Suspense fallback={<div className="py-4">Loading search…</div>}>
      <SearchInput />
    </Suspense>
  </div>
);

export default Page;
