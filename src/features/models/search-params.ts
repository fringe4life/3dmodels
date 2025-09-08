import {
  createSearchParamsCache,
  parseAsString,
  parseAsStringLiteral,
} from "nuqs/server";

// Define the search parameters for the 3D models page
export const modelsSearchParams = {
  query: parseAsString.withDefault(""),
  category: parseAsString.withDefault(""),
  sortBy: parseAsStringLiteral(["name", "likes", "date"] as const).withDefault(
    "name",
  ),
};

// Create a server-side cache for parsing search parameters
export const modelsSearchParamsCache =
  createSearchParamsCache(modelsSearchParams);
