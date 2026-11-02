import type { Route } from "next";
import { EMPTY_LIST_LENGTH } from "@/constants";
import { getMostLiked } from "@/features/models/dal/get-most-liked";
import { listClassName } from "./most-liked.styles";
import { MostLikedCard } from "./most-liked-card";

/** The row is rendered on the home page, so that is the listing to return to. */
const MOST_LIKED_RETURN_TO = "/" satisfies Route;

const MostLikedList = async () => {
  const { isAuthenticated, models } = await getMostLiked();

  if (models.length === EMPTY_LIST_LENGTH) {
    return null;
  }

  return (
    <ul className={listClassName}>
      {models.map((model) => (
        <MostLikedCard
          isAuthenticated={isAuthenticated}
          key={model.slug}
          model={model}
          returnTo={MOST_LIKED_RETURN_TO}
        />
      ))}
    </ul>
  );
};

export { MostLikedList };
