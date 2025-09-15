import CategoriesNav from "@/features/categories/components/categories-nav";

// This parallel route will be statically generated once at build time
// The CategoriesNav component will fetch categories data and render the list
// Client-side styling updates will be handled by usePathname hook
// Static generation is handled by the 'use cache' directive in CategoriesNav
export default function CategoriesNavPage() {
  return <CategoriesNav />;
}
