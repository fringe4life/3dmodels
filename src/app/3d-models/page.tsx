import { css } from "@styled-system/css";
import type { Metadata } from "next";
import { SearchInput } from "@/components/search-input/search-input";
import { SearchInputSkeleton } from "@/components/search-input/search-input-skeleton";
import { Suspend } from "@/components/suspend";
import { canonicalPathForListing } from "@/features/pagination/listing-canonical";

const listingMetadata: Metadata = {
  title: "3d-Models",
  description:
    "Browse and search 3D printable models with fast server-side results.",
  openGraph: {
    title: "3d-Models",
    description:
      "Browse and search 3D printable models with fast server-side results.",
  },
};

export const generateMetadata = async ({
  searchParams,
}: PageProps<"/3d-models">): Promise<Metadata> => {
  const canonical = await canonicalPathForListing("/3d-models", searchParams);
  return {
    ...listingMetadata,
    alternates: { canonical },
    openGraph: {
      ...listingMetadata.openGraph,
      url: canonical,
    },
  };
};

const Page = () => (
  <div
    className={css({
      blockSize: 10,
      inlineSize: "full",
      maxInlineSize: { md: "xl" },
      position: "relative",
      paddingInline: 4,
    })}
  >
    <Suspend fallback={<SearchInputSkeleton />}>
      <SearchInput />
    </Suspend>
  </div>
);

export default Page;
