import type { Metadata } from "next";
import { SearchInput } from "@/components/search-input";
import { SearchInputSkeleton } from "@/components/search-input-skeleton";
import { Suspend } from "@/components/suspend";

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
  <div className="block-10 inline-full md:max-inline-xl relative px-4">
    <Suspend fallback={<SearchInputSkeleton />}>
      <SearchInput />
    </Suspend>
  </div>
);

export default Page;
