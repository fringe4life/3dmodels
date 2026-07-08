export const CATEGORIES = [
  { displayName: "3D Printer", id: 1, slug: "3d-printer" },
  { displayName: "Art", id: 2, slug: "art" },
  { displayName: "Education", id: 3, slug: "education" },
  { displayName: "Fashion", id: 4, slug: "fashion" },
  { displayName: "Hobby & DIY", id: 5, slug: "hobby-diy" },
  { displayName: "Household", id: 6, slug: "household" },
  { displayName: "Miniatures", id: 7, slug: "miniatures" },
  { displayName: "Props & Cosplay", id: 8, slug: "props-cosplay" },
  { displayName: "Tools", id: 9, slug: "tools" },
  { displayName: "Toys & Games", id: 10, slug: "toys-games" },
] as const;

export type Category = (typeof CATEGORIES)[number];
