import type { Metadata } from "next";
import Stream from "@/components/streamable";
import { SearchInput } from "@/features/models/components/search-input";

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
    <div className="relative mx-4 mt-4 h-10 w-full px-4 md:max-w-xl">
      <Stream
        fallback={<div className="py-4">Loading search…</div>}
        value={null}
      >
        {() => <SearchInput />}
      </Stream>
    </div>
  );
}
