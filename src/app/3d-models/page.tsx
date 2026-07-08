import type { Metadata, Route } from "next";
import { canonicalPathForListing } from "@/features/pagination/listing-canonical";

const listingMetadata: Metadata = {
  description:
    "Browse and search 3D printable models with fast server-side results.",
  openGraph: {
    description:
      "Browse and search 3D printable models with fast server-side results.",
    title: "3d-Models",
  },
  title: "3d-Models",
};

export const generateMetadata = async ({
  searchParams,
}: PageProps<"/3d-models">): Promise<Metadata> => {
  const canonical = await canonicalPathForListing(
    "/3d-models" satisfies Route,
    searchParams,
  );
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
