import type { Metadata } from "next";
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

/** Listing UI (search + grid) lives in the `@results` parallel slot. */
const Page = () => null;

export default Page;
