import { Suspense } from "react";
import { sectionHeadingClassName } from "@/components/section-heading";
import { SectionLink } from "@/components/section-link";
import { toListingRoute } from "@/features/models/listing/listing-path";
import { headerClassName, sectionClassName } from "./most-liked.styles";
import { MostLikedList } from "./most-liked-list";
import { MostLikedSkeleton } from "./most-liked-skeleton";

/** The listing's own sort label is "Popular"; the link says so. */
const MOST_LIKED_HREF = toListingRoute("/3d-models?sort=popular");

/**
 * Most-liked row. Heading and link ship in the static shell; the list streams in
 * from a cached query, so the fallback occupies the same cards.
 */
export const MostLiked = () => (
  <section aria-labelledby="most-liked-heading" className={sectionClassName}>
    <div className={headerClassName}>
      <h2 className={sectionHeadingClassName} id="most-liked-heading">
        Most liked
      </h2>
      <SectionLink href={MOST_LIKED_HREF}>Browse popular models</SectionLink>
    </div>
    <Suspense fallback={<MostLikedSkeleton />}>
      <MostLikedList />
    </Suspense>
  </section>
);
