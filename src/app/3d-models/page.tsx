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
  <div className="relative h-10 w-full px-4 md:max-w-xl">
    <Suspend fallback={<SearchInputSkeleton />}>
      <SearchInput />
    </Suspend>
  </div>
);

export default Page;
