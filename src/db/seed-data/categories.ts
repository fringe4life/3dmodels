import type { Category } from "@/db/schema/models";

export const categoriesData: Category[] = [
  {
    id: 1,
    displayName: "3D Printer",
    slug: "3d-printer",
  },
  {
    id: 2,
    displayName: "Art",
    slug: "art",
  },
  {
    id: 3,
    displayName: "Education",
    slug: "education",
  },
  {
    id: 4,
    displayName: "Fashion",
    slug: "fashion",
  },
  {
    id: 5,
    displayName: "Hobby & DIY",
    slug: "hobby-diy",
  },
  {
    id: 6,
    displayName: "Household",
    slug: "household",
  },
  {
    id: 7,
    displayName: "Miniatures",
    slug: "miniatures",
  },
  {
    id: 8,
    displayName: "Props & Cosplay",
    slug: "props-cosplay",
  },
  {
    id: 9,
    displayName: "Tools",
    slug: "tools",
  },
  {
    id: 10,
    displayName: "Toys & Games",
    slug: "toys-games",
  },
] satisfies Category[];
