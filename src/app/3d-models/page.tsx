import type { Metadata } from "next";
import { SearchInput } from "@/components/search-input";
import Stream from "@/components/streamable";

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
    <Stream fallback={<div className="py-4">Loading search…</div>} value={null}>
      {() => <SearchInput />}
    </Stream>
  </div>
);

export default Page;
